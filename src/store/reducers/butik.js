const initialState = {
  butikLogos: [],
  butikProfileInfo: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "BUTIK_LOGOS":
      return {
        ...state,
        butikLogos: action.payload,
      };
    case "BUTIK_PROFILE":
      return {
        ...state,
        butikProfileInfo: action.payload,
      };
    default:
      return state;
  }
};
