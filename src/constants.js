import { createMuiTheme } from "@material-ui/core/styles";
export const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiButton: {
        text: {
          color: "#76C043"
        },
        contained: {
          backgroundColor: "#017ACD",
          color: "#ffffff",
          padding: "10px 16px",
          margin: "10px 0",
          "&:hover": {
            backgroundColor: "#017ACD",
            color: "#ffffff"
          }
        }
      },
      MuiTextField: {
        root : {
            width: '100%',
        }
      },
      MuiCheckbox: {
        colorPrimary: {
          color: "black",
          "&$checked": {
            color: "#017ACD"
          }
        },
        root: {
          color: "black",
          "&$checked": {
            color: "#017ACD"
          }
        }
      },
      MuiFormLabel: {
        root: {
          color: "rgb(4, 31, 65)"
        }
      },
      MuiFormControlLabel: {
        label: {
          color: "rgb(4, 31, 65)"
        }
      },
      MuiOutlinedInput: {
        root: {
          "&$focused": {
            borderColor: "green"
          }
        }
      },
      MuiDialogTitle: {
        root: {
          background: "white",
          zIndex: "1"
        }
      },
      MuiDialogContent: {
        root: {
          paddingTop: "0px",
          textAlign:"center"
        }
      },
      MuiPaper: {
        root: {
          color: "rgb(4, 31, 65)"
        }
      },
      MuiFormControl: {
        root: {
          "&$focused": {
            color: "rgb(4, 31, 65)",
            backgroundColor:"white"
          },
          width: '100%',
        },
        marginNormal: {
          marginTop: "3px",
          marginBottom: "8px"
        }
      },
      MuiSelect: {
        select: {
            "&:focus": {
              color: "rgb(4, 31, 65)",
              backgroundColor:"white"
            }
        },
        outlined:{
          textAlign: "left"
        }
      },
      MuiTypography: {
        colorPrimary: {
          color: "#017ACD",
        }
      },
      MuiAppBar: {
        colorDefault:{
          backgroundColor: "#3a74bd",
          color: "#fff"
        },
        colorPrimary:{
          backgroundColor: "#369039",
          color: "#fff"
        },
        colorSecondary:{
          backgroundColor: "#c30246",
          color: "#fff"
        },
        colorInherit:{
          backgroundColor: "#8c8e25",
          color: "#fff"
        }
      }
      
    }
  });