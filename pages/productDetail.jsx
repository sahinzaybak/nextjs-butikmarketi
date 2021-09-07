import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });


  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    touchThreshold: 100,


    fade: true,
    asNavFor: '.slider-nav'
  };

  const settingsThumbs = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,

    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '3px'
  };


  return (
    <div className="product-detail">
      <div className="custom-container">
        <div className="row">
          <div className="col-md-6">
            <div className="product-detail__image">
              <Slider {...settingsMain} asNavFor={nav2} ref={slider => (setSlider1(slider))}>
              <div className="slick-slide">
                  <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-3.jpg" />
                </div>
                <div className="slick-slide">
                  <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-11.jpg" />
                </div>
                <div className="slick-slide">
                  <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-13.jpg" />
                </div>
                <div className="slick-slide">
                  <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-2.jpg" />
                </div>
                
              </Slider>
            </div>
            {/* <div className="thumbnail-slider-wrap">
              <Slider {...settingsThumbs} asNavFor={nav1} ref={slider => (setSlider2(slider))}>
                <div className="slick-slide">
                  <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-5.jpg" />
                </div>
                <div className="slick-slide">
                  <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-3.jpg" />
                </div>
              </Slider>
            </div> */}
          </div>
          <div className="col-md-6">
            <div className="product-info">
              <p className="product-info__category mb-2">Ürün Sahibi: Shoes Butik</p>
              <h1 className="product-info__name">Starfish Dolgu taban terlik</h1>
              <div className="product-info__butic mt-2">
             
             <p className="mt-2">Bakışlarını gücünü artıran, makyajın ve suratınızın güzelliğini ortaya çıkaran en önemli adımlardan biri kaş şekillendirmedir. Kaş sabitleyici sabun kullanarak gün boyu etkili bakışlara sahip olabilirsiniz.</p>
           </div>

              <div className="product-info__butic color mt-4">
              <span>Ürün Resimleri</span>
                <div className="thumbnail-slider-wrap">
                  <Slider {...settingsThumbs} asNavFor={nav1} ref={slider => (setSlider2(slider))}>
                  <div className="slick-slide">
                      <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-3.jpg" />
                    </div>
                    <div className="slick-slide">
                      <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-11.jpg" />
                    </div>
                    <div className="slick-slide">
                      <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-13.jpg" />
                    </div>
                    <div className="slick-slide">
                      <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-2.jpg" />
                    </div>
                  </Slider>
                </div>

              </div>
              <div className="product-info__butic color mt-4">
              <span>Renk Seçenekleri</span>
                <div className="d-flex mt-2">
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
                </div>

              </div>
             
              
              <div className="product-info__butic mt-4">
              <span>Ürün Sahibi</span>
                <p className="mt-2">Bu ürün <u>Shoes Butik</u> tarafından gönderilecektir.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductDetail;
