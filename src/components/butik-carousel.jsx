import React, { useState, useEffect, useCallback } from 'react'
import Link from "next/link";
import SliderSlick from "react-slick";

const ButikCarousel = ({ butikLogos }) => {
  const [swiped, setSwiped] = useState(false)
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 800,
    loop: true,
    touchThreshold: 100,
    slidesToShow: butikLogos.length >= 10 ? 10 : butikLogos.length,
    slidesToScroll: 4,
    variableWidth: true
  };

  //Drag yaparken click problem çözümü => html => onClickCapture
  const handleSwiped = useCallback(() => {
    setSwiped(true)
  }, [setSwiped])

  const handleOnItemClick = useCallback(
    (e) => {
      if (swiped) {
        e.stopPropagation()
        e.preventDefault()
        setSwiped(false)
      }
    },
    [swiped]
  )

  return (
    <div className="butik-slider">
      <SliderSlick {...settings} onSwipe={handleSwiped}>
        {butikLogos && butikLogos.map((butik, index) =>
          <div className="butik-slider__wrp" onClickCapture={handleOnItemClick}>
            <Link href={`/${butik.attributes.butik_slug}`} key={index} >
              <div className="butik-slider__item">
                <img src={butik.attributes.butik_image} alt={butik.attributes.butik_name} />
              </div>
            </Link>
            <h2>{butik.attributes.butik_name}</h2>
          </div>
        )}
      </SliderSlick>
    </div>
  );
};

export default ButikCarousel;
