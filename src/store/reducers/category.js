const initialState = {
  categoryList:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "CATEGORY_LIST":
      return{
        ...state,
        categoryList: action.payload
      }
    default:
      return state;
  }
}