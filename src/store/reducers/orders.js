const initialState = {
  orderDetailInfo:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "ORDER_DETAIL_INFO":
      return{
        ...state,
        orderDetailInfo: action.payload
      }
    default:
      return state;
  }
}