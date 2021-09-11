import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchCategoryProductList } from "../../src/store/actions/products";
import ProductCard from "../../src/components/product-card";

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
    <div className="product-item category">
      <div className="custom-container">
        <div className="row"></div>

        {categoryProductList && categoryProductList.products &&
          <div className="row">
            <div className="col-md-2">
              <div className="filter">
                {/* <h6>Filtrele</h6> */}
                <div className="filter-item">
                  <h6 className="filter-title">Kullanım Alanı</h6>
                  <div className="filter-choose">
                    <label class="checkbox">
                      <span class="checkbox__input">
                        <input type="checkbox" name="checkbox" />
                        <span class="checkbox__control">
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                      </span>
                      <span class="radio__label">Spor</span>
                    </label>
                  </div>
                  <div className="filter-choose">
                    <label class="checkbox">
                      <span class="checkbox__input">
                        <input type="checkbox" name="checkbox" />
                        <span class="checkbox__control">
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                      </span>
                      <span class="radio__label">Günlük</span>
                    </label>
                  </div>
                  <div className="filter-choose">
                    <label class="checkbox">
                      <span class="checkbox__input">
                        <input type="checkbox" name="checkbox" />
                        <span class="checkbox__control">
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                      </span>
                      <span class="radio__label">Futbol</span>
                    </label>
                  </div>
                </div>
                <div className="filter-item">
                  <h6 className="filter-title">Marka</h6>
                  <div className="filter-choose">
                    <label class="checkbox">
                      <span class="checkbox__input">
                        <input type="checkbox" name="checkbox" />
                        <span class="checkbox__control">
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                      </span>
                      <span class="radio__label">Adidas</span>
                    </label>
                  </div>
                  <div className="filter-choose">
                    <label class="checkbox">
                      <span class="checkbox__input">
                        <input type="checkbox" name="checkbox" />
                        <span class="checkbox__control">
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                      </span>
                      <span class="radio__label">Puma</span>
                    </label>
                  </div>
                  <div className="filter-choose">
                    <label class="checkbox">
                      <span class="checkbox__input">
                        <input type="checkbox" name="checkbox" />
                        <span class="checkbox__control">
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                      </span>
                      <span class="radio__label">Reebok</span>
                    </label>
                  </div>
                </div>
                <div className="filter-item">
                  <h6 className="filter-title">Renk</h6>
                  <div className="filter-choose">
                    <label class="checkbox">
                      <span class="checkbox__input">
                        <input type="checkbox" name="checkbox" />
                        <span class="checkbox__control">
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                      </span>
                      <span class="radio__label">Sarı</span>
                    </label>
                  </div>
                  <div className="filter-choose">
                    <label class="checkbox">
                      <span class="checkbox__input">
                        <input type="checkbox" name="checkbox" />
                        <span class="checkbox__control">
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                      </span>
                      <span class="radio__label">Lacivert</span>
                    </label>
                  </div>
                  <div className="filter-choose">
                    <label class="checkbox">
                      <span class="checkbox__input">
                        <input type="checkbox" name="checkbox" />
                        <span class="checkbox__control">
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                      </span>
                      <span class="radio__label">Kırmızı</span>
                    </label>
                  </div>
                  <div className="filter-choose">
                    <label class="checkbox">
                      <span class="checkbox__input">
                        <input type="checkbox" name="checkbox" />
                        <span class="checkbox__control">
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                      </span>
                      <span class="radio__label">Siyah</span>
                    </label>
                  </div>
                  <div className="filter-choose">
                    <label class="checkbox">
                      <span class="checkbox__input">
                        <input type="checkbox" name="checkbox" />
                        <span class="checkbox__control">
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                      </span>
                      <span class="radio__label">Beyaz</span>
                    </label>
                  </div>
                  <div className="filter-choose">
                    <label class="checkbox">
                      <span class="checkbox__input">
                        <input type="checkbox" name="checkbox" />
                        <span class="checkbox__control">
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                      </span>
                      <span class="radio__label">Siyah</span>
                    </label>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="col-md-10">
              <h1 className="category-title">{categoryProductList.title}</h1>
              <div className="product-item__wrp d-flex">
                <div className="row">
                  {categoryProductList.products.map((product, index) => (
                    <ProductCard product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>

        }
      </div>
    </div>
  );
};

export default categoryProducts;
