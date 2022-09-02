import { StyleConfig } from "@chakra-ui/theme-tools";

const tabs: StyleConfig = {
  variants: {
    line: {
      tab: {
        _selected: {
          color: "primary",
          borderColor: "primary",
          fontWeight: "bold",
        },
      },
      tablist: {
        borderColor: "transparent",
      },
    },
  },
};

export default tabs;