// import { useState, useEffect } from "react";
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
  Radio,
  Flex,
  SimpleGrid,
  Select,
  Text,
  Divider,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { useForm, Controller } from "react-hook-form";
import type { Project, Skill } from "../../../../services/api";
import { AddIcon } from "@chakra-ui/icons";
// import { isEmpty, pickBy } from "lodash";
// import formatISO from "date-fns/formatISO";
// import parseISO from "date-fns/parseISO";

interface RoleModalProps {
  onClose: () => void;
  isOpen: boolean;
  skills: Skill[];
  project?: Project;
}

export default function RoleModal({
  isOpen,
  onClose,
  skills,
  project,
}: RoleModalProps): JSX.Element {
  const {
    register,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textStyle="modal.title" pt={6} pl={6}>
          Add a New Role
        </ModalHeader>
        <ModalCloseButton mt={2} />
        <Divider pt={2} />
        <ModalBody pt={4}>
          <VStack spacing="16px" pb={6}>
            <FormControl>
              <FormLabel>Select Role</FormLabel>
              <Flex mt={4} flexGrow={1}>
                <SimpleGrid columns={2} spacingX={24} spacingY={4}>
                  {skills?.map((skill) => (
                    <Controller
                      key={skill.id}
                      control={control}
                      name={`skills.${skill.id}`}
                      render={({ field: { onChange, onBlur, value } }) => {
                        return (
                          <Radio
                            value={skill.id}
                            onChange={onChange}
                            onBlur={onBlur}
                            isChecked={Boolean(value)}
                            textStyle="modal.checkboxLabel"
                          >
                            {skill.name}
                          </Radio>
                        );
                      }}
                    />
                  ))}
                </SimpleGrid>
              </Flex>
            </FormControl>

            <HStack spacing="8px" width="100%">
              <FormControl isInvalid={errors.startDate ? true : false}>
                <FormLabel>Start Date</FormLabel>
                <Input
                  {...register("startDate")}
                  id="role_start_date"
                  type="date"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Confidence</FormLabel>
                <Select placeholder=" ">
                  <option value="0%">0%</option>
                  <option value="25%">25%</option>
                  <option value="50%">50%</option>
                  <option value="100%">100%</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input
                  {...register("endDate")}
                  id="role_end_date"
                  type="date"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Confidence</FormLabel>
                <Select placeholder=" ">
                  <option value="0%">0%</option>
                  <option value="25%">25%</option>
                  <option value="50%">50%</option>
                  <option value="100%">100%</option>
                </Select>
              </FormControl>
            </HStack>
          <FormControl>
            <FormLabel>Team Members</FormLabel>
            {project && project?.roles?.length === 0 && (
              <Flex
                width="100%"
                height="118px"
                flexDirection="row"
                boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
                padding="50px 30px"
                backgroundColor="#F7F7F7"
                border="1px solid #eee"
                borderRadius="4px"
                alignItems="center"
                >
                <Image
                  height="77px"
                  width="64px"
                  src="/assets/images/folderWithFile.png"
                  alt="Folder With File"
                  opacity="60%"
                  />
                <Text fontSize="14px" fontFamily="Montserrat">
                  There are currently no team members assigned to this project,
                  Add some.
                </Text>
              </Flex>
            )}
          </FormControl>
            </VStack>
          <FormControl>
            <Flex alignItems="center" flexDirection="row">
              <AddIcon />
              <Text ml={2}>Add Team Member to this Role</Text>
            </Flex>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr="8px" onClick={onClose}>
            Cancel
          </Button>
          <Button>Save & Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
