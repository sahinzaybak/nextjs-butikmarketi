import React from "react";
import SliderSlick from "react-slick";

const Slider = ({ banners }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    touchThreshold: 100,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return (
    <div className="slider">
      <div className="row">
        <div className="col-md-7">
          <div className="slider-left">
            <SliderSlick {...settings}>
              {banners.map((banner, index) =>
                <img src={banner.image} key={index} />
              )}
            </SliderSlick>
          </div>
        </div>
        <div className="col-md-5">
          <div className="banner">
            <div className="banner-item">
              <img src="https://cdn.dsmcdn.com/ty127/pimWidgetApi/webBig_20210608102632_c00eb5559e0new.jpg" alt="" />
            </div>
            <div className="banner-item">
              <img src="https://cdn.dsmcdn.com/ty125/pimWidgetApi/webBig_20210604115137_345678KadinWeb202106041352.jpg" alt="" />
            </div>
            <div className="banner-item">
              <img src="https://cdn.dsmcdn.com/ty128/campaign/banners/original/568865/9c993d0c8a_2_new.jpg" alt="" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Slider;
