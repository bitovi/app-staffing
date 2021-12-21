import type { Role, NewRole } from "../mocks/roles";
import type { ResponseStatus, QueriableList } from "../restBuilder/shared";

import useRest from "../restBuilder";

interface RoleActions {
  roles?: Role[];
  addRole: (role: NewRole) => Promise<string>;
  updateRole: (roleId: string, role: Partial<Role>) => Promise<void>;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
  } = useRest<Role>(`${API_BASE_URL}/roles`, "undefined", queryParams);

  return {
    roles,
    isLoading,
    error,
    addRole: handleAdd,
    updateRole: handleUpdate,
  };
}
