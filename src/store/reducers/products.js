const initialState = {
  homeProductList:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "HOME_PRODUCT_LIST":
      return{
        ...state,
        homeProductList: action.payload
      }
    default:
      return state;
  }
}