import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: "5rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  buttons: {
    textAlign: "right",
  },
  emptyButton: {
    width: "10rem",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0.5rem",
    },
  },
  checkoutButton: {
    width: "10rem",
    marginLeft: "1rem",
  },
  link: {
    textDecoration: "none",
  },
  cartDetails: {
    display: "flex",
    marginTop: "5rem",
    padding: "1rem",
    width: "100%",
    justifyContent: "space-between",
  },
}));
