import { Table, Td, Tbody } from "@chakra-ui/react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { colors } from "../../../../theme/colors";

import EmployeeCard from "./EmployeeCard";

const skillOptions = Object.keys(colors.skills);
  
export default {
  title: "Pages/Employees/EmployeeCard",
  component: EmployeeCard,
  argTypes: {
      skills: {
        options: skillOptions,
        control: { type: 'select' }
      },
      employee: {
        table: {
          disable: true
        }
      },
      handleDeleteEmployee: {
        table: {
          disable: true
        }
      },
      handleEditEmployee: {
        table: {
          disable: true
        }
      }
  }
} as ComponentMeta<typeof EmployeeCard>;

const Template: ComponentStory<any> = (args) => {

  const sampleAssignments = [{
    id: '',
    startDate: '',
    employee: {
      id: '',
      name: '',
      skills: []
    },
    role: {
      id: 'role',
      project: {
        id: '',
        name: '',
      },
      startDate: '',
      startConfidence: 0,
      skills: []
    } 
  }];

  const employee = {
    id: 'id',
    name: args.name,
    skills: [{ id: '', name: args.skills }],
    assignments: {
      ...sampleAssignments
    }
  }

  employee.assignments[0].role.project.id = args.project;
  employee.assignments[0].role.project.name = args.project;

  return <BrowserRouter>
    <Table>
      <Tbody>
        <Td>
          <EmployeeCard
            employee={employee}
            handleDeleteEmployee={() => console.log('')}
            handleEditEmployee={() => console.log('')} />
        </Td>
      </Tbody>
    </Table>
  </BrowserRouter>;
}

export const Default = Template.bind({});

Default.args = {
  name: "Michael",
  skills: "React",
  project: ""
}

