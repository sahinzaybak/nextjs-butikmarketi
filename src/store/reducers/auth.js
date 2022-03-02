const initialState = {
  authInfo: "",
  isMemberOk: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_INFO":
      return {
        ...state,
        authInfo: action.payload,
      };
    case "MEMBER_OK":
      return {
        ...state,
        isMemberOk: action.payload,
      };
    default:
      return state;
  }
};
