import { useToast, ChakraProvider, Button } from "@chakra-ui/react";
import theme from "../../theme";

type ToastBoxProps = {
  title: string;
  description: string;
};

// used for Stories visualization
// toast implementation in production is the toast call within the component
const ToastBox = ({ title, description }: ToastBoxProps): JSX.Element => {
  const toast = useToast();
  return (
    <ChakraProvider theme={theme}>
      <Button
        onClick={() =>
          toast({
            title,
            description,
            duration: 5000,
            isClosable: false,
            position: "bottom-right",
            variant: "left-accent",
            status: "success",
          })
        }
      >
        Test Toast
      </Button>
    </ChakraProvider>
  );
};

export default ToastBox;
