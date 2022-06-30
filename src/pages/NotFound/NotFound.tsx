import { Button, Flex, Text } from "@chakra-ui/react";
import { PageNotFound } from "../assets/PageNotFound";
import { useHistory } from "react-router-dom";

export default function NotFound(): JSX.Element {
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
      <Text
        as="h2"
        paddingTop={8}
        fontSize="30px"
        fontWeight={800}
        color="black"
      >
        404 PAGE NOT FOUND
      </Text>
      <Text
        fontSize={16}
        fontWeight={400}
        paddingBottom={7}
        color="black"
        maxWidth="600px"
        textAlign="center"
        paddingTop={4}
      >
        Check that you typed the address correctly, go back to your previous
        page or click a selection from the menu on the left.
      </Text>
      <Button colorScheme="teal" onClick={onClick} size="md">
        Return home
      </Button>
    </Flex>
  );
}
