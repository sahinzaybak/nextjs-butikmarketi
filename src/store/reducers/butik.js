const initialState = {
  butikLogos: [],
  butikProfileInfo: [],
  butikFilterLists: [],
  butikProducts: [],
  defaultProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "BUTIK_LOGOS":
      return {
        ...state,
        butikLogos: action.payload,
      };
    case "BUTIK_PROFILE":
      let filterList = [];
      action.payload.attributes.products.data.forEach((element) => {
        filterList.push({
          category_title: element.attributes.category,
          category_name: element.attributes.category_name,
          filter_title: element.attributes.filter_title,
        });
      });
      return {
        ...state,
        butikProfileInfo: action.payload,
        butikFilterLists: filterList,
      };
    case "BUTIK_PRODUCTS":
      return {
        ...state,
        butikProducts: action.payload,
      };
    case "DEFAULT_BUTIK_PRODUCTS":
      return {
        ...state,
        defaultProducts: state.butikProducts
      };
    default:
      return state;
  }
};
