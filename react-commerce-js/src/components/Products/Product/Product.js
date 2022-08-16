import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image.url}
        title={product.name}
      />
      <div className={classes.details}>
        <CardContent>
          <div className={classes.cardContent}>
            <Typography variant="h5">{product.name}</Typography>
            <Typography
              className={classes.margin}
              dangerouslySetInnerHTML={{ __html: product.description }}
              variant="body2"
              color="textSecondary"
            ></Typography>
            <div className={classes.prices}>
              <Typography variant="h5" className={classes.discountPrice}>
                {product.price.formatted_with_symbol}
              </Typography>
              <div className={classes.beforeDiscount}>$99.99</div>
            </div>
          </div>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <IconButton
            aria-label="Add to Cart"
            onClick={() => onAddToCart(product.id, 1)}
          >
            <AddShoppingCart fontSize="large" />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
};

export default Product;
