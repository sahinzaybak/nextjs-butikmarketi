import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Slider from '../src/components/slider'
import { fetchSliderBannerList } from '../src/store/actions/banner'

const Home = () => {
  const dispatch = useDispatch()
  let sliderBanners = useSelector(state => state.banner.sliderBanners) //Dolan kategori listesini al.
  useEffect(() => {
    dispatch(fetchSliderBannerList()) //Kategori listesini doldurmak için action'a dispatch et.
  }, [])

  return (
    <>
      <div className="custom-container">
        <Slider banners={sliderBanners} />
      </div>
    </>
  )
}

export default Home;