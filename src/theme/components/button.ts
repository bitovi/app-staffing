import { StyleConfig } from "@chakra-ui/theme-tools";

const button: StyleConfig = {
  baseStyle: {
    px: 6.25,
    py: 2.5,
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
    deleteAction: {
      backgroundColor: "gray.100",
      _hover: { backgroundColor: "red.50", color: "red.500" },
      color: "#2D3748",
    },
    editAction: {
      backgroundColor: "gray.100",
      _hover: { backgroundColor: "teal.50", color: "teal.500" },
      color: "#2D3748",
    },
  },
  sizes: {
    md: {
      fontSize: "sm",
    },
  },
};

export default button;
