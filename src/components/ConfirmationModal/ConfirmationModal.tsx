import { HStack, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Button, { ButtonVariant } from "../Button";

interface IConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  message: string;
  closeText: string;
  confirmText: string;
  error?: string;
  isLoading?: boolean;
  confirmButtonVariant?: ButtonVariant;
  modalSize?: string;
  isCentered?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  closeText,
  confirmText,
  error,
  isLoading,
  confirmButtonVariant = "primary",
  modalSize = "md",
  isCentered = false,
}: IConfirmationModalProps): JSX.Element {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={modalSize}
      isCentered={isCentered}
    >
      <ModalOverlay />
      <ModalContent mt="14vh">
        <ModalCloseButton />
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          {/* // TODO: Should have a common error component across the application */}
          {error && (
            <Text mb={4} color="red">
              {error}
            </Text>
          )}
          <Text textStyle="modal.text">{message}</Text>
        </ModalBody>
        <ModalFooter>
          <HStack flexGrow={1} justifyContent="flex-end">
            <Button
              isDisabled={isLoading}
              onClick={onClose}
              variant="modalCancel"
            >
              {closeText}
            </Button>
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={onConfirm}
              variant={confirmButtonVariant}
              aria-label="confirm button"
            >
              {confirmText}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
