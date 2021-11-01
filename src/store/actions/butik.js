import axios from "axios";
// const BASE_URL = process.env.REACT_APP_API_URL

export const fetchButikLogo = () => (dispatch) => { //Butik Logoları - Anasayfa carousel için
  axios.get("http://localhost:3001/butik").then((response) => {
    dispatch({
      type: "BUTIK_LOGOS",
      payload: response.data.butik,
    });
  });
};

export const fetchButikProfileInfo = (butikTitle) => (dispatch) => { //Butik Profil Sayfası Bilgileri
  axios.get(`http://localhost:3001/butik/${butikTitle}`).then((response) => {
    dispatch({
      type: "BUTIK_PROFILE",
      payload: response.data.butik[0],
    });
  });
};

