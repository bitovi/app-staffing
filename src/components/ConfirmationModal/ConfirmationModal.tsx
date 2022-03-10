import { HStack, Text } from "@chakra-ui/layout";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import Button, { ButtonVariant } from "../Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  message: string;
  closeText: string;
  confirmText: string;
  confirmLoadingText?: string;
  error?: string;
  isLoading?: boolean;
  confirmButtonVariant?: ButtonVariant;
  modalSize?: string;
  isCentered?: boolean;
  focusConfirmationButton?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  closeText,
  confirmText,
  confirmLoadingText,
  error,
  isLoading,
  confirmButtonVariant = "primary",
  modalSize = "md",
  isCentered = false,
  focusConfirmationButton = false,
}: ConfirmationModalProps): JSX.Element {
  const initialRef = useRef<HTMLButtonElement>(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={modalSize}
      isCentered={isCentered}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent mt="14vh">
        <ModalCloseButton />
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Text textStyle="modal.text" whiteSpace="pre-wrap">
            {message}
          </Text>
          {error && (
            <Alert status="error" mt="15px">
              <AlertIcon />
              <AlertTitle mr={2}>{error}</AlertTitle>
            </Alert>
          )}
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
              loadingText={confirmLoadingText}
              innerref={focusConfirmationButton ? initialRef : null}
            >
              {confirmText}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
