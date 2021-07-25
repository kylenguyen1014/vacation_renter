import { createTheme } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";

export const theme = createTheme({
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
        borderRadius: 20,
    },
    props: {
      }
})