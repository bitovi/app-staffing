import { Text } from "@chakra-ui/layout";
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
} from "@chakra-ui/react";
import { format } from "date-fns";

import { Tag } from "../../../../components/Tag";
import type { Employee } from "../../../../services/api";
import { TrashIcon, EditIcon } from "../../../assets";
interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({
  employee,
}: EmployeeCardProps): JSX.Element {
  return (
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
          fontSize="14px"
          lineHeight="20px"
          letterSpacing="0.25px"
        >
          {format(employee.startDate, "MM/dd/yyyy")}
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
          {employee.endDate && format(employee.endDate, "MM/dd/yyyy")}
        </Text>
      </Td>
      <Td>
        <Wrap spacing="8px">
          {employee.skills.map((skill) => (
            <Tag variant="primary" key={skill.name}>
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="500"
                fontSize="12px"
                lineHeight="16px"
              >
                {skill.name}
              </Text>
            </Tag>
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
          />
          <IconButton
            ml="8px"
            variant="deleteAction"
            aria-label="Delete Member"
            fontSize="20px"
            icon={<TrashIcon fill="currentColor" />}
          />
        </Flex>
      </Td>
    </Tr>
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
          <Th pt="0px" pr={80} pb={4} color="gray.800" textStyle="table.title">
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
  );
}
