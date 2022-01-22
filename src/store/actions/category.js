import categories from '../../api/categories.json'
export const fetchCategoryList = () => (dispatch) => { //Header Kategori Listesi
  dispatch({
    type: "CATEGORY_LIST",
    payload: categories,
  });
};

