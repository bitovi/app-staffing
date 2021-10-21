import type { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal from ".";

export default {
  title: "Components/Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

export const Basic: ComponentStory<typeof Modal> = ({ ...props }) => (
  <Modal {...props} />
);

Basic.args = {
  children: "Hello World",
  title: "Modal Title",
  isOpen: true,
  onClose: function(){return null}
};



