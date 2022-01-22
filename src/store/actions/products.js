import axios from "axios";
import {filterOptions} from '../../api/filterOptionsList'

export const fetchHomeProductList = () => (dispatch) => {
  axios.get("http://localhost:1337/api/home-products?populate=subCategory.products.butiks").then((response) => { //Anasayfa Ürünleri (5'li Yapı)
    dispatch({
      type: "HOME_PRODUCT_LIST",
      payload: response.data.data,
    });
  });
};


export const fetchCategoryProductList = (categorySlug) => (dispatch) => { //Kategoriye Göre Ürün Listesi - Kategori Sayfası
  axios.get(`http://localhost:1337/api/products?filters[category]=${categorySlug}&populate=butiks`).then((response) => {
    dispatch({
      type: "CATEGORY_PRODUCT_LIST",
      payload: response.data.data
    });
  });
};


export const fetchProductDetail = (productSlug) => (dispatch) => { //Ürün Detay Bilgileri - Ürün Detay Sayfası
  axios.get(`http://localhost:1337/api/products?filters[slug]=${productSlug}&populate=sizes,images,colors,comments,butiks`).then((response) => {
    dispatch({
      type: "PRODUCT_DETAIL_INFO",
      payload: response.data.data[0],
    });
  });
};

export const fetchProductFilterList = (productMainCategory) => (dispatch) => { //Kategoriye göre Filtre Seçeneklerini getir. (Giyim, Ayakkabı.vs)
  const selectedFilterOptions = filterOptions.filter (x => x.main_category == productMainCategory)
  console.log(selectedFilterOptions[0]?.filter)
    dispatch({
      type: "PRODUCT_CATEGORY_FILTER_LIST",
      payload: selectedFilterOptions[0]?.filter
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
