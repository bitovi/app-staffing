import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  VStack,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useEffect, useState } from "react";
import { Skill } from "../../../../services/api";

interface IEmployeeModal {
  onSave: (employeeData: IEmployeeData) => void;
  onClose: () => void;
  isOpen: boolean;
  skills: Skill[] | [];
}

interface IRole {
  label: string;
  value: string;
  id: string;
}

interface IEmployeeData {
  name: string;
  start_date: string;
  end_date: string;
  roles?: Skill[];
}

interface RoleState {
  selected: boolean;
  id: string;
}

export default function EmployeeModal({
  onSave,
  onClose,
  isOpen,
  skills,
}: IEmployeeModal): JSX.Element {
  const [employeeData, setEmployeeData] = useState<IEmployeeData>({
    name: "",
    start_date: "",
    end_date: "",
    roles: [],
  });

  const [roles, setRoles] = useState<IRole[]>([]);
  const [checkedRolesState, setCheckedRolesState] = useState<RoleState[]>([]);
  /////////////////////////////////////////////////////////////////
  //**  Now that Skills data is retrieved from server
  //**  checkedRolesState will initially be empty until
  //**  the roles.length property has a value
  //**  this explains the useEffect defined below.
  //**  Also, the UseEffect generates our checkedRolesState array
  //**  To contain the boolean for selected AND the associated
  //**  Skill ID to simplify backend joining operations
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (skills) {
      setRoles(
        skills.map((skill) => ({
          label: skill.name as string,
          value: skill.name as string,
          id: skill.id as string,
        })),
      );
      setCheckedRolesState(
        skills.map((skill) => ({ selected: false, id: skill.id })),
      );
    }
  }, [skills]);

  const submitForm = async () => {
    await onSave(employeeData);
    await onClose();
  };

  const handleRolesChange = (index: number) => {
    setCheckedRolesState(
      checkedRolesState.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  useEffect(() => {
    setEmployeeData((e) => {
      return {
        ...e,
        roles: roles
          ?.filter((role, index) => {
            if (checkedRolesState[index].selected === true)
              return { skill: role.value, id: role.id };
          })
          ?.map((role) => ({ skill: role.value, id: role.id })),
      };
    });
  }, [checkedRolesState, roles]);

  const renderRolesCheckboxes = (rolesToRender: IRole[]) => {
    const half = Math.ceil(rolesToRender.length / 2);
    return (
      <>
        <VStack display="flex" flex={1} alignItems="start">
          {rolesToRender.slice(0, half).map((role: IRole, index: number) => (
            <Checkbox
              key={role.label}
              value={role.value}
              onChange={() => handleRolesChange(index)}
              isChecked={checkedRolesState[index].selected}
            >
              {role.label}
            </Checkbox>
          ))}
        </VStack>

        <VStack display="flex" flex={1} alignItems="start">
          {rolesToRender
            .slice(half, rolesToRender.length)
            .map((role: IRole, index: number) => (
              <Checkbox
                key={role.label}
                value={role.value}
                onChange={() => handleRolesChange(index + half)}
                isChecked={checkedRolesState[index + half].selected}
              >
                {role.label}
              </Checkbox>
            ))}
        </VStack>
      </>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a New Team Member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="16px">
            <FormControl isRequired>
              <FormLabel>Full name</FormLabel>
              <Input
                id="name"
                value={employeeData.name}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, name: e.target.value })
                }
                placeholder="name"
              />
            </FormControl>

            <HStack spacing="8px">
              <FormControl isRequired>
                <FormLabel>Start Date</FormLabel>
                <Input
                  id="start_date"
                  value={employeeData.start_date}
                  onChange={(e) =>
                    setEmployeeData({
                      ...employeeData,
                      start_date: e.target.value,
                    })
                  }
                  type="date"
                  placeholder="02/24/2022"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>End Date</FormLabel>
                <Input
                  id="end_date"
                  value={employeeData.end_date}
                  onChange={(e) =>
                    setEmployeeData({
                      ...employeeData,
                      end_date: e.target.value,
                    })
                  }
                  type="date"
                  placeholder="02/24/2022"
                />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel>Roles</FormLabel>
              <Flex flexGrow={1}>{renderRolesCheckboxes(roles)}</Flex>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr="8px" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitForm}>
            Add & Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
