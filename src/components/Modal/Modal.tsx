import { Modal as ChakraModal, 
  ModalContent as ChakraModalContent,
  ModalHeader as ChakraModalHeader,
  ModalCloseButton as ChakraModalCloseButton,
  ModalBody as ChakraModalBody,
  // Button as ChakraButton,
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
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      {...props}
    >
      <ChakraModalContent> 
        <ChakraModalHeader>
          {title}
        </ChakraModalHeader>
        <ChakraModalCloseButton />
        <ChakraModalBody>
          {children}
        </ChakraModalBody>
        {/* <ChakraButton onClose={} /> */}
      </ChakraModalContent>
    </ChakraModal>
  );
}
