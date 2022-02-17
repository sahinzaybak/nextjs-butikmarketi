import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

//Modal Components
import ProductCard from '../../src/components/product-card'

//actions
import { fetchFavoriteList } from '../../src/store/actions/products'

const myFavorite = () => {
  const dispatch = useDispatch();
  let favoriteList = useSelector((state) => state.products.favoriteList); //Dolan "banner" listesini al.
  console.log(favoriteList)

  useEffect(() => {
    dispatch(fetchFavoriteList()) //üyenin siparişlerini getir.)
  }, [])

  return (
    <div className="my-favorite">
      <div className="my-favorite__header">
        <div className="custom-container h-100">
          <div className="my-favorite__header-text">
            <p>Favorilerim.</p>
            <span>Merhabalar, favori ürünlerinizi aşağıdaki kartlardan görebilirsiniz.</span>
          </div>
        </div>
      </div>
      <div className="custom-container mt-5">
        <div className="row">
          {favoriteList && favoriteList.map((product, index) => (
            <ProductCard product={product.attributes} key={index} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default myFavorite;
