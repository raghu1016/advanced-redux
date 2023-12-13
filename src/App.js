import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, Fragment } from "react";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => {
    return state.ui.cartVisible;
  });
  const cart = useSelector((state) => {
    return state.cart;
  });
  const notification = useSelector((state) => {
    return state.ui.notification;
  });
  // console.log(showCart);

  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "pending",
  //         title: "Sending...",
  //         message: "Sending cart data",
  //       }),
  //     );
  //     const response = await fetch(
  //       "https://react-redux-50f47-default-rtdb.firebaseio.com/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       },
  //     );

  //     if (!response.ok) {
  //       throw new Error("Sending cart data failed.");
  //     }

  //     dispatch(
  //       uiActions.showNotification({
  //         status: "success",
  //         title: "Success!...",
  //         message: "Sent cart data successfully!",
  //       }),
  //     );

  //     // const responseData = await response.json().catch((err) => {
  //     // });
  //   };
  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }
  //   sendCartData().catch((err) => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "error",
  //         title: "Error!...",
  //         message: "Sending cart data failed!",
  //       }),
  //     );
  //   });
  // }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
