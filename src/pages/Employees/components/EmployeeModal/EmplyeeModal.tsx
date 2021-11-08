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
}

interface IEmployeeData {
  name: string;
  start_date: string;
  end_date: string;
  roles?: string[] | undefined;
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

  useEffect(() => {
    if (skills) {
      setRoles(
        skills.map((skill) => ({
          label: skill.name as string,
          value: skill.name as string,
        })),
      );
    }
  }, [skills]);

  const [checkedRolesState, setCheckedRolesState] = useState(
    new Array(roles.length).fill(false),
  );

  const submitForm = async () => {
    await onSave(employeeData);
    await onClose();
  };

  const handleRolesChange = (index: number) => {
    setCheckedRolesState(
      checkedRolesState.map((item, i) => (i === index ? !item : item)),
    );
  };

  useEffect(() => {
    setEmployeeData((e) => {
      return {
        ...e,
        roles: roles
          ?.filter((role: IRole, index: number) => {
            if (checkedRolesState[index] === true) return role.value;
          })
          ?.map((role) => role.value),
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
              key={role.value}
              value={role.value}
              onChange={() => handleRolesChange(index)}
              isChecked={checkedRolesState[index]}
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
                key={role.value}
                value={role.value}
                onChange={() => handleRolesChange(index + half)}
                isChecked={checkedRolesState[index + half]}
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
