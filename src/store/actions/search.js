import axios from "axios";
export const fetchSearch = (searchedValue) => (dispatch) => { //Üyenin favorilerini getir.
	axios.get(`http://localhost:1337/api/search/${searchedValue}`).then((response) => {
	  dispatch({
		type: "FETCH_SEARCHED_VALUES",
		payload: response.data
	  });
	});
  };