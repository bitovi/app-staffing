import { extendTheme } from "@chakra-ui/react";
import { button } from "./components/button";
import { tag } from "./components/tag";
import { heading } from "./components/heading";
import { fonts, textStyles } from "./fonts";

const theme = extendTheme({
  fonts,
  textStyles,
  components: {
    Button: button,
    Tag: tag,
    Heading: heading,
  },
});

export default theme;
