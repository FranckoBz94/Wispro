import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
    btnTable: {
      margin: "7px",
      height: "65%",
      justifyContent: "end",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    containerEliminar: {
      background: "#fff",
      padding: "24px",
      width: "auto",
      minWidth: "600px",
      borderRadius: "5px",
    },
    btnModal: {
      width: "80%",
      height: "50px",
    },
    footerModal: {
      marginTop: "45px",
      textAlign: "center",
    },
    paperModal: {
      borderRadius: "8px",
      width: "40%",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      "& > h2": {
        textAlign: "center",
      },
    },
    button: {
      margin: theme.spacing(1),
    },
    sendRta: {
      justifyContent: "center",
    },
    tableContainer: {
      marginTop: "50px",
      "& :nth-child(6)": {
        display: "none",
      },
    },
  })
)
