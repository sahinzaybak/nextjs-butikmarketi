const initialState = {
  orderDetailInfo: [],
  cargoInfo: [],
  myOrderList: [],
  defaultMyOrderList: [],
  userProductComment: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ORDER_DETAIL_INFO":
      return {
        ...state,
        orderDetailInfo: action.payload,
      };
    case "CARGO_INFO":
      return {
        ...state,
        cargoInfo: action.payload,
      };
    case "MY_ORDER_LIST":
      return {
        ...state,
        myOrderList: action.payload,
      };
    case "DEFAULT_MY_ORDER_LIST":
      return {
        ...state,
        defaultMyOrderList: action.payload,
      };
    case "USER_PRODUCT_COMMENT":
      return {
        ...state,
        userProductComment: action.payload,
      };
    default:
      return state;
  }
};
