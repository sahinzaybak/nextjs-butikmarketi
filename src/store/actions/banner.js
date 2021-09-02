import axios from "axios";
// const BASE_URL = process.env.REACT_APP_API_URL

export const fetchSliderBannerList = () => (dispatch) => {
  axios.get("https://webizade.com/bm/banner").then((response) => {
    dispatch({
      type: "SLIDER_BANNERS",
      payload: response.data,
    });
  });
};
