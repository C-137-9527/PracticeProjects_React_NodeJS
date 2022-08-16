import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  cardActions: {
    display: "flex",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignContent: "center",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  margin: {
    margin: "-10px 0 10px",
  },
  prices: {
    display: "flex",
    alignItems: "baseline",
  },
  discountPrice: {
    color: "#ec6f71",
  },
  beforeDiscount: {
    fontSize: "0.9rem",
    color: "gray",
    textDecoration: " line-through",
    marginLeft: "10px",
  },
}));
