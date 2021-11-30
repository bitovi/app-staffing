import { rest } from "msw";
import type { RestHandler, DefaultRequestBody, MockedRequest } from "msw";
import { CanLocalStore } from "can-local-store";
import deparam from "can-deparam";

import { MockResponse, JSONAPI } from "../baseMocks/interfaces";
import { rolesSkillsStoreManager } from "../role_skills/mocks";
import { RoleTable, JSONAPIRole } from "./interfaces";
import { JSONAPISkill } from "../skills/interfaces";
import { skillStoreManager } from "../skills/mocks";

export default function requestCreatorEmployee<Resource extends RoleTable>(
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
              error: `Role ${id} not found.`,
            }),
          );
        }

        await store.destroyData(resourceToDelete);

        return res(ctx.status(200), ctx.json({}));
      },
    ),
    create: rest.post<JSONAPI<JSONAPIRole, null>, MockResponse<Resource>>(
      `${basePath}${resourcePath}`,
      async (req, res, ctx) => {
        const id = (Math.floor(Math.random() * 1000) + 1).toString();
        const {
          attributes,
          relationships: {
            skills: { data: skillData },
          },
        } = req.body.data;
        const item = {
          data: {
            id,
            type: "roles",
            attributes: req.body.data.attributes,
            relationships: {
              skills: {
                data: skillData,
              },
            },
          },
        };

        ////////////////////////////////
        //** Updates the Role store
        ////////////////////////////////
        const newRoleTableEntry = {
          id,
          startDate: attributes.startDate,
          endDate: attributes.endDate,
          projectId: attributes.projectId,
        } as unknown as Resource;

        const rolesSkillsTableJoin = {
          id: (Math.floor(Math.random() * 1000) + 1).toString(),
          role_id: id,
          skill_id: skillData.id,
        };

        try {
          await rolesSkillsStoreManager.store.createData(rolesSkillsTableJoin);
          await store.createData(newRoleTableEntry);

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
    getAll: rest.get<JSONAPI<JSONAPIRole[], void>>(
      `${basePath}${resourcePath}`,
      async (req, res, ctx) => {
        const {
          filter,
          sort,
          page = 1,
          count = 25,
        } = deparam(req.url.searchParams.toString());
        const { data: roles } = await store.getListData({
          filter,
          sort,
          page: {
            start: (page - 1) * count,
            end: page * count - 1,
          },
        });
        const includedSkills: string[] = [];
        const jsonAPIRoles: JSONAPIRole[] = await Promise.all(
          roles.map(async (role: RoleTable): Promise<JSONAPIRole> => {
            const { data: roleSkills } =
              await rolesSkillsStoreManager.store.getListData({
                filter: {
                  role_id: role.id,
                },
              });
            return {
              type: "roles",
              id: role.id,
              attributes: {
                startDate: {
                  date: role.startDate.date,
                  confidence: role.startDate.confidence,
                },
                endDate: {
                  date: role.endDate.date,
                  confidence: role.endDate.confidence,
                },
                projectId: role.projectId,
              },
              relationships: {
                skills: {
                  data: {
                    id: roleSkills[0].role_id,
                    type: "skills",
                  },
                },
              },
            };
          }),
        );
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
              data: jsonAPIRoles,
              included,
            },
          }),
        );
      },
    ),
  };
}
