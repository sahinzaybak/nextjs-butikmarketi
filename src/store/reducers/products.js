const initialState = {
  homeProductList: [],
  categoryProductList: [],
  detailProductInfo: [],
  productCategoryFilterList: [],
  productDetailSelectedFilterSize: "",
  productDetailSelectedSizeTitle: "",
  productDetailSelectedFilterColor: "",
  productDetailSelectedColorTitle: "",
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
    case "PRODUCT_CATEGORY_FILTER_LIST":
      return {
        ...state,
        productCategoryFilterList: action.payload,
      };
    case "PRODUCT_FILTER_APPLY":
      return {
        ...state,
        categoryProductList: action.payload,
      };
    case "SELECTED_FILTER_SIZE":
      return {
        ...state,
        productDetailSelectedFilterSize: action.payload.index,
        productDetailSelectedSizeTitle: action.payload.selectedTitle,
      };
    case "SELECTED_FILTER_COLOR":
      return {
        ...state,
        productDetailSelectedFilterColor: action.payload.index,
        productDetailSelectedColorTitle: action.payload.selectedTitle,
      };
    default:
      return state;
  }
};
