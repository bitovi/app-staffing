import { Text } from "@chakra-ui/layout";
import {
  Flex,
  Grid,
  GridItem,
  Skeleton,
  IconButton,
  Wrap,
  Td,
  Tr,
} from "@chakra-ui/react";
import { format } from "date-fns";

import { Tag } from "../../../../components/Tag";
import type { Employee } from "../../../../services/api";
import {TrashIcon, EditIcon } from './assets'
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
      <Td >
        <Flex justifySelf="end">
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

export function EmployeeCardSkeleton(): JSX.Element {
  return (
    <Grid
      alignItems="center"
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={4}
    >
      <GridItem>
        <Skeleton height="130px"></Skeleton>
      </GridItem>
      <GridItem>
        <Skeleton height="130px"></Skeleton>
      </GridItem>
      <GridItem>
        <Skeleton height="130px"></Skeleton>
      </GridItem>
      <GridItem>
        <Skeleton height="130px"></Skeleton>
      </GridItem>
    </Grid>
  );
}
