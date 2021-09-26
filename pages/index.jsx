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
  let sliderBanners = useSelector((state) => state.banner.sliderBanners); //Dolan "kategori" listesini al.
  let butikLogos = useSelector((state) => state.butik.butikLogos); //Dolan "butik" listesini al.
  let productList = useSelector((state) => state.products.homeProductList); //Dolan "ürün" listesini al.

  useEffect(() => {
    dispatch(fetchSliderBannerList()); //"Kategori" listesini doldurmak için action'a dispatch et.
    dispatch(fetchButikLogo());       //"Butik" listesini doldurmak için action'a dispatch et.
    dispatch(fetchHomeProductList()); //"Anasayfa Ürün" listesini doldurmak için action'a dispatch et.
  }, []);

  return (
    <>
      <div className="custom-container">
        <Slider banners={sliderBanners} />
        <ButikCarousel butikLogos={butikLogos} />
      </div>
      {productList.map((category, index) => (
        <div className="product-list" key={index}>
          <h2 className="big-title mb-4">{category.title}</h2>
          <Tabs className="tab">
            <TabList className="tab-list">
              {category.subcategory.map((subcategory, index) => (
                <Tab className="tab-list__title" key={index}>{subcategory.title}</Tab> //Tab başlıkları
              ))}
            </TabList>
            {category.subcategory.map((subcategory, index) => (
              <TabPanel className="tab-panel" key={index}>
                <HomeProduct productList={subcategory}/>  {/* Tab içindeki ürünler */}
              </TabPanel>
            ))}
          </Tabs>
        </div>
      ))}
    </>
  );
};

export default Home;
