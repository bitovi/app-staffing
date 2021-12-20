import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";
import type { RestHandler, DefaultRequestBody, MockedRequest } from "msw";
import { CanLocalStore } from "can-local-store";

import { JSONAPI } from "../baseMocks/interfaces";
import { employeeSkillsStoreManager } from "../employee_skills/mocks";
import { EmployeeRecord, EmployeeJSON } from "./interfaces";
import { JSONSkill } from "../skills/interfaces";
import { getAll } from "./handlers";
import { JSONAPIDocument, ResourceObject } from "json-api-serializer";

type EmployeeResource = ResourceObject<EmployeeRecord>;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function requestCreatorEmployee<Resource extends EmployeeRecord>(
  resourcePath: string,
  store: CanLocalStore<Resource>,
): { [requestType: string]: RestHandler<MockedRequest<DefaultRequestBody>> } {
  const basePath = `${API_BASE_URL}${resourcePath}`;

  return {
    getOne: rest.get(`${basePath}/:id`, async (req, res, ctx) => {
      const id = req.params.id;
      const item = await store.getData({ id });

      if (!item) {
        return res(
          ctx.status(404),
          ctx.json({
            error: `Resource ${id} not found.`,
          }),
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          data: item,
        }),
      );
    }),

    update: rest.patch(`${basePath}/:id`, async (req, res, ctx) => {
      const id = req.params.id as string;

      const storedItem = await store.getData({ id });
      if (!storedItem) {
        return res(
          ctx.status(404),
          ctx.json({
            status: "404",
            title: `Resource ${id} not found.`,
          }),
        );
      }

      const body = req.body as JSONAPIDocument;
      const data = body.data as EmployeeResource;
      const newItemData = {
        ...data.attributes,
        id,
      } as Resource;

      const updatedItem = await store.updateData(newItemData);
      if (!updatedItem) {
        return res(
          ctx.status(400),
          ctx.json({
            status: "400",
            title: `Could not update Resource with id: ${id}`,
          }),
        );
      }

      try {
        const { data: oldEmployeeSkills } =
          await employeeSkillsStoreManager.store.getListData({
            filter: {
              employee_id: id,
            },
          });

        const skillsData = data?.relationships?.skills?.data;
        const newEmployeeSkills = Array.isArray(skillsData) ? skillsData : [];

        const skillsToAdd = newEmployeeSkills.filter((nes) => {
          return !oldEmployeeSkills.find((oes) => nes.id === oes.skill_id);
        });

        const skillsToRemove = oldEmployeeSkills.filter((oes) => {
          return !newEmployeeSkills.find((nes) => nes.id === oes.skill_id);
        });

        // add all new skills to employeeSkills join table
        await Promise.all(
          skillsToAdd.map((skill) =>
            employeeSkillsStoreManager.store.createData({
              id: uuidv4(),
              employee_id: id,
              skill_id: skill.id,
            }),
          ),
        );

        // remove any no longer applicable skills from employeeSkills join table
        await Promise.all(
          skillsToRemove.map((skill) =>
            employeeSkillsStoreManager.store.destroyData(skill),
          ),
        );
      } catch (error) {
        return res(
          ctx.status(400),
          ctx.json({
            status: "400",
            title: `Could not update Resource with id: ${id}`,
          }),
        );
      }

      return res(
        ctx.status(201),
        ctx.json({
          ...body,
          data: { ...body.data, id },
        }),
      );
    }),

    delete: rest.delete(`${basePath}/:id`, async (req, res, ctx) => {
      const id = req.params.id;
      const resourceToDelete = await store.getData({ id });

      if (!resourceToDelete) {
        return res(
          ctx.status(404),
          ctx.json({
            error: `Project ${id} not found.`,
          }),
        );
      }

      try {
        const joinTable = await employeeSkillsStoreManager.store.getListData({
          filter: {
            employee_id: id,
          },
        });

        await Promise.all(
          joinTable.data.map((record) => {
            employeeSkillsStoreManager.store.destroyData(record);
          }),
        );
        await store.destroyData(resourceToDelete);

        return res(ctx.status(200), ctx.json({}));
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }),

    // type RestHandler = <RequestBody, ResponseBody, RequestParams>(mask, resolver) => MockedResponse
    create: rest.post<JSONAPIDocument>(basePath, async (req, res, ctx) => {
      const id = uuidv4();
      const { attributes, relationships } = req.body.data as EmployeeResource;
      if (!attributes) return res(ctx.status(400));

      const skillsData = relationships?.skills?.data;
      const response = { ...req.body };
      response.data = {
        ...response.data,
        id,
      } as EmployeeResource;

      // Persist data to the Employee store
      const newEmployeeTableEntry: EmployeeRecord = {
        id,
        name: attributes.name,
        start_date: attributes.start_date,
        end_date: attributes.end_date,
      };

      try {
        if (Array.isArray(skillsData)) {
          const employeeSkillsTableJoins = skillsData.map((skill) => ({
            id: uuidv4(),
            employee_id: id,
            skill_id: skill.id,
          }));

          await Promise.all(
            employeeSkillsTableJoins.map(async (skillJoin) => {
              await employeeSkillsStoreManager.store.createData(skillJoin);
            }),
          );
        }
        await store.createData(newEmployeeTableEntry as Resource);
        return res(ctx.status(201), ctx.json(response));
      } catch (error) {
        return res(
          ctx.status(500),
          ctx.json({
            status: "500",
            title: (error as Error).message,
          }),
        );
      }
    }),

    getAll: rest.get<JSONAPI<EmployeeJSON[], JSONSkill[]>>(
      basePath,
      async (req, res, ctx) => {
        try {
          const response = await getAll(store, req.url.searchParams.toString());
          return res(ctx.status(200), ctx.json(response));
        } catch (error) {
          return res(
            ctx.status(500),
            ctx.json({
              errors: [
                {
                  status: "500",
                  source: { pointer: "" },
                  title: "Internal Server Error",
                  detail: (error as Error).message,
                },
              ],
            }),
          );
        }
      },
    ),
  };
}
