import { useDisclosure } from "@chakra-ui/hooks";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import ConfirmationModal from ".";
import Button from "../Button";

export default {
  title: "Components/ConfirmationModal",
  component: ConfirmationModal,
} as ComponentMeta<typeof ConfirmationModal>;

export const Basic: ComponentStory<typeof ConfirmationModal> = ({
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open modal</Button>
      <ConfirmationModal
        {...props}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => alert("onConfirm")}
      />
    </>
  );
};

Basic.args = {
  title: "Delete Project?",
  message: `Are you sure you want to delete the Nike store project? This can’t be undone.`,
  confirmText: "Yes, Remove & Delete",
  closeText: "No, Return to Page",
  error: "",
  isLoading: false,
};
