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
      payload: response.data,
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

export const fetchProductFilterList = (productMainCategory) => (dispatch) => { //Filtre Seçenekleri
  axios.get(`http://localhost:3001/filter/${productMainCategory}`).then((response) => {
    dispatch({
      type: "PRODUCT_CATEGORY_FILTER_LIST",
      payload: response.data.filter[0],
    });
  });
};

export const fetchProductFilterApply = (categoryTitle, filterMainTitle, filterText) => (dispatch) => { //Filtre Uygula
  axios.get(`http://localhost:3001/product/filter/${categoryTitle}/${filterMainTitle}/${filterText}/`).then((response) => {
    dispatch({
      type: "PRODUCT_FILTER_APPLY",
      payload: response.data,
    });
  });
};
