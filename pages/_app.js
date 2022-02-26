import React from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { useRouter } from "next/router";
import store from "../src/store/store";
import Header from "../src/layout/header";
import {IsLoginIn} from '../src/helpers/auth'
import "bootstrap/dist/css/bootstrap.css";
import "react-responsive-modal/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../src/assets/scss/global.scss";
import "../src/assets/scss/layout/header.scss";
import "../src/assets/scss/layout/categories.scss";

import "../src/assets/scss/slider.scss";
import "../src/assets/scss/butik-slider.scss";
import "../src/assets/scss/product-card.scss";
import "../src/assets/scss/product-detail.scss";
import "../src/assets/scss/butic-profile.scss";
import "../src/assets/scss/atoms/buttons.scss";
import "../src/assets/scss/atoms/modal.scss";
import "../src/assets/scss/center-layout.scss";
import "../src/assets/scss/atoms/checkbox.scss";
import "../src/assets/scss/order-detail.scss";
import "../src/assets/scss/my-orders.scss";
import "../src/assets/scss/my-favorite.scss";
import "react-rater/lib/react-rater.css";
import "react-notifications-component/dist/theme.css";
import "animate.css/animate.min.css";

const myApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const showHeader = router.pathname === "/kayit-ol" ? false : true;
  const showHeader2 = router.pathname === "/giris-yap" ? false : true;

  return (
    <Provider store={store}>
      {showHeader && showHeader2 && <Header />}
      <Component {...pageProps} />
    </Provider>
  );
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(myApp);
