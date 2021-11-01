import axios from "axios";
// const BASE_URL = process.env.REACT_APP_API_URL

export const fetchHomeProductList = () => (dispatch) => {
  axios.get("http://localhost:3001/homeProduct").then((response) => { //Anasayfa Ürünleri (5'li Yapı)
    dispatch({
      type: "HOME_PRODUCT_LIST",
      payload: response.data.homeProduct,
    });
  });
};


export const fetchCategoryProductList = (categorySlug) => (dispatch) => { //Kategoriye Göre Ürün Listesi - Kategori Sayfası
  axios.get(`http://localhost:3001/product/category/list/${categorySlug}`).then((response) => {
    dispatch({
      type: "CATEGORY_PRODUCT_LIST",
      payload: response.data.data[0],
    });
  });
};


export const fetchProductDetail = (productTitle) => (dispatch) => { //Ürün Detay Bilgileri - Ürün Detay Sayfası
  axios.get(`http://localhost:3001/product/${productTitle}`).then((response) => {
    dispatch({
      type: "PRODUCT_DETAIL_INFO",
      payload: response.data.product[0],
    });
  });
};
