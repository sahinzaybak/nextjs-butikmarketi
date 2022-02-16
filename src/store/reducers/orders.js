const initialState = {
  orderDetailInfo: [],
  cargoInfo: [],
  myOrderList: [],
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

    default:
      return state;
  }
};
