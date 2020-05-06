import { createMuiTheme } from "@material-ui/core/styles";
export const theme = createMuiTheme({
  palette: {
    //color of everything else besides background- grey
    primary: {
      main: "#EDEDED",
    },
    secondary: {
      main: "#745F5F",
    },
    //background = blue
    background: {
      default: "#689EAF",
    },
  },
});
