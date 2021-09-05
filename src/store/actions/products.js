import axios from "axios";
// const BASE_URL = process.env.REACT_APP_API_URL

export const fetchHomeProductList = () => (dispatch) => {
  axios.get("https://webizade.com/bm/homeproducts").then((response) => {
    dispatch({
      type: "HOME_PRODUCT_LIST",
      payload: response.data,
    });
  });
};
