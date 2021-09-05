import React from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../src/store/store";
import Header from "../src/layout/header";

import 'bootstrap/dist/css/bootstrap.css';
import '../src/assets/scss/global.scss'
import '../src/assets/scss/layout/header.scss'
import '../src/assets/scss/layout/categories.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../src/assets/scss/slider.scss'
import '../src/assets/scss/butik-slider.scss'
import '../src/assets/scss/home-product.scss'

const myApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(myApp);
