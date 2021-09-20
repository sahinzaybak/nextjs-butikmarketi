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
        <div className="col-md-6">
            <div className="general">
            <h2 className="product-detail__more-title">AYAKKABI MODELLERİ</h2>
              <div className="row">
                <div className="col-md-6 pr-0 mb-3">
                  <div className="product-detail__more-item">
                    <img src="https://cdn.shopify.com/s/files/1/0068/0768/3136/products/Classic-Sandals-Women-Shoes-Scottish-Plaid-High-Heels-Women-Pumps-Cross-Tied-Ladies-Shoes-Ankle-Strap_580x.jpg?v=1621254471" alt="" />
                    <h2 className="product-detail__more-title gender">KADIN</h2>
                  </div>
                </div>
                <div className="col-md-6 p-0">
                  <div className="product-detail__more-item">
                    <img src="https://www.mansbrand.com/wp-content/uploads/2020/09/thursday-boots-white-sneakers-e1600705544796.jpg" alt="" />
                    <h2 className="product-detail__more-title gender">ERKEK</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="general">
            <h2 className="product-detail__more-title">PANTALON MODELLERİ</h2>
              <div className="row">
                <div className="col-md-6 pr-0">
                  <div className="product-detail__more-item">
                    <img src="https://cdn.shopify.com/s/files/1/0036/7306/3491/files/shop-edit.jpg?v=1564408580" alt="" />
                    <h2 className="product-detail__more-title gender">KADIN</h2>
                  </div>
                </div>
                <div className="col-md-6 p-0">
                  <div className="product-detail__more-item">
                    <img src="https://i.pinimg.com/originals/62/c7/d0/62c7d0a8a21e4939931a399877b99a28.jpg" alt="" />
                    <h2 className="product-detail__more-title gender">ERKEK</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-3">
            <div className="general">
            <h2 className="product-detail__more-title">ELBİSE MODELLERİ</h2>
              <div className="row">
                <div className="col-md-12 pr-0">
                  <div className="product-detail__more-item">
                    <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spring-wedding-guest-dresses-1-1579898788.png" alt="" />
                    <h2 className="product-detail__more-title gender">KADIN</h2>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="general">
            <h2 className="product-detail__more-title">BLUZ MODELLERİ</h2>
              <div className="row">
                <div className="col-md-12 pr-0">
                  <div className="product-detail__more-item">
                    <img src="https://cdn.shopify.com/s/files/1/0035/5935/8509/files/PhoebePointelleCard_03_900x_a9f1513d-714a-43ea-a64f-f8a68466807a_720x.jpg?v=1616483120" alt="" />
                    <h2 className="product-detail__more-title gender">KADIN</h2>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="general">
            <h2 className="product-detail__more-title">ÇANTA MODELLERİ</h2>
              <div className="row">
                <div className="col-md-6 pr-0">
                  <div className="product-detail__more-item">
                    <img src="https://www.bayareafashionista.com/wp-content/uploads/2018/01/gucci-marmont-lady-bag.jpg" alt="" />
                    <h2 className="product-detail__more-title gender">KADIN</h2>
                  </div>
                </div>
                <div className="col-md-6 p-0">
                  <div className="product-detail__more-item">
                    <img src="https://i.insider.com/561443069dd7cc1a008bfbd4?width=750&format=jpeg&auto=webp" alt="" />
                    <h2 className="product-detail__more-title gender">ERKEK</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="general">
            <h2 className="product-detail__more-title">AKSESUAR MODELLERİ</h2>
              <div className="row">
                <div className="col-md-6 pr-0">
                  <div className="product-detail__more-item">
                    <img src="https://cdn.shopify.com/s/files/1/0437/1913/1293/files/banner-19_1512x.jpg?v=1599187394" alt="" />
                    <h2 className="product-detail__more-title gender">KADIN</h2>
                  </div>
                </div>
                <div className="col-md-6 p-0">
                  <div className="product-detail__more-item">
                    <img src="https://cdn.shopify.com/s/files/1/0437/1913/1293/files/banner-21_2048x.jpg?v=1599187421" alt="" />
                    <h2 className="product-detail__more-title gender">ERKEK</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="general">
            <h2 className="product-detail__more-title">T-SHIRT MODELLERİ</h2>
              <div className="row">
                <div className="col-md-6 pr-0">
                  <div className="product-detail__more-item">
                    <img src="https://cdn.shopify.com/s/files/1/0036/7306/3491/files/womens-top.jpg?v=1609224699" alt="" />
                    <h2 className="product-detail__more-title gender">KADIN</h2>
                  </div>
                </div>
                <div className="col-md-6 p-0">
                  <div className="product-detail__more-item">
                    <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/white-tee-1623337322.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*" alt="" />
                    <h2 className="product-detail__more-title gender">ERKEK</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="general">
            <h2 className="product-detail__more-title">GÖMLEK MODELLERİ</h2>
              <div className="row">
                <div className="col-md-6 pr-0">
                  <div className="product-detail__more-item">
                    <img src="https://media.boohoo.com/i/boohoo/fzz60399_blue_xl?pdp.template" alt="" />
                    <h2 className="product-detail__more-title gender">KADIN</h2>
                  </div>
                </div>
                <div className="col-md-6 p-0">
                  <div className="product-detail__more-item">
                    <img src="https://i.pinimg.com/474x/ca/32/cc/ca32cc91c9be328a2f69cbd73e1209e5.jpg" alt="" />
                    <h2 className="product-detail__more-title gender">ERKEK</h2>
                  </div>
                </div>
              </div>
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
