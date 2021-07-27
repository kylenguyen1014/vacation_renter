import { createTheme, unstable_createMuiStrictModeTheme } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";

const createMuiTheme = process.env.NODE_ENV === 'production' ? createTheme : unstable_createMuiStrictModeTheme;

export const theme = createMuiTheme({
    palette: {
        primary : {
          main : blue[500]
        },
        secondary : {   
          main : red[500]
        },
    },
    overrides: {
        MuiFilledInput: {
          root: {}
        },
        MuiInputLabel: {
          root: {}
        },
        MuiTextField: {
          root: {}
        },
        MuiButton: {
          root: {
            textTransform: "none",
          },
        },
    },
    shape: {
        borderRadius: 10,
    },
    props: {
      }
})