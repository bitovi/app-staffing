import { extendTheme } from "@chakra-ui/react";
import { button } from "./components/button";
import { tag } from "./components/tag";

const theme = extendTheme({
  components: {
    Button: button,
    Tag: tag,
  },
});

export default theme;
