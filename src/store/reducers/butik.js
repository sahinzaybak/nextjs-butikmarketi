const initialState = {
	butikLogos:[]
  }
  
  export default (state = initialState, action) => {
	switch (action.type) {
	  case "BUTIK_LOGOS":
		return{
		  ...state,
		  butikLogos: action.payload
		}
	  default:
		return state;
	}
  }