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
  axios.get(`http://localhost:1337/api/products?filters[slug]=${productSlug}&populate=sizes,images,colors,comments.commentImages,butiks,clicks,whatsappClicks`).then((response) => {
    dispatch({
      type: "PRODUCT_DETAIL_INFO",
      payload: response.data.data[0],
    });
  });
};

export const fetchProductFilterList = (productMainCategory) => (dispatch) => { //Kategoriye göre Filtre Seçeneklerini getir. (Giyim, Ayakkabı.vs)
  const selectedFilterOptions = filterOptions.filter (x => x.main_category == productMainCategory)
    dispatch({
      type: "PRODUCT_CATEGORY_FILTER_LIST",
      payload: selectedFilterOptions[0]?.filter
    });
  
};

export const fetchProductFilterApply = (categotyMainTitle, filter) => (dispatch) => { //Filtre Uygula
  axios.get(`http://localhost:1337/api/products?populate=sizes&filters[category]=${categotyMainTitle}${filter}`).then((response) => {
    dispatch({
      type: "PRODUCT_FILTER_APPLY",
      payload: response.data.data
    });
  });
};

export const fetchAddFavorite = (productId, userId) => async (dispatch) => { //Favorilere ekle
  const config = {headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}`}};
  const favoriteList = await axios.get(`http://localhost:1337/api/favorites?populate=products`, config);
  let defaultProductIdArray = [productId]
  let deleteForDefaultProductArray = [] //favoriyi kaldırmak için

  //Önceden üye favoriye ürün eklemiş mi? eklemişse eski verileri de alıp PUT yap. 
  if(favoriteList.data.data.length > 0){ //Önceden üye favoriye ürün eklemiş mi?
    const favoriteListId = favoriteList.data.data[0].id; //favori listemin ID'si => update bu değere göre oluyor.
    favoriteList.data.data[0].attributes.attributes.products.data.forEach(element => { //Önceki favori ürünlerinin ID'lerini aldık.
      defaultProductIdArray.push(element.id)
      deleteForDefaultProductArray.push(element.id)
    });
    
    const isFavoriteValue = favoriteList.data.data[0].attributes.attributes.products.data.some(x => x.id == productId) //eklenmiş favori ürünü var mı?
    if(isFavoriteValue){ //Evet'se tıklanan ürünü favorilerden kaldır.
      debugger;
      for( var i = 0; i < deleteForDefaultProductArray.length; i++){ 
         if (deleteForDefaultProductArray[i] === productId) { //çıkarılacak değer => productId
          deleteForDefaultProductArray.splice(i, 1);
        }
      }
      axios.put(`http://localhost:1337/api/favorites/${favoriteListId}`, {
        data: {
          products: deleteForDefaultProductArray
        },
      }, config);
    }

    else{ //Hayır'sa tıklanan ürünü favorilere ekle.
      axios.put(`http://localhost:1337/api/favorites/${favoriteListId}`, {
        data: {
          products: defaultProductIdArray //ProductId arrayları => defaultProductIdArray [1,3,5,6..]
        },
      }, config);
    }
  }

  //Üye ilk defa ürünün favoriye ekleyecekse POST yap.
  else{
    axios.post("http://localhost:1337/api/favorites", {
      data: {
        userId: userId,
        products: productId
      },
    }, config)
  }
};

export const fetchFavoriteList = () => (dispatch) => { //Üyenin favorilerini getir.
  const config = {headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}`}};
  axios.get(`http://localhost:1337/api/favorites?populate=products`, config).then((response) => {
    dispatch({
      type: "FAVORITE_LIST",
      payload: response.data.data[0].attributes.attributes.products.data
    });
  });
};

export const fetchSelectedFavoritesProductIds = () => (dispatch) => { //Üyenin favorilerini getir.
  const config = {headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}`}};
  axios.get(`http://localhost:1337/api/favorites/getProductFavories?populate=products`, config).then((response) => {
    dispatch({
      type: "SELECTED_FAVORITES_PRODUCT_IDS",
      payload: response.data
    });
  });
};