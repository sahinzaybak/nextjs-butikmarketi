const initialState = {
  orderDetailInfo: [],
  cargoInfo:[]
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

    default:
      return state;
  }
};
