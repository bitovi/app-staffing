import { Text } from "@chakra-ui/layout";
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
}: IConfirmationModalProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          {/* // TODO: Should have a common error component across the application */}
          {error && (
            <Text mb={4} color="red">
              {error}
            </Text>
          )}
          <Text>{message}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={4}
            disabled={isLoading}
            onClick={onClose}
            variant="secondary"
          >
            {closeText}
          </Button>
          <Button
            isLoading={isLoading}
            onClick={onConfirm}
            variant={confirmButtonVariant}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
