import { Box } from "@chakra-ui/react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { colors } from "../../../../theme/colors";

// import { BrowserRouter } from "react-router-dom";
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
      id: '',
      startDate: '',
      startConfidence: 0,
      project: {
        id: '',
        name: '',
      },
      skills: []
    }
  }];

  const employee = {
    id: 'id',
    name: args.name,
    skills: [{ id: '', name: args.skills }],
    assignments: {
      ...sampleAssignments[],
      role: {
        ...sampleAssignments.role
      }
    }
    // assignments: sampleAssignments
    // assignments: args.project ? [{ id: '', startDate: '', employee role: { project: { id: args.project, name: args.project } } }] : [],
  }

  return <Box width="1000px">
      <EmployeeCard
        employee={employee}
        handleDeleteEmployee={() => console.log('')}
        handleEditEmployee={() => console.log('')} />
    </Box>;
}

export const Default = Template.bind({});

Default.args = {
  name: "Michael",
  skills: "React",
  project: "Project"
}

