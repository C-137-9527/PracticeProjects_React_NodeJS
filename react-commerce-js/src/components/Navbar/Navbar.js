import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();

  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname.includes("cart")) {
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={NavLink}
            to="/products"
            variant="h6"
            className={classes.title}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/DotShop_gTLD_logo.svg/1200px-DotShop_gTLD_logo.svg.png"
              alt="logo"
              height="25px"
              className={classes.image}
            />
            react e-commerce
          </Typography>
          <div className={classes.grow}></div>
          {/* CART ICON */}
          {!location.pathname.includes("cart") && (
            <div
              className={classes.button}
              onClick={() => navigate("/cart", { replace: true })}
            >
              <IconButton aria-label="show cart item" color="inherit">
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
