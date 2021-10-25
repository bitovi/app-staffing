import { StyleConfig } from "@chakra-ui/theme-tools";

const button: StyleConfig = {
  baseStyle: {
    px: 4,
    py: 2,
  },
  variants: {
    primary: {
      backgroundColor: "red.500",
      _hover: { backgroundColor: "red.600" },
      color: "white",
    },
    secondary: {
      backgroundColor: "white",
      _hover: { backgroundColor: "gray.200" },
      color: "gray.600",
      borderWidth: "1px",
      borderColor: "gray.600",
    },
    danger: {
      backgroundColor: "red.500",
      _hover: { backgroundColor: "red.600" },
      color: "white",
    },
  },
  sizes: {
    md: {
      fontSize: "sm",
    },
  },
};

export default button;
