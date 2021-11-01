//** Kategoriye Ait Ürünler Sayfası

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchCategoryProductList, fetchProductFilterList, fetchProductFilterApply } from "../../../../src/store/actions/products";
import ProductCard from "../../../../src/components/product-card";

const categoryProducts = () => {
  const router = useRouter();
  const categoryMainTitle = router.query.mainCatTitle; //Filtre için ana kategori (giyim, ayakkabı..vs)
  const categoryTitle = router.query.categoryPageSlug;
  const dispatch = useDispatch();

  let categoryProductList = useSelector((state) => state.products.categoryProductList); //Dolan "kategori ürünlerinin" listesini al.
  let filterList = useSelector((state) => state.products.productCategoryFilterList); //Dolan "filtre" listesini al.
  useEffect(() => {
    if (categoryTitle != null)
      dispatch(fetchCategoryProductList(categoryTitle)); //"Girilen Kategoriye ait ürün listesini" doldurmak için action'a dispatch et.
  }, [categoryTitle]);

  useEffect(() => {
    dispatch(fetchProductFilterList(categoryMainTitle)); //Filtre seçeneklerini doldur.
  }, [categoryMainTitle]);

  function selectedFilter(e) { //Filtre uygula
    let checkedMainTitle = e.target.title
    let checkedValue = e.target.value
    dispatch(fetchProductFilterApply(categoryTitle, checkedMainTitle, checkedValue));
  }

  return (
    <div className="categories-product">
      <div className="product-card category">
        <div className="custom-container">
          <div className="row"></div>
          {categoryProductList && filterList && categoryProductList.products &&
            <div className="row">
              <div className="col-md-2">
                <div className="filter">
                  {/* <h6>Filtreler</h6> */}
                  {filterList.filter && filterList.filter.map((filterSub, index) => (
                    <div className="filter-item" key={index}>
                      <h6 className="filter-title">{filterSub.main_title_text}</h6>
                      {filterSub && filterSub.filter_sub.map((filter, index) =>
                        <div className="filter-choose" key={index}>
                          <label className="checkbox">
                            <span className="checkbox__input">
                              <input type="checkbox" value={filter.title} title={filterSub.main_title} name="checkbox"
                                onChange={e => selectedFilter(e)} />
                              <span className="checkbox__control">
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                                  <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' />
                                </svg>
                              </span>
                            </span>
                            <span className="radio__label">{filter.title}</span>
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-10">
                <div className="category-title__wrp">
                  <h1 className="category-title">{categoryProductList.title}</h1>
                </div>
                <div className="product-card__wrp">
                  <div className="row">
                    {categoryProductList.products.map((product, index) => (
                      <ProductCard product={product} key={index} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>

  );
};

export default categoryProducts;
