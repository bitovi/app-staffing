export type Attribute =
  | string
  | {
      type: string;
      allowNull: boolean;
      primaryKey?: boolean;
      defaultValue?: string;
      unique?: boolean;
    };

export interface Relationship {
  target: string;
  options: { through: string; as: string };
}

export interface Schema {
  name: string;
  attributes: { [key: string]: Attribute };
  // validation
  belongsToMany?: Relationship[];
  hasMany?: Relationship[];
  /* EXTRA */
  displayField: string;
  jsonApiField: string;
}

export const Employee: Schema = {
  name: "Employee",
  attributes: {
    id: {
      type: "string", // DataTypes.UUID
      primaryKey: true,
      allowNull: false,
      defaultValue: "UUIDV4", // DataTypes.UUIDV4
    },
    name: {
      type: "string",
      allowNull: false,
    },
    start_date: "date",
    end_date: "date",
  },
  // validation
  belongsToMany: [
    { target: "Role", options: { through: "role__employee", as: "roles" } },
  ],
  hasMany: [
    { target: "Skills", options: { through: "skill__employee", as: "skills" } },
  ],
  /* EXTRA */
  displayField: "name",
  jsonApiField: "employees",
};

export const Skill: Schema = {
  name: "Skill",
  attributes: {
    id: {
      type: "string", // DataTypes.UUID
      primaryKey: true,
      allowNull: false,
      defaultValue: "UUIDV4", // DataTypes.UUIDV4
    },
    name: {
      type: "string",
      allowNull: false,
      unique: true,
    },
  },
  belongsToMany: [
    { target: "Role", options: { through: "role__skill", as: "roles" } },
  ],
  /* EXTRA */
  displayField: "name",
  jsonApiField: "skills",
};
