import { HStack, Text } from "@chakra-ui/layout";
import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import AlertBar from "../AlertBar";
import Button, { ButtonVariant } from "../Button";

interface ConfirmationModalProps {
  children?: React.ReactNode;
  closeText: string;
  variant?: ButtonVariant;
  loadingText?: string;
  confirmText: string;
  error?: string;
  isCentered?: boolean;
  isLoading?: boolean;
  isOpen: boolean;
  message: string;
  modalSize?: string;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  showCloseButton?: boolean;
  showDivider?: boolean;
  title: string;
}

export default function ConfirmationModal({
  children,
  closeText,
  variant = "primary",
  loadingText,
  confirmText,
  error,
  isCentered = false,
  isLoading,
  isOpen,
  message,
  modalSize = "md",
  onClose,
  onConfirm,
  showCloseButton = false,
  showDivider = false,
  title,
}: ConfirmationModalProps): JSX.Element {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={modalSize}
      isCentered={isCentered}
    >
      <ModalOverlay />
      <ModalContent mt="14vh">
        {showCloseButton && <ModalCloseButton />}
        <ModalHeader>{title}</ModalHeader>
        {showDivider && <Divider />}
        <ModalBody>
          {children}
          <Text textStyle="modal.text" whiteSpace="pre-wrap">
            {message}
          </Text>
          {error && <AlertBar description={error} status="error" />}
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
              variant={variant}
              aria-label="confirm button"
              loadingText={loadingText}
            >
              {confirmText}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
