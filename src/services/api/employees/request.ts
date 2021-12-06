import { rest } from "msw";
import type { RestHandler, DefaultRequestBody, MockedRequest } from "msw";
import deparam from "can-deparam";
import { CanLocalStore } from "can-local-store";

//import type { QueriableList } from "../shared";

import { MockResponse, JSONAPI, JSONData } from "../baseMocks/interfaces";
import { skillStoreManager } from "../skills/mocks";
import { employeeSkillsStoreManager } from "../employee_skills/mocks";
import { EmployeeTable, EmployeeJSON } from "./interfaces";
import { JSONSkill } from "../skills/interfaces";

interface EmployeeSkillsEntry {
  id: string;
  employee_id: string;
  skill_id: string;
}

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
    update: rest.patch<
      Partial<Resource>,
      MockResponse<Resource>,
      { id: string }
      // Need to clean up this any Type and likely the Typing in general in this file, opening a ticket
      // to address this at STAF-138
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    >(`${basePath}${resourcePath}/:id`, async (req: any, res, ctx) => {
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
      const employeeTableEntry = { ...req.body.data.attributes, id };
      const updatedItem = await store.updateData(
        employeeTableEntry as unknown as Resource,
      );

      if (!updatedItem) {
        return res(
          ctx.status(400),
          ctx.json({
            error: `Could not update Resource with id: ${id}`,
          }),
        );
      }

      try {
        const joinTable = await employeeSkillsStoreManager.store.getListData({
          filter: {
            employee_id: id,
          },
        });
        // add all new skills to employeeSkills join table
        await Promise.all(
          req.body.data.relationships.skills.data.map(
            async (req: JSONData<"skills">) => {
              if (
                !joinTable.data.find(
                  (jReq: EmployeeSkillsEntry) => jReq.skill_id === req.id,
                )
              ) {
                await employeeSkillsStoreManager.store.createData({
                  id: (Math.floor(Math.random() * 1000) + 1).toString(),
                  employee_id: id,
                  skill_id: req.id,
                });
              }
            },
          ),
        );

        //remove any no longer applicable skills from employeeSkills join table
        await Promise.all(
          joinTable.data.map(async (joinEntry: EmployeeSkillsEntry) => {
            if (
              !req.body.data.relationships.skills.data.find(
                (req: JSONData<"skills">) => req.id === joinEntry.skill_id,
              )
            ) {
              await employeeSkillsStoreManager.store.destroyData(joinEntry);
            }
          }),
        );
      } catch (_) {
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
          data: { ...req.body.data, id },
        }),
      );
    }),
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
      },
    ),
    create: rest.post<JSONAPI<EmployeeJSON, null>, MockResponse<Resource>>(
      `${basePath}${resourcePath}`,
      async (req, res, ctx) => {
        const id = (Math.floor(Math.random() * 1000) + 1).toString();
        const { attributes } = req.body.data;
        const skillData = req.body.data.relationships?.skills?.data;
        const item = {
          data: {
            id,
            type: "employees",
            attributes,
            relationships: {
              skills: {
                data: skillData,
              },
            },
          },
        }; // @TODO: look into typing issue

        // const included: JSONAPISkill[] = (
        //   await skillStoreManager.store.getListData({
        //     filter: {
        //       id: item.data.relationships.skills.data.map((skill) => skill.id),
        //     },
        //   })
        // ).data.map((skill) => ({
        //   type: "skills",
        //   id: skill.id,
        //   attributes: {
        //     name: skill.name,
        //   },
        // }));

        ////////////////////////////////
        //** Updates the Employee store
        ////////////////////////////////
        const newEmployeeTableEntry: EmployeeTable = {
          name: attributes.name,
          id,
          startDate: attributes.startDate,
          endDate: attributes.endDate,
        };

        const employeeSkillsTableJoins = skillData?.map((skill) => ({
          id: (Math.floor(Math.random() * 1000) + 1).toString(),
          employee_id: id,
          skill_id: skill.id,
        }));

        try {
          if (employeeSkillsTableJoins) {
            await Promise.all(
              employeeSkillsTableJoins.map(async (skillJoin) => {
                await employeeSkillsStoreManager.store.createData(skillJoin);
              }),
            );

            await store.createData(newEmployeeTableEntry as Resource);
          }

          return res(
            ctx.status(201),
            ctx.json({
              data: { ...item.data } as unknown as Resource,
            }),
          );
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          }
        }
      },
    ),
    //////////////////////////////
    //**  Changed parameter typing to suit response object in JSON API format
    /////////////////////////////
    getAll: rest.get<JSONAPI<EmployeeJSON[], JSONSkill[]>>(
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
        const jsonAPIEmployees: EmployeeJSON[] = await Promise.all(
          employees.map(
            async (employee: EmployeeTable): Promise<EmployeeJSON> => {
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
        const included: JSONSkill[] = (
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
            data: jsonAPIEmployees,
            included,
          }),
        );
      },
    ),
  };
}
