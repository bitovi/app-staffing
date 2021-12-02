import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/provider";
import { useToast } from "@chakra-ui/toast";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ToastBox from ".";
import theme from "../../theme";

export default {
  title: "Components/Toast",
  component: ToastBox,
} as ComponentMeta<typeof ToastBox>;

export const Toast: ComponentStory<typeof ToastBox> = ({
  title,
  description,
}) => {
  return (
    <Flex>
      <ToastBox title={title} description={description} />
    </Flex>
  );
};
Toast.args = {
  title: "Team member added",
  description: "Sam Krieger has successfully been added!",
};

const StyleBox = ({ children }: { children: JSX.Element }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export const ToastInteract: ComponentStory<typeof ToastBox> = ({
  title,
  description,
}) => {
  const toast = useToast();
  return (
    <StyleBox>
      <Button
        onClick={() =>
          toast({
            render: () => <ToastBox title={title} description={description} />,
            duration: 5000,
            isClosable: false,
            position: "bottom-right",
          })
        }
      >
        Test Toast
      </Button>
    </StyleBox>
  );
};
ToastInteract.args = {
  title: "Team member added",
  description: "Sam Krieger has successfully been added!",
};
