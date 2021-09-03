import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "../src/components/slider";
import ButikSlider from "../src/components/butik-slider";
import { fetchSliderBannerList } from "../src/store/actions/banner";
import { fetchButikLogo } from "../src/store/actions/butik";

const Home = () => {
  const dispatch = useDispatch();
  let sliderBanners = useSelector((state) => state.banner.sliderBanners); //Dolan kategori listesini al.
  let butikLogos = useSelector((state) => state.butik.butikLogos); //Dolan kategori listesini al.
  useEffect(() => {
    dispatch(fetchSliderBannerList()); //Kategori listesini doldurmak için action'a dispatch et.
    dispatch(fetchButikLogo()); //Kategori listesini doldurmak için action'a dispatch et.
  }, []);

  return (
    <>
      <div className="custom-container">
        <Slider banners={sliderBanners} />
        <ButikSlider butikLogos={butikLogos} />
      </div>
    </>
  );
};

export default Home;
