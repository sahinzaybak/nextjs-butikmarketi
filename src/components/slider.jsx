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
    slidesToScroll: 1,
  };

  return (
    <div className="slider">
      <div className="row">
        <div className="col-md-7">
          <div className="slider-left">
            <SliderSlick {...settings}>
              {banners.banners && banners.banners.data.map((banner, index) =>
                <img src={`http://localhost:1337${banner.attributes.formats.medium.url}`} alt={banner.attributes.caption} key={index} />
              )}
            </SliderSlick>
          </div>
        </div>
        <div className="col-md-5">
          {banners.smallbanner &&
            <div className="banner">
              <div className="banner-item">
                <img src={`http://localhost:1337${banners.smallbanner.data[0].attributes.formats.medium.url}`} alt={banners.smallbanner.data[0].attributes.caption} />
              </div>
              <div className="banner-item">
                <img src={`http://localhost:1337${banners.smallbanner.data[1].attributes.formats.medium.url}`} alt={banners.smallbanner.data[1].attributes.caption} />
              </div>
              <div className="banner-item">
                <img src={`http://localhost:1337${banners.smallbanner.data[2].attributes.formats.medium.url}`} alt={banners.smallbanner.data[2].attributes.caption} />
              </div>
            </div>
          }

        </div>
      </div>

    </div>
  );
};

export default Slider;
