import { useState, useEffect } from "react";
import { Products, Navbar, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // GET PRODUCTS FROM SERVER
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  // SHOW BOUGHT ITEMS IN CART
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  // GET PRODUCTS AND SHOW BOUGHT ITEMS AT PAGE LOAD
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // UPDATE CART QTY
  const addToCartHandler = async (productID, quantity) => {
    const { cart } = await commerce.cart.add(productID, quantity);
    setCart(cart);
  };

  // UPDATE CART QTY, AT CART PAGE
  const updateCartQtyHandler = async (productID, quantity) => {
    const { cart } = await commerce.cart.update(productID, {
      quantity,
    });
    setCart(cart);
  };

  // REMOVE FROM CART
  const RemoveFromCartHandler = async (productID) => {
    const { cart } = await commerce.cart.remove(productID);
    setCart(cart);
  };

  // EMPTY EVERYTHING IN CART
  const emptyCartHandler = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const captureCheckoutHandler = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  return (
    <>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route
          path="/products"
          element={
            <Products products={products} onAddToCart={addToCartHandler} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateCartQtyHandler={updateCartQtyHandler}
              RemoveFromCartHandler={RemoveFromCartHandler}
              emptyCartHandler={emptyCartHandler}
            />
          }
        />
        <Route path="*" element={<Navigate to="/products" />} />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={captureCheckoutHandler}
              error={errorMessage}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
