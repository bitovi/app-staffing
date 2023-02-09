export interface Schema {
  name: string;
  attributes: {
    [key: string]: string | { [key: string]: string | boolean };
  };
  // validation
  belongsToMany: { target: string; options: { through: string; as: string } }[];
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
    // @todo how to map roles to skills?
    { target: "Skills", options: { through: "role__employee", as: "roles" } },
    // { target: "Role", options: { through: "role__employee", as: "roles" } },
  ],
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
};
