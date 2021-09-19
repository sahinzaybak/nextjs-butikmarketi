import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "../src/components/slider";
import ButikCarousel from "../src/components/butik-carousel";
import HomeProduct from "../src/components/home-product";
import { fetchSliderBannerList } from "../src/store/actions/banner";
import { fetchButikLogo } from "../src/store/actions/butik";
import { fetchHomeProductList } from "../src/store/actions/products";

const Home = () => {
  const dispatch = useDispatch();
  let sliderBanners = useSelector((state) => state.banner.sliderBanners); //Dolan "kategori" listesini al.
  let butikLogos = useSelector((state) => state.butik.butikLogos); //Dolan "butik" listesini al.
  let productList = useSelector((state) => state.products.homeProductList); //Dolan "ürün" listesini al.

  useEffect(() => {
    dispatch(fetchSliderBannerList()); //"Kategori" listesini doldurmak için action'a dispatch et.
    dispatch(fetchButikLogo()); //"Butik" listesini doldurmak için action'a dispatch et.
    dispatch(fetchHomeProductList()); //"Ürün" listesini doldurmak için action'a dispatch et.
  }, []);

  return (
    <>
      <div className="custom-container">
        <Slider banners={sliderBanners} />
        <ButikCarousel butikLogos={butikLogos} />
      </div>
      <div className="product-detail__more pb-5">
        <div className="row">
          <div className="col-md-3">
            <div className="product-detail__more-item">
              <img src="https://footwearnews.com/wp-content/uploads/2019/05/met-gala-2019-converse.jpg" alt="" />
              <h2 className="product-detail__more-title">En renkli AYAKAKABI çeşitleri</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-detail__more-item">
              <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/white-tee-1623337322.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*" alt="" />
              <h2 className="product-detail__more-title">Yaza özel T-SHIRT çeşitleri</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-detail__more-item">
              <img src="https://glorytrends.com/wp-content/uploads/2020/04/womens-handbags-2021.jpg" alt="" />
              <h2 className="product-detail__more-title">Deri ÇANTA çeşitleri</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-detail__more-item">
              <img src="https://ktnimg.mncdn.com/mnresize/406/534/product-images/1KAK68167PW001/1500Wx1969H/1KAK68167PW001_G01_zoom1_V02.jpg" alt="" />
              <h2 className="product-detail__more-title">En güzel BLUZ çeşitleri</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="product-detail__more pb-5">
        <div className="row">
          <div className="col-md-3">
            <div className="product-detail__more-item">
              <img src="https://footwearnews.com/wp-content/uploads/2019/05/met-gala-2019-converse.jpg" alt="" />
              <h2 className="product-detail__more-title">En renkli AYAKAKABI çeşitleri</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-detail__more-item">
              <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/white-tee-1623337322.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*" alt="" />
              <h2 className="product-detail__more-title">Yaza özel T-SHIRT çeşitleri</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-detail__more-item">
              <img src="https://glorytrends.com/wp-content/uploads/2020/04/womens-handbags-2021.jpg" alt="" />
              <h2 className="product-detail__more-title">Deri ÇANTA çeşitleri</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-detail__more-item">
              <img src="https://ktnimg.mncdn.com/mnresize/406/534/product-images/1KAK68167PW001/1500Wx1969H/1KAK68167PW001_G01_zoom1_V02.jpg" alt="" />
              <h2 className="product-detail__more-title">En güzel BLUZ çeşitleri</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="product-detail__more pb-5">
        <div className="row">
          <div className="col-md-3">
            <div className="product-detail__more-item">
              <img src="https://footwearnews.com/wp-content/uploads/2019/05/met-gala-2019-converse.jpg" alt="" />
              <h2 className="product-detail__more-title">En renkli AYAKAKABI çeşitleri</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-detail__more-item">
              <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/white-tee-1623337322.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*" alt="" />
              <h2 className="product-detail__more-title">Yaza özel T-SHIRT çeşitleri</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-detail__more-item">
              <img src="https://glorytrends.com/wp-content/uploads/2020/04/womens-handbags-2021.jpg" alt="" />
              <h2 className="product-detail__more-title">Deri ÇANTA çeşitleri</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-detail__more-item">
              <img src="https://ktnimg.mncdn.com/mnresize/406/534/product-images/1KAK68167PW001/1500Wx1969H/1KAK68167PW001_G01_zoom1_V02.jpg" alt="" />
              <h2 className="product-detail__more-title">En güzel BLUZ çeşitleri</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="product-list">
        {productList.map((product, index) => (
          <HomeProduct productList={product} key={index} />
        ))}
      </div>
    </>
  );
};

export default Home;
