import axios from "axios";
// const BASE_URL = process.env.REACT_APP_API_URL

export const fetchButikLogo = () => (dispatch) => { //Butik Logoları - Anasayfa carousel için
  axios.get("http://localhost:1337/api/butiks").then((response) => {
    dispatch({
      type: "BUTIK_LOGOS",
      payload: response.data.data,
    });
  });
};

export const fetchButikProfileInfo = (butikSlug) => (dispatch) => { //Butik Profil Sayfası Bilgileri
  axios.get(`http://localhost:1337/api/butiks?filters[butik_slug]=${butikSlug}&populate=products.butiks`).then((response) => {
    dispatch({
      type: "BUTIK_PROFILE",
      payload: response.data.data[0].attributes
    });
  });
};

