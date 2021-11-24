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
  FormErrorMessage,
  Box,
  // FormErrorMessage,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";

import { useEffect, useRef, useState } from "react";
import { Skill } from "../../../../services/api";
import { JSONAPIEmployee } from "../../../../services/api/employees/interfaces";
import { useForm } from "react-hook-form";
import { ServiceError } from "../../../../components/ServiceError";
interface IEmployeeModal {
  onSave: (employee: {
    data: Omit<JSONAPIEmployee, "id">;
  }) => Promise<string | undefined>;
  onClose: () => void;
  isOpen: boolean;
  skills: Skill[] | [];
}

interface IRole {
  label: string;
  value: number;
}

interface IEmployeeData {
  name: string;
  start_date: string;
  end_date: string;
  roles?: number[];
}

interface RoleState {
  selected: boolean;
  id: string;
  roles?: string[] | undefined;
}

// const ErrorText = ({ children }: { children?: string }): JSX.Element => (
//   <Text color="red.600">{children}</Text>
// );

export default function EmployeeModal({
  onSave,
  onClose,
  isOpen,
  skills,
}: IEmployeeModal): JSX.Element {
  //////////////////////////////////////////
  //** Removed stateful data for new employee
  //** handled through react-form-hook
  //////////////////////////////////////////
  const [roles, setRoles] = useState<IRole[]>([]);
  const [checkedRolesState, setCheckedRolesState] = useState<RoleState[]>([]);
  const [serverError, setServerError] = useState(false);

  // Ref added to prevent revalidation of stale skills data from useSWR,
  // which causes a state update to roles, from clearing checkbox data
  // on browser tab blur due to unnecessary rerender

  // issue avoided if we choose to set SWR revalidateIfStale to false

  const skillsRef = useRef<Skill[] | boolean>(false);

  useEffect(() => {
    if (skills && !skillsRef.current) {
      skillsRef.current = skills;
      //stateful value for mapping out checkbox inputs
      //value corresponds to index value within checkedRolesState
      setRoles(
        skills.map((skill, index) => ({
          label: skill.name as string,
          value: index as number,
        })),
      );
      //stateful value containing skill.id's
      //connects to roles state through index value
      setCheckedRolesState(
        skills.map((skill) => ({ selected: false, id: skill.id })),
      );
    }
  }, [skills]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IEmployeeData>({
    defaultValues: {
      start_date: "",
      end_date: "",
      name: "",
    },
    mode: "onChange",
  });

  const submitForm = async (data: IEmployeeData) => {
    // Currently a fix to manage a testing quirk:
    // within the testing environment, the roles field doesn't populate with an array of ints
    // but rather returns a single boolean. Presumably a problem in the handoff
    // between React Hooks Form / Chakra UI / testing-library
    const newRoles = [
      ...document.querySelectorAll<HTMLInputElement>(
        "input[type=checkbox]:checked",
      ),
    ].map((node) => parseInt(node.value));
    const newEmployee: { data: Omit<JSONAPIEmployee, "id"> } = {
      data: {
        type: "employees",
        attributes: {
          name: data.name,
          startDate: new Date(data.start_date),
          endDate: new Date(data.end_date),
        },
        relationships: {
          skills: {
            // once bug can be resolved, this should read
            // data: data.roles?.map
            data: newRoles.map((role: number) => ({
              type: "Skills",
              id: checkedRolesState[role].id,
            })),
          },
        },
      },
    };
    try {
      await onSave(newEmployee);
      reset();
      onClose();
      setCheckedRolesState((prevState) =>
        prevState.map((skill) => ({ ...skill, selected: false })),
      );
    } catch (e) {
      setServerError(!serverError);
    }
  };

  const handleRolesChange = (index: number) => {
    setCheckedRolesState(
      checkedRolesState.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const renderRolesCheckboxes = (rolesToRender: IRole[]) => {
    const half = Math.ceil(rolesToRender.length / 2);
    return (
      <>
        <VStack display="flex" flex={1} alignItems="start">
          {rolesToRender.slice(0, half).map((role: IRole, index: number) => (
            <Checkbox
              {...register("roles")}
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
                {...register("roles")}
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
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent mt="14vh">
        <ModalHeader>Add a New Team Member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="16px">
            <FormControl isRequired isInvalid={errors.name ? true : false}>
              <FormLabel>Full name</FormLabel>
              <Input
                {...register("name", {
                  required: "Name not filled out",
                  validate: (name) =>
                    name.split(" ").length >= 2 || "Full name required",
                })}
                id="name"
                // focusBorderColor={errors.name ? "red.600" : "currentColor"}
                placeholder="name"
              />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>

            <HStack spacing="8px" width="100%">
              <FormControl
                isRequired
                isInvalid={errors.start_date ? true : false}
              >
                <FormLabel>Start Date</FormLabel>
                <Input
                  {...register("start_date", {
                    required: true,
                  })}
                  id="start_date"
                  type="date"
                  data-testid="start_date"
                />
              </FormControl>

              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input {...register("end_date")} id="end_date" type="date" />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Roles</FormLabel>
              <Flex mt={4} mb={11} flexGrow={1}>
                {renderRolesCheckboxes(roles)}
              </Flex>
            </FormControl>
          </VStack>
        </ModalBody>
        {serverError && (
          <Flex justifyContent="center" width="100%">
            <ServiceError
              mt="40px"
              mb="25px"
              bg="red.100"
              color="gray.700"
              iconColor="red.500"
              textStyle="table.title"
              name="Server Error"
              width="80%"
              h="48px"
            >
              <Box
                as="button"
                onClick={() => setServerError(!serverError)}
                position="absolute"
                top="11.75px"
                right="11.75px"
                color="gray.700"
              >
                <CloseIcon w="8.50px" h="8.50px" />
              </Box>
            </ServiceError>
          </Flex>
        )}
        <ModalFooter>
          <Button variant="outline" mr="8px" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={!isValid ? "primaryDisabled" : "primary"}
            isDisabled={!isValid}
            onClick={handleSubmit((data) => submitForm(data))}
          >
            Add & Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
