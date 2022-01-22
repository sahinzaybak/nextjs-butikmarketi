import axios from "axios";
// const BASE_URL = process.env.REACT_APP_API_URL

export const fetchSliderBannerList = () => (dispatch) => { //Anasayfa Slider Banner
  axios.get("http://localhost:1337/api/banners").then((response) => {
    dispatch({
      type: "SLIDER_BANNERS",
      payload: response.data.data,
    });
  });
};
