import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { NavLink } from "react-router-dom";

const Cart = ({
  cart,
  updateCartQtyHandler,
  RemoveFromCartHandler,
  emptyCartHandler,
}) => {
  const classes = useStyles();

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no items in the cart, {""}
        {
          <NavLink to="/" className={classes.link}>
            shop now!
          </NavLink>
        }
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart?.line_items?.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <CartItem
                item={item}
                onUpdateCartQTY={updateCartQtyHandler}
                onRemoveFromCart={RemoveFromCartHandler}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cartDetails}>
          <Typography variant="h4">
            Subtotal: {cart?.subtotal?.formatted_with_symbol}
          </Typography>
          <div className={classes.buttons}>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={emptyCartHandler}
            >
              Empty Cart
            </Button>
            <Button
              component={NavLink}
              to="/checkout"
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Check Out
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <Container>
      <div className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          You Have Bought:
        </Typography>
        {!cart?.line_items?.length ? <EmptyCart /> : <FilledCart />}
      </div>
    </Container>
  );
};

export default Cart;
