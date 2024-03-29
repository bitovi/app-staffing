import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

import Button from "./components/button";
import { Checkbox } from "./components/checkbox";

import { FormLabel } from "./components/form-label";
import Tag from "./components/tag";
import Heading from "./components/heading";
import { fonts, textStyles } from "./fonts";
import DatePicker from "./components/date-picker";
import Divider from "./components/divider";
import Tabs from "./components/tabs";

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
    Divider,
    Tabs,
  },
});

export default theme;
