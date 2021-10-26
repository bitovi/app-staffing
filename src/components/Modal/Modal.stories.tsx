import { ModalBody, ModalFooter } from "@chakra-ui/modal";
import type { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal from ".";

export default {
  title: "Components/Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

export const Basic: ComponentStory<typeof Modal> = ({ ...props }) => (
  <Modal {...props}>
    <ModalBody>Hello World</ModalBody>
    <ModalFooter>I am a footer</ModalFooter>
  </Modal>
);

Basic.args = {
  children: "Hello World",
  title: "Modal Title",
  isOpen: true,
  onClose: function () {
    return null;
  },
};
