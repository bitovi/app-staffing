import type { Role, NewRole } from "../roles";
import type { ResponseStatus, QueriableList } from "../shared";

import useRest from "../useRest";

interface RoleActions {
  roles?: Role[];
  addRole: (role: NewRole) => Promise<string>;
  updateRole: (roleId: string, role: Partial<Role>) => Promise<void>;
}

/** Hook for getting a list of the roles */
export default function useRoles(
  queryParams?: QueriableList<Role>,
): ResponseStatus & RoleActions {
  const {
    data: roles,
    error,
    isLoading,
    handleAdd,
    handleUpdate,
  } = useRest<Role>("/api/v1/roles", queryParams);

  return {
    roles,
    isLoading,
    error,
    addRole: handleAdd,
    updateRole: handleUpdate,
  };
}
