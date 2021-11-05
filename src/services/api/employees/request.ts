import { rest } from "msw";
import type { RestHandler, DefaultRequestBody, MockedRequest } from "msw";
import deparam from "can-deparam";
import { CanLocalStore } from "can-local-store";

//import type { QueriableList } from "../shared";

import { MockResponse, JSONAPI } from "../baseMocks/interfaces";
import { skillStoreManager } from "../skills/mocks";
import { employeeSkillsStoreManager } from "../employee_skills/mocks";
import { EmployeeTable, JSONAPIEmployee /*EmployeeTable*/ } from "./interfaces";
import { JSONAPISkill } from "../skills/interfaces";

export default function requestCreatorEmployee<Resource extends EmployeeTable>(
  resourcePath: string,
  store: CanLocalStore<Resource>,
): { [requestType: string]: RestHandler<MockedRequest<DefaultRequestBody>> } {
  const basePath = "/api/v1";

  return {
    getOne: rest.get<undefined, MockResponse<Resource>, { id: string }>(
      `${basePath}${resourcePath}/:id`,
      async (req, res, ctx) => {
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
      },
    ),
    update: rest.put<Partial<Resource>, MockResponse<Resource>, { id: string }>(
      `${basePath}${resourcePath}/:id`,
      async (req, res, ctx) => {
        const id = req.params.id;
        // const index = collection.findIndex((item) => item.id === id);
        const itemExists = await store.getData({ id });

        if (!itemExists) {
          return res(
            ctx.status(404),
            ctx.json({
              error: `Resource ${id} not found.`,
            }),
          );
        }

        const updatedItem = await store.updateData({ ...req.body, id });

        if (!updatedItem) {
          return res(
            ctx.status(400),
            ctx.json({
              error: `Could not update Resource with id: ${id}`,
            }),
          );
        }

        return res(
          ctx.status(201),
          ctx.json({
            data: updatedItem,
          }),
        );
      },
    ),
    delete: rest.delete<undefined, MockResponse, { id: string }>(
      `${basePath}${resourcePath}/:id`,
      async (req, res, ctx) => {
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

        await store.destroyData(resourceToDelete);

        return res(ctx.status(200), ctx.json({}));
      },
    ),
    create: rest.post<Omit<Resource, "id">, MockResponse<Resource>>(
      `${basePath}${resourcePath}`,
      async (req, res, ctx) => {
        const id = (Math.floor(Math.random() * 1000) + 1).toString();
        const item = { ...req.body, id } as Resource; // @TODO: look into typing issue

        await store.createData(item);

        return res(ctx.status(201), ctx.json({ data: item }));
      },
    ),
    //////////////////////////////
    //**  Changed parameter typing to suit response object in JSON API format
    /////////////////////////////
    getAll: rest.get<JSONAPI<JSONAPIEmployee[], JSONAPISkill[]>>(
      `${basePath}${resourcePath}`,
      async (req, res, ctx) => {
        const {
          filter,
          sort,
          page = 1,
          count = 25,
        } = deparam(req.url.searchParams.toString());

        ////////////////////////////////////////////
        // ** Employee store data
        ///////////////////////////////////////////

        const { data: employees } = await store.getListData({
          filter,
          sort,
          page: {
            start: (page - 1) * count,
            end: page * count - 1,
          },
        });

        /////////////////////////////////////////////
        // ** JSON API formatting each employee for response
        // ** finding relevant skill IDs with the "join table" employeeSkillsStore
        // ** includedSkills will provide the "included" field for data response
        ////////////////////////////////////////////

        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //!! This jsonAPIEmployee Promise.All is currently breaking the useEmployees test
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const includedSkills: string[] = [];
        const jsonAPIEmployees: JSONAPIEmployee[] = await Promise.all(
          employees.map(
            async (employee: EmployeeTable): Promise<JSONAPIEmployee> => {
              const { data: employeeSkills } =
                await employeeSkillsStoreManager.store.getListData({
                  filter: {
                    employee_id: employee.id,
                  },
                });

              return {
                type: "employees",
                id: employee.id,
                attributes: {
                  name: employee.name,
                  startDate: employee.startDate,
                  endDate: employee.endDate,
                },
                relationships: {
                  skills: {
                    data: employeeSkills.map((skill) => {
                      if (!includedSkills.includes(skill.skill_id)) {
                        includedSkills.push(skill.skill_id);
                      }
                      return {
                        type: "skills",
                        id: skill.skill_id,
                      };
                    }),
                  },
                },
              };
            },
          ),
        );
        //////////////////////////////////////////////
        // ** Filtering the skillStoreManager to join
        // ** the skill id to its skill object
        /////////////////////////////////////////////
        const included: JSONAPISkill[] = (
          await skillStoreManager.store.getListData({
            filter: {
              id: includedSkills,
            },
          })
        ).data.map((skill) => ({
          type: "skills",
          id: skill.id,
          attributes: {
            name: skill.name,
          },
        }));

        return res(
          ctx.status(200),
          ctx.json({
            data: {
              data: jsonAPIEmployees,
              included,
            },
          }),
        );
      },
    ),
  };
}
