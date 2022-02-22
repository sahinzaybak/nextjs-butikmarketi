const initialState = {
  searchList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SEARCHED_VALUES":
      return {
        ...state,
        searchList: action.payload,
      };
    case "SEARCH_LIST_CLEAR":
      return {
        ...state,
        searchList: action.payload,
      };
    default:
      return state;
  }
};
