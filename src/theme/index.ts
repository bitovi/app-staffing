import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

import Button from "./components/button";
import { Checkbox } from "./components/checkbox";

import { FormLabel } from "./components/form-label";
import Tag from "./components/tag";
import Heading from "./components/heading";
import { fonts, textStyles } from "./fonts";
import DatePicker from "./components/date-picker";

const theme = extendTheme({
  fonts,
  textStyles,
  colors,
  components: {
    Checkbox,
    Button,
    Heading,
    DatePicker,
    Tag,
    FormLabel,
  },
});

export default theme;
