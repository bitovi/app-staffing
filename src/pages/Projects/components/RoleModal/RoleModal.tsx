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
    FormErrorMessage,
    IconButton,
    Input,
    HStack,
    VStack,
    Flex,
    Box,
    Radio,
    RadioGroup,
    Select,
    Text
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { NewRole } from "../../../../services/api/roles/interfaces";

import { useEffect, useState } from "react";
import { Skill } from "../../../../services/api";
import { useForm } from "react-hook-form";
import { ServiceError } from "../../../../components/ServiceError";
import { AddIcon, FolderIcon } from '../../../assets/Icons';

interface IRoleModal {
    onSave: (role: NewRole) => Promise<string | undefined>;
    onClose: () => void;
    isOpen: boolean;
    skills: Skill[] | [];
    projectId: string;
}

interface IRole {
    label: string;
    value: number;
}

interface IRoleData {
    start_date: string;
    start_confidence: string;
    end_date: string;
    end_confidence: string;
    teamMembers: string[];
    skill: string;
}

interface RoleState {
    selected: boolean;
    id: string;
    roles?: string[] | undefined;
}

export default function RoleModal({
    onSave,
    onClose,
    isOpen,
    skills,
    projectId,
}: IRoleModal): JSX.Element {

    const [roles, setRoles] = useState<IRole[]>([]);
    const [checkedRolesState, setCheckedRolesState] = useState<RoleState[]>([]);
    const [serverError, setServerError] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string>("-1");
    const [startConfidence, setStartConfidence] = useState<string>("");
    const [endConfidence, setEndConfidence] = useState<string>("");

    useEffect(() => {
        if (skills) {
            setRoles(
                skills.map((skill, index) => ({
                    label: skill.name as string,
                    value: index as number,
                })),
            );
            setCheckedRolesState(
                skills.map((skill) => ({ selected: false, id: skill.id })),
            );
        }
    }, [skills]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IRoleData>({
        defaultValues: {
            start_date: "",
            end_date: "",
        },
    });

    const submitForm = async (data: IRoleData) => {

          const newProjectRole: NewRole  = {
            skill: {
                id: skills[parseInt(data.skill)].id,
                name: skills[parseInt(data.skill)].name
            },
            startDate: {
                date: new Date(data.start_date),
                confidence: data.start_confidence,
            },
            endDate: {
                date: data.end_date ? new Date(data.end_date) : undefined,
                confidence: data.end_confidence,
            },
            employees: [],
            projectId: projectId,
          };

        try {
            await onSave(newProjectRole);
            reset();
            onClose();
        } catch (e) {
            setServerError(!serverError);
        }
    };

    const handleRolesChange = (index: string) => {
        setSelectedRole(index);
        setCheckedRolesState(
            checkedRolesState.map((item, i) =>
                i === parseInt(index) ? { ...item, selected: !item.selected } : item,
            ),
        );
    };

    const renderRolesRadio = (rolesToRender: IRole[]) => {
        return (
            <>
                <RadioGroup
                    onChange={value => handleRolesChange(value)} 
                    value={selectedRole}
                >
                    <HStack>
                        <VStack display="flex" flex={1} alignItems="start">
                            {rolesToRender.slice(0, 3).map((role: IRole, index: number) => {
                                return (
                                    <Radio {...register("skill")} value={`${role.value}`} key={`${role.value}`}>{role.label}</Radio>
                                )
                            })}
                        </VStack>
                        <VStack display="flex" flex={1} alignItems="start">
                            {rolesToRender.slice(3, 6).map((role: IRole, index: number) => {
                                return (
                                    <Radio {...register("skill")} value={`${role.value}`} key={`${role.value}`}>{role.label}</Radio>
                                )
                            })}
                        </VStack>
                        <VStack display="flex" flex={1} alignItems="start">
                            {rolesToRender.slice(6, rolesToRender.length).map((role: IRole, index: number) => {
                                return (
                                    <Radio {...register("skill")} value={`${role.value}`} key={`${role.value}`}>{role.label}</Radio>
                                )
                            })}
                        </VStack>
                    </HStack>
                </RadioGroup>
            </>
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent maxWidth="748px" height="631px">
                <ModalHeader>Add a New Role</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing="16px">
                        <FormControl isRequired>
                            <FormLabel fontWeight="bold">Select Role</FormLabel>
                            <Flex mt={4} mb={11} flexGrow={1}>
                                {renderRolesRadio(roles)}
                            </Flex>
                        </FormControl>

                        <HStack spacing="8px" width="100%" >
                            <FormControl maxWidth="190px"
                                isRequired
                                isInvalid={errors.start_date ? true : false}
                            >
                                <FormLabel fontWeight="bold">Start Date</FormLabel>
                                <Input
                                    {...register("start_date", {
                                        required: "Date is required",
                                    })}
                                    id="start_date"
                                    focusBorderColor={errors.start_date ? "red.600" : "currentColor"}
                                    type="date"
                                    data-testid="start_date"
                                    mb={errors?.start_confidence && !errors.start_date ? "40px" : errors?.start_confidence && errors.start_date ? "0px" : !errors?.start_confidence && errors.start_date ? "0px" : "29px"}
                                />
                                <FormErrorMessage fontSize="12px">{errors?.start_date?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isRequired
                                isInvalid={errors.start_confidence ? true : false}
                            >
                                <FormLabel fontWeight="bold">Confidence</FormLabel>
                                <Select
                                    mb={errors?.start_date && errors?.start_confidence ? "0px" : !errors?.start_date && errors?.start_confidence ? "21px" : "29px"}
                                    {...register("start_confidence", {
                                        required: "Confidence is required",
                                    })}
                                    onChange={(ev)=>setStartConfidence(ev.target.value)}
                                    value={startConfidence}
                                    placeholder=""
                                    focusBorderColor={errors.start_date ? "red.600" : "currentColor"}
                                >
                                    <option value=""></option>
                                    {Array.from(Array(21).keys()).map((n) => {
                                        return <option value={`${n * 5}%`} key={n}>{`${n * 5}%`}</option>
                                    })}
                                </Select>
                                <FormErrorMessage fontSize="12px">{errors?.start_confidence?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl maxWidth="190px">
                                <FormLabel fontWeight="bold">End Date</FormLabel>
                                <Input id="end_date" type="date" mb={errors.start_date && errors.start_confidence ? "29px" : errors.start_confidence && !errors.start_date ? "43px" : "29px"}/>
                            </FormControl>
                            <FormControl
                                isInvalid={false}
                            >
                                <FormLabel fontWeight="bold">Confidence</FormLabel>
                                <Select
                                    {...register("end_confidence")}
                                    name={'End Confidence'}
                                    onChange={(ev)=>setEndConfidence(ev.target.value)}
                                    value={endConfidence}
                                    mb={errors.start_date && errors.start_confidence ? "29px" : errors.start_confidence && !errors.start_date ? "43px" : "29px"}
                                >
                                    <option value=""></option>
                                    {Array.from(Array(21).keys()).map((n) => {
                                        return <option value={`${n * 5}%`} key={n}>{`${n * 5}%`}</option>
                                    })}
                                </Select>
                            </FormControl>
                        </HStack>
                        <HStack spacing="8px" width="100%">
                            <FormControl>
                                <FormLabel fontWeight="bold">Team Members</FormLabel>
                                <Box display="flex" height="118px" bg="#F6F6F6" borderRadius="4px">
                                    <FolderIcon color="yellow" mt="29px" width="77px" height="64px"/>
                                    <Text 
                                        w="370px" 
                                        pt="40px" 
                                        ml="6px"
                                        fontSize="14px"
                                    >
                                        There are currently no team members assigned to this project, Add some.
                                    </Text>
                                </Box>
                            </FormControl>
                        </HStack>
                        <HStack spacing="8px" width="100%">
                            <FormControl>
                                <HStack spacing="8px" width="100%">
                                    <IconButton 
                                        variant="addAction"
                                        aria-label="Add Member"
                                        fontSize="20px"
                                        icon={<AddIcon />}
                                    />
                                    <FormLabel fontWeight="bold">Add Member to this role</FormLabel>
                                </HStack>
                            </FormControl>
                        </HStack>

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
                        variant={
                            !checkedRolesState.some((role) => role.selected === true)
                                ? "primaryDisabled"
                                : "primary"
                        }
                        isDisabled={
                            !checkedRolesState.some((role) => role.selected === true)
                        }
                        onClick={handleSubmit((data) => {
                            submitForm(data)
                        })}
                    >
                        Save & Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
