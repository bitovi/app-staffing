import { StyleConfig } from "@chakra-ui/theme-tools";

const button: StyleConfig = {
  baseStyle: {
    px: "24px",
    py: "10px",
  },
  variants: {
    primary: {
      backgroundColor: "primary",
      color: "white",
      _hover: { opacity: 0.8 },
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
