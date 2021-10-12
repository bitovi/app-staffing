import { extendTheme } from "@chakra-ui/react";
import { button } from "./components/button";
import { tag } from "./components/tag";
import { fonts } from "./fonts";

const theme = extendTheme({
  fonts,
  components: {
    Button: button,
    Tag: tag,
  },
});

export default theme;
