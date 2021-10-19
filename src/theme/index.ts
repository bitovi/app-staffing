import { extendTheme } from "@chakra-ui/react";

import { fonts, textStyles } from "./fonts";

import Button from "./components/button";
import Heading from "./components/heading";
import Tag from "./components/tag";

const theme = extendTheme({
  fonts,
  textStyles,
  components: {
    Button,
    Heading,
    Tag,
  },
});

export default theme;
