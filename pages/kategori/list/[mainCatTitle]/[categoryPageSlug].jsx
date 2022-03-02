//** Kategoriye Ait Ürünler Sayfası

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

//Components
import ProductCard from "../../../../src/components/product-card";
import ProductFilter from "../../../../src/components/product-filter/product-filter";

//Actions
import { fetchCategoryProductList, fetchProductFilterList, fetchProductFilterApply, fetchSelectedFavoritesProductIds } from "../../../../src/store/actions/products";

//Helpers
import { IsLoginIn } from '../../../../src/helpers/auth'

const categoryProducts = () => {
  const router = useRouter();
  const categoryMainTitle = router.query.mainCatTitle; //Filtre için ana kategori (giyim, ayakkabı..vs) filter_title  => (backend)
  const categoryTitle = router.query.categoryPageSlug;
  const dispatch = useDispatch();

  let categoryProductList = useSelector((state) => state.products.categoryProductList); //Dolan "kategori ürünlerinin" listesini al.
  let filterList = useSelector((state) => state.products.productCategoryFilterList); //Dolan "filtre" listesini al.

  useEffect(() => {
    if (categoryTitle != null) {
      dispatch(fetchCategoryProductList(categoryTitle)); //"Girilen Kategoriye ait ürün listesini" doldurmak için action'a dispatch et.
      if (IsLoginIn())
        dispatch(fetchSelectedFavoritesProductIds());
    }
  }, [categoryTitle]);

  useEffect(() => {
    dispatch(fetchProductFilterList(categoryMainTitle)); //Filtre seçeneklerini doldur.
  }, [categoryMainTitle]);

  return (
    <div className="categories-product">
      <div className="product-card category">
        <div className="custom-container">
          <div className="row"></div>
          {categoryProductList && filterList &&
            <div className="row">
              <div className="col-md-2">
                <ProductFilter categoryTitle={categoryTitle} filterList={filterList} pageType="categoryProduct" />
              </div>
              <div className="col-md-10">
                <div className="category-title__wrp">
                  <h1 className="category-title">{categoryProductList.title}</h1>
                </div>
                <div className="product-card__wrp">
                  <div className="row">
                    {categoryProductList.map((product, index) => (
                      <ProductCard product={product.attributes} productId={product.id} key={index} />
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
