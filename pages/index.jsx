import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { useSelector, useDispatch } from "react-redux";
import Slider from "../src/components/slider";
import ButikCarousel from "../src/components/butik-carousel";
import HomeProduct from "../src/components/home-product";
import { fetchSliderBannerList } from "../src/store/actions/banner";
import { fetchButikLogo } from "../src/store/actions/butik";
import { fetchHomeProductList } from "../src/store/actions/products";

const Home = () => {
  const dispatch = useDispatch();
  let sliderBanners = useSelector((state) => state.banner.sliderBanners); //Dolan "banner" listesini al.
  let butikLogos = useSelector((state) => state.butik.butikLogos); //Dolan "butik logo" listesini al.
  let productList = useSelector((state) => state.products.homeProductList); //Dolan "5 li ürün" listesini al.
  useEffect(() => {
    dispatch(fetchSliderBannerList()); //"Banner" listesini doldurmak için action'a dispatch et.
    dispatch(fetchButikLogo());       //"Butik Logo" listesini doldurmak için action'a dispatch et.
    dispatch(fetchHomeProductList()); //"Anasayfa Ürünlerinin" listesini doldurmak için action'a dispatch et.
  }, []);

  return (
    <>
      <div className="banner-area">
        <div className="custom-container">
          <Slider banners={sliderBanners} />
          <ButikCarousel butikLogos={butikLogos} />
        </div>
      </div>
      <div className="home-product">
        {productList.map((category, index) => (
          <div className="home-product__wrp" key={index}>
            <h2 className="big-title">{category.attributes.title}</h2>
            <p className="sahin">popüler kategoriler</p>
            <Tabs className="tab">
              <TabList className="tab-list">
                {category.attributes.subCategory.map((subcategory, index) => (
                  <Tab className="tab-list__title" key={index}>{subcategory.title}</Tab> //Tab başlıkları
                ))}
              </TabList>
              {category.attributes.subCategory.map((subcategory, index) => (
                <TabPanel className="tab-panel" key={index}>
                  <HomeProduct productList={subcategory} />  {/* Tab içindeki ürünler */}
                </TabPanel>
              ))}
            </Tabs>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
