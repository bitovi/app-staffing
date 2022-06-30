import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { PageNotFound } from "../assets/PageNotFound";
import { useHistory } from "react-router-dom";

export default function Error(): JSX.Element {
  const history = useHistory();

  function onClick() {
    history.push("/");
  }

  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      padding={100}
    >
      <PageNotFound />
      <Heading as="h2" padding={10} size="2xl">
        404 PAGE NOT FOUND
      </Heading>
      <Text fontSize={16} fontWeight={400} paddingBottom={10}>
        Check that you typed the address correctly, go back to your previous
        page or click a selection from the menu on the left.
      </Text>
      <Button colorScheme="teal" onClick={onClick} size="md">
        Return home
      </Button>
    </Flex>
  );
}
