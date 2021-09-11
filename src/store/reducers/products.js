const initialState = {
  homeProductList: [],
  categoryProductList: [],
  detailProductInfo: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "HOME_PRODUCT_LIST":
      return {
        ...state,
        homeProductList: action.payload,
      };
    case "CATEGORY_PRODUCT_LIST":
      return {
        ...state,
        categoryProductList: action.payload,
      };
    case "PRODUCT_DETAIL_INFO":
      return {
        ...state,
        detailProductInfo: action.payload,
      };
    default:
      return state;
  }
};
