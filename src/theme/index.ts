import { extendTheme } from "@chakra-ui/react";
import Button from "./components/button";
import Tag from "./components/tag";

const theme = extendTheme({
  components: {
    Button,
    Tag,
  },
});

export default theme;
