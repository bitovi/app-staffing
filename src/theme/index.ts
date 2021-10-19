import { extendTheme } from "@chakra-ui/react";
import Button from "./components/button";
import Tag from "./components/tag";
import Heading from "./components/heading";
import { fonts, textStyles } from "./fonts";
import DatePicker from "./components/date-picker";



const theme = extendTheme({
  fonts,
  textStyles,
  components: {
    Button,
    Heading,
    DatePicker,
    Tag,
  },
});

export default theme;
