import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

import Button from "./components/button";
import { Checkbox } from "./components/checkbox";
import { textStyles } from "./fonts/typography";
import DatePicker from "./components/date-picker";
import Tag from "./components/tag";

const theme = extendTheme({
  fonts: {
    headers: "Inter",
    body: "Montserrat",
  },
  colors,
  textStyles,
  components: {
    Checkbox,
    Button,
    DatePicker,
    Tag,
  },
});

export default theme;
