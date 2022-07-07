import { Button } from "@chakra-ui/react";
import type { UseToastOptions } from "@chakra-ui/toast";
import { useToast } from "../../services/toast";

// used for Stories visualization
// toast implementation in production is the toast call within the component
// You can send a tost option object to make it behaves as desired
const ToastBox = ({
  title,
  description,
  status = "success",
  isClosable,
  duration,
}: UseToastOptions): JSX.Element => {
  const toast = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          description,
          duration,
          isClosable,
          position: "bottom-right",
          status,
          title,
          variant: "left-accent",
        })
      }
    >
      Test Toast
    </Button>
  );
};

export default ToastBox;
