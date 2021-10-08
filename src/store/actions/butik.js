import axios from "axios";
// const BASE_URL = process.env.REACT_APP_API_URL

export const fetchButikLogo = () => (dispatch) => { //Butik Logoları - Anasayfa carousel için
  axios.get("https://webizade.com/bm/stores").then((response) => {
    dispatch({
      type: "BUTIK_LOGOS",
      payload: response.data,
    });
  });
};

export const fetchButikProfileInfo = (butikTitle) => (dispatch) => { //Butik Profil Sayfası Bilgileri
  axios.get(`https://webizade.com/bm/singlestore?slug=${butikTitle}`).then((response) => {
    dispatch({
      type: "BUTIK_PROFILE",
      payload: response.data[0],
    });
  });
};

