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


export const fetchCategoryProductList = (categorySlug) => (dispatch) => {
  axios.get(`https://webizade.com/bm/categoryproduct?category=${categorySlug}`).then((response) => {
    dispatch({
      type: "CATEGORY_PRODUCT_LIST",
      payload: response.data[0],
    });
  });
};


export const fetchProductDetail = (productTitle) => (dispatch) => {
  axios.get(`https://webizade.com/bm/singleproduct?slug=${productTitle}`).then((response) => {
    dispatch({
      type: "PRODUCT_DETAIL_INFO",
      payload: response.data[0],
    });
  });
};
