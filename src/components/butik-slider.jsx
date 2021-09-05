import React from "react";
import SliderSlick from "react-slick";

const ButikSlider = ({ butikLogos }) => {
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    touchThreshold: 100,
    slidesToShow: 10,
    // slidesToScroll: 9,
    variableWidth: true
  };

  return (
    <div className="butik-slider">
      <SliderSlick {...settings}>
        {butikLogos.map((butik, index) =>
          <div className="butik-slider__item" key={index}>
            <img src={butik.butik_image} alt={butik.butik} />
          </div>
        )}
      </SliderSlick>
    </div>
  );
};

export default ButikSlider;
