import { extendTheme } from "@chakra-ui/react";
import { button } from "./components/button";
import { tag } from "./components/tag";
import { datePicker } from "./components/date-picker";


const theme = extendTheme({
  components: {
    Button: button,
    Tag: tag,
    DatePicker: datePicker
  },
});

export default theme;
