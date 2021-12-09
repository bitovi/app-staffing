import { StyleConfig } from "@chakra-ui/theme-tools";

export const Checkbox: StyleConfig = {
  // const parts = ["container", "control", "label", "icon"]
  baseStyle: {
    control: {
      _checked: {
        bg: "primary",
        borderColor: "primary",
        _hover: {
          bg: "primary",
          borderColor: "primary",
        },
      },
    },
  },
  sizes: {
    md: {
      label: { fontSize: "12px" },
    },
  },
};
