import {
  Modal as ChakraModal,
  ModalContent as ChakraModalContent,
  ModalHeader as ChakraModalHeader,
  ModalCloseButton as ChakraModalCloseButton,
  ModalOverlay as ChakraModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ModalProps extends React.ComponentProps<typeof ChakraModal> {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function Modal({
  children,
  isOpen,
  onClose,
  title,
  ...props
}: ModalProps): JSX.Element {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} {...props}>
      <ChakraModalOverlay />
      <ChakraModalContent>
        <ChakraModalHeader>{title}</ChakraModalHeader>
        <ChakraModalCloseButton />
        {children}
      </ChakraModalContent>
    </ChakraModal>
  );
}
