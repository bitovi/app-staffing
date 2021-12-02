import { Box, Flex, Text } from "@chakra-ui/layout";
import { CheckCircleIcon } from "@chakra-ui/icons";

type ToastBoxProps = {
  title: string;
  description: string;
};

function ToastBox({ title, description }: ToastBoxProps): JSX.Element {
  return (
    <Box
      bg="green.100"
      borderLeftWidth="4px"
      borderLeftColor="green.500"
      borderRadius="6px"
      variant="solid"
      color="white"
      mb="42px"
      mr="38px"
      aria-label="toast confirmation"
    >
      <Flex p={2} pr={8}>
        <CheckCircleIcon color="green.500" mt={1} />
        <Box pl={3.5}>
          <Text textStyle="toastBox.title">{title}</Text>
          <Text textStyle="toastBox.description">{description}</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default ToastBox;
