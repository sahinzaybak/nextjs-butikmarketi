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
    dispatch(fetchButikLogo()); //"Butik" listesini doldurmak için action'a dispatch et.
    dispatch(fetchHomeProductList()); //"Ürün" listesini doldurmak için action'a dispatch et.
  }, []);

  return (
    <>
      <div className="custom-container">
        <Slider banners={sliderBanners} />
        <ButikCarousel butikLogos={butikLogos} />
      </div>


      <div>
        <h2 className="big-title mb-4">KADIN</h2>
        <Tabs className="tab">
          <TabList className="tab-list">
            <Tab className="tab-list__title">Ayakkabı</Tab>
            <Tab className="tab-list__title">Pantalon</Tab>
            <Tab className="tab-list__title">Elbise</Tab>
            <Tab className="tab-list__title">Bluz</Tab>
            <Tab className="tab-list__title">Çanta</Tab>
            <Tab className="tab-list__title">Aksesuar</Tab>
            <Tab className="tab-list__title">T-Shirt</Tab>
            <Tab className="tab-list__title">Gömlek</Tab>
            <Tab className="tab-list__title">Ceket</Tab>
            <Tab className="tab-list__title">İç Giyim</Tab>
          </TabList>

          <TabPanel className="tab-panel">
           
          </TabPanel>
         
     
        </Tabs>
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
