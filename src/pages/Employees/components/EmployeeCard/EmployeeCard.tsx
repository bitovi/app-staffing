import type { Employee } from "../../../../services/api";
import { Link as ReactRouterLink } from "react-router-dom";

import {
  Flex,
  Skeleton,
  IconButton,
  Wrap,
  Td,
  Tr,
  Table,
  Tbody,
  Th,
  Thead,
  Text,
  Box,
  Link,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { formatDateToUTC } from "../../../../services/helpers/utcdate";

import Badge from "../../../../components/Badge";
import { TrashIcon, EditIcon } from "../../../assets";

interface EmployeeCardProps {
  employee: Employee;
  handleEditEmployee: (employee: Employee) => void;
  handleDeleteEmployee: (employee: Employee) => void;
}

// I think deleteEmployee should be deconstructed from the useEmployee hook inside the EmployeeCard component
// need to determine how to update relevant tests for the asynchronous rendering that would cause
export default function EmployeeCard({
  employee,
  handleEditEmployee,
  handleDeleteEmployee,
}: EmployeeCardProps): JSX.Element {
  const employeeProject = {
    id: employee.assignments?.[0]?.role?.project.id,
    name: employee.assignments?.[0]?.role?.project.name,
  };

  return (
    <>
      <Tr
        p="16px"
        alignItems="center"
        backgroundColor="white"
        boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      >
        <Td>
          <Text
            color="gray.600"
            fontWeight="600"
            fontSize="16px"
            lineHeight="20px"
            letterSpacing="0.25px"
          >
            {employee.name}
          </Text>
        </Td>
        <Td>
          <Text
            color="gray.600"
            fontWeight="400"
            fontSize="16px"
            lineHeight="20px"
            letterSpacing="0.25px"
          >
            {/* We could make a custom hook like "useEmployeeProjects" */}
            {employeeProject.id ? (
              <Link
                as={ReactRouterLink}
                to={`/projects/${employeeProject.id}`}
                color="primary"
                textDecoration="underline"
              >
                {employeeProject.name}
              </Link>
            ) : (
              "Bench"
            )}
          </Text>
        </Td>
        <Td>
          <Text
            color="gray.600"
            fontWeight="400"
            fontSize="14px"
            lineHeight="20px"
            letterSpacing="0.25px"
          >
            {employee.startDate &&
              format(formatDateToUTC(employee.startDate), "MM/dd/yyyy")}
          </Text>
        </Td>
        <Td>
          <Text
            color="gray.10"
            fontWeight="400"
            fontSize="14px"
            lineHeight="20px"
            letterSpacing="0.25px"
            data-testid="employeeEndDate"
          >
            {employee.endDate &&
              format(formatDateToUTC(employee.endDate), "MM/dd/yyyy")}
          </Text>
        </Td>
        <Td>
          <Wrap spacing="8px">
            {employee?.skills?.map((skill) => (
              <Badge
                key={skill.id}
                isTruncated={false}
                size="sm"
                whiteSpace="break-spaces"
                maxWidth="100px"
                textAlign="center"
                display="flex"
                background={`skills.${skill.name}`}
              >
                {skill.name}
              </Badge>
            ))}
          </Wrap>
        </Td>
        <Td>
          <Flex justifyContent="end" justifySelf="end">
            <IconButton
              variant="editAction"
              aria-label="Edit Member"
              fontSize="20px"
              icon={<EditIcon fill="currentColor" />}
              onClick={() => handleEditEmployee(employee)}
            />
            <IconButton
              ml="8px"
              variant="deleteAction"
              aria-label="Delete Member"
              fontSize="20px"
              icon={<TrashIcon fill="currentColor" />}
              onClick={() => handleDeleteEmployee(employee)}
            />
          </Flex>
        </Td>
      </Tr>
    </>
  );
}

const SkeletonRow = () => (
  <>
    <Tr p="16px" alignItems="center" backgroundColor="#DCDCDC" height="55px">
      <Td>
        <Skeleton
          startColor="#C4C4C4"
          endColor="#C4C4C4"
          height="16px"
          width="99px"
        />
      </Td>
      <Td>
        <Skeleton
          startColor="#C4C4C4"
          endColor="#C4C4C4"
          height="16px"
          width="75px"
        />
      </Td>
      <Td></Td>
      <Td>
        <Skeleton
          startColor="#C4C4C4"
          endColor="#C4C4C4"
          height="16px"
          width="99px"
        />
      </Td>
      <Td>
        <Skeleton
          startColor="#C4C4C4"
          endColor="#C4C4C4"
          height="16px"
          width="99px"
        />
      </Td>
    </Tr>
    <Tr height={4}></Tr>
  </>
);

export function EmployeeCardSkeleton(): JSX.Element {
  return (
    <Box paddingInline="40px" marginBottom="40px">
      <Table>
        <Thead>
          <Tr>
            <Th pt="0px" pb={4} color="gray.800" textStyle="table.title">
              EMPLOYEE NAME
            </Th>
            <Th pt="0px" pb={4} color="gray.800" textStyle="table.title">
              START DATE
            </Th>
            <Th pt="0px" pb={4} color="gray.800" textStyle="table.title">
              END DATE
            </Th>
            <Th
              pt="0px"
              pr={80}
              pb={4}
              color="gray.800"
              textStyle="table.title"
            >
              ROLES
            </Th>
            <Th pt="0px" pb={4} color="gray.800" textStyle="table.title">
              ACTIONS
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {[1, 2, 3, 4].map((row) => {
            return <SkeletonRow key={row} />;
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
