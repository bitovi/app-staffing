import { Text } from "@chakra-ui/layout";
import {
  SimpleGrid,
  HStack,
  Box,
  Grid,
  GridItem,
  Skeleton,
  IconButton,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
// import { format } from "date-fns";

// import { Tag } from "../../../../components/Tag";
import type { Employee } from "../../../../services/api";

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({
  employee,
}: EmployeeCardProps): JSX.Element {
  console.log(employee)
  return (
    <SimpleGrid
      key={employee.id}
      columns={5}
      mt="16px"
      p="16px"
      alignItems="center"
      backgroundColor="white"
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
    >
      <Text
        color="gray.600"
        fontWeight="600"
        fontSize="16px"
        lineHeight="20px"
        letterSpacing="0.25px"
      >
        {employee.name}
      </Text>
      <Text
        color="gray.600"
        fontSize="14px"
        lineHeight="20px"
        letterSpacing="0.25px"
      >
        {/* {format(employee.startDate, "MM/dd/yyyy")} */}
      </Text>
      <Text
        color="gray.600"
        fontSize="14px"
        lineHeight="20px"
        letterSpacing="0.25px"
      >
        {/* {employee.endDate && format(employee.endDate, "MM/dd/yyyy")} */}
      </Text>
      <HStack spacing="8px">
        {/* {employee.skills.map((skill) => (
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
        ))} */}
      </HStack>
      <Box justifySelf="end">
        <IconButton
          variant="ghost"
          aria-label="Edit Member"
          fontSize="20px"
          icon={<Image src="assets/icons/editIcon.svg" />}
        />
        <IconButton
          ml="8px"
          variant="ghost"
          aria-label="Delete Member"
          fontSize="20px"
          icon={<Image src="assets/icons/trashIcon.svg" />}
        />
      </Box>
    </SimpleGrid>
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
