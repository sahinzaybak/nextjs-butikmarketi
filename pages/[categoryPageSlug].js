import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchCategoryProductList } from "../src/store/actions/products";
import ProductCard from "../src/components/product-card";

//Kategoriye ait ürünler sayfası
const categoryProducts = () => {
  const router = useRouter();
  const categoryTitle = router.query.categoryPageSlug;
  const dispatch = useDispatch();

  let categoryProductList = useSelector((state) => state.products.categoryProductList); //Dolan "kategori ürünlerinin" listesini al.

  useEffect(() => {
    if (categoryTitle != null)
      dispatch(fetchCategoryProductList(categoryTitle)); //"Girilen Kategoriye ait ürün listesini" doldurmak için action'a dispatch et.
  }, [categoryTitle]);

  return (
    <div className="product-item">
      <div className="custom-container">
        <h1 className="category-title">{categoryProductList.title}</h1>
        {categoryProductList && categoryProductList.products &&
          <div className="product-item__wrp d-flex">
            <div className="row">
              {categoryProductList.products.map((product, index) => (
                <ProductCard product={product} />
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default categoryProducts;
