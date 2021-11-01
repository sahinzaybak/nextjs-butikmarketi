import axios from "axios";
// const BASE_URL = process.env.REACT_APP_API_URL

export const fetchSliderBannerList = () => (dispatch) => { //Anasayfa Slider Banner
  axios.get("http://localhost:3001/banner").then((response) => {
    dispatch({
      type: "SLIDER_BANNERS",
      payload: response.data.banner,
    });
  });
};
