import { Flex, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Button from "../Button";

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
          <Flex flexGrow={1} justifyContent="space-between">
            <Button disabled={isLoading} onClick={onClose} variant="secondary">
              {closeText}
            </Button>
            <Button isLoading={isLoading} onClick={onConfirm} variant="primary">
              {confirmText}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
