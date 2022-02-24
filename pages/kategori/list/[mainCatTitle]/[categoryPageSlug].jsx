//** Kategoriye Ait Ürünler Sayfası

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchCategoryProductList, fetchProductFilterList, fetchProductFilterApply, fetchSelectedFavoritesProductIds } from "../../../../src/store/actions/products";
import ProductCard from "../../../../src/components/product-card";

const categoryProducts = () => {
  const router = useRouter();
  const isInitialMount = useRef(true);
  const categoryMainTitle = router.query.mainCatTitle; //Filtre için ana kategori (giyim, ayakkabı..vs) filter_title  => (backend)
  const categoryTitle = router.query.categoryPageSlug;
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [isActive, setActive] = useState([]);
  const [selectedFilterTitle, setSelectedFilterTitle] = useState([]);

  let categoryProductList = useSelector((state) => state.products.categoryProductList); //Dolan "kategori ürünlerinin" listesini al.
  let filterList = useSelector((state) => state.products.productCategoryFilterList); //Dolan "filtre" listesini al.

  useEffect(() => {
    if (categoryTitle != null) {
      dispatch(fetchCategoryProductList(categoryTitle)); //"Girilen Kategoriye ait ürün listesini" doldurmak için action'a dispatch et.
      dispatch(fetchSelectedFavoritesProductIds());
    }
  }, [categoryTitle]);

  useEffect(() => {
    dispatch(fetchProductFilterList(categoryMainTitle)); //Filtre seçeneklerini doldur.
  }, [categoryMainTitle]);


  // Ürün filtrele >
  const handleCheck = (event) => {
    let updatedList = [...checked];
    let selectedFilterArray = [...isActive]; //filtre seçince seçilen filtreye active class eklemek için. X,S,M 'leri arraya aldık ki class eklerken ...includes(X) == true olursa buna göre seçili filtreye class'ı ekleyelim. Diğer türlü bütün filtrelere class ekliyordu.
    if (event.target.checked) {
      setSelectedFilterTitle(event.target.title + 's'); //color+s, size+s
      updatedList = [...checked, `&filters[${event.target.title}s][${event.target.title}_title][$in]=` + event.target.value]; //filtre seç
      selectedFilterArray = [...isActive, event.target.value]; //filtre seçince seçilen filtreye active class eklemek için. 
    }

    else{
      updatedList.splice(checked.indexOf(`&filters[${event.target.title}s][${event.target.title}_title][$in]=` + event.target.value), 1); //filtre çıkar
      selectedFilterArray.splice(isActive.indexOf(event.target.value), 1); ///filtre seçince seçilen filtreye active class silmek için. 
    }
  
    setChecked(updatedList);
    setActive(selectedFilterArray);
  };

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false; // ilk sayfa yüklendiğinde useEffect çalışmasın. Mount & Update ayrımı 
    else {
      const checkedItems = checked.length ?
        checked.reduce((total, item) => {
          return total + item;
        }) : "";

      dispatch(fetchProductFilterApply(categoryTitle, checkedItems, selectedFilterTitle)); //Filtreyi Uygula
      //categoryTitle => elbise-x-c56 -- checkedItems => &filters[sizes][size_title][$in]=XXL&filters[sizes][size_title][$in]=XL
    }
  }, [checked]); //Filtreleden filtre seçildiği zaman çalışsın

  //Ürün Filtrele  />

  return (
    <div className="categories-product">
      <div className="product-card category">
        <div className="custom-container">
          <div className="row"></div>
          {categoryProductList && filterList &&
            <div className="row">
              <div className="col-md-2">
                <div className="filter">
                  {filterList && filterList.map((filterSub, index) => (
                    <div className="filter-item" key={index}>
                      <h6 className="filter-title">{filterSub.main_title_text}</h6>
                      {filterSub && filterSub.filter_sub.map((filter, index) =>
                        <div className="filter-choose"key={index}>
                          <label className="checkbox" className={`checkbox ${isActive.includes(filter.title) ? "active" : ""}`}>
                            <span className="checkbox__input">
                              <input type="checkbox" value={filter.title} title={filterSub.main_title} name="checkbox"
                                onChange={handleCheck} />
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
