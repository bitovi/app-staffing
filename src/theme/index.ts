import { extendTheme } from "@chakra-ui/react";

import Button from "./components/button";
import DatePicker from "./components/date-picker";
import Tag from "./components/tag";

const theme = extendTheme({
  components: {
    Button,
    DatePicker,
    Tag,
  },
});

export default theme;
