const initialState = {
  sliderBanners:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "SLIDER_BANNERS":
      return{
        ...state,
        sliderBanners: action.payload
      }
    default:
      return state;
  }
}