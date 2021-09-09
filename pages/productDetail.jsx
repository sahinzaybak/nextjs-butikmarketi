import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import Image from 'next/image'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bag from '../src/assets/images/shipped.svg'
import whatsapp from '../src/assets/images/whatsapp.svg'
import instagram from '../src/assets/images/instagram.svg'
import ReactStars from 'react-stars'

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

  const ratingChanged = (newRating) => {
    console.log(newRating)
  }


  return (

    <div className="product-detail">
      <div className="headers">
        <div className="custom-container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="headers-butic d-flex">
              <div>
                <img src="https://webizade.com/bm/img/butik-3.jpg" alt="" />
              </div>
              <div className="d-block p-2">
                <div className="d-flex align-items-center">
                  <h5>Nişantaşı Shoes</h5>
                  <span>9.8</span>
                </div>

                <h3>Starfish Dolgu taban terlik</h3>
              </div>

            </div>

            <div className="d-flex align-items-center">
              <h4>89.90 ₺</h4>
              <div className="product-info__action">
                <div className="button orange mx-0">
                  <a href="#" className="d-flex align-items-center justify-content-center" target="_blank">
                    <Image src={bag} alt="Ürün hakkında soru sor" />
                    <p className="button-text">Satıcı ile anlaşıp, bu ürünü sipariş ettim :)</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="custom-container">
        <div className="row">
          <div className="col-md-6">
            <div className="product-detail__image">
              <div className="as">
                <Image src={instagram} alt="Ürün hakkında soru sor" />
              </div>

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



              <h1 className="product-info__name">Starfish Dolgu taban terlik</h1>

              {/* <h3 className="product-info__price">89.90 ₺</h3> */}
              <ReactStars
                count={5} value={4} onChange={ratingChanged} size={22} half={false} color1={'#e3eaea'} color2={'#ffcc65'} />
              <div class="d-flex align-items-center"><p><a>(6) Yorum </a>|</p><p class="spans"><a><strong>Yorum Yap</strong></a></p></div>

              <div className="product-info__butic mt-3">
                <span>Ürün Açıklaması</span>
                <p className="mt-1">Bakışlarını gücünü artıran, makyajın ve suratınızın güzelliğini ortaya çıkaran en önemli adımlardan biri kaş şekillendirmedir. Kaş sabitleyici sabun kullanarak gün boyu etkili bakışlara sahip olabilirsiniz.</p>
              </div>

              <div className="product-info__butic color mt-3">
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
              <div className="product-info__butic color mt-3">
                <span>Renk Seçenekleri</span>
                <div className="d-flex mt-1">
                  <p className="color"></p>
                  <p className="color"></p>
                  <p className="color"></p>
                  <p className="color"></p>
                </div>
              </div>
              <div className="product-info__colors color mt-3">
                <span>Ürün Sahibi</span>
                <p className="product-detail__desc mt-1">Bu ürün <u>Nişantaşı Shoes</u> tarafından gönderilecektir.</p>
              </div>
              <div className="product-info__action mt-4">
                <div className="button orange mx-0">
                  <a href="#" className="d-flex align-items-center justify-content-center" target="_blank">
                    <Image src={whatsapp} alt="Ürün hakkında soru sor" />
                    <p className="button-text">     Ürün hakkında satıcıya soru sorun veya ürünü sipariş edin.</p>
                  </a>
                </div>
              </div>


            </div>
          </div>
        </div>

      </div>
    </div>

  );
};

export default ProductDetail;
