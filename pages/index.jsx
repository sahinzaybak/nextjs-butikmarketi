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


      <div className="custom-container">
        <h2 className="big-title">MODA</h2>
        <Tabs className="tab">
          <TabList className="tab-list mb-4">
            <Tab className="tab-list__title">Kadın & Erkek</Tab>
            <Tab className="tab-list__title">Çocuk</Tab>
            <Tab className="tab-list__title">Bebek</Tab>
          </TabList>

          <TabPanel className="tab-panel">
            <div className="product-detail__more">
              <div className="row">
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">AYAKKABI MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0 mb-3">
                        <div className="product-detail__more-item">
                          <img src="https://c4.wallpaperflare.com/wallpaper/1022/89/216/women-model-shoes-high-heels-wallpaper-preview.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KADIN</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://static.langimg.com/thumb/msid-81058152,width-1200,height-900,resizemode-75/navbharat-times.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">PANTALON MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://cdn.shopify.com/s/files/1/0036/7306/3491/files/shop-edit.jpg?v=1564408580" alt="" />
                          <h2 className="product-detail__more-title gender">KADIN</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://i.pinimg.com/originals/62/c7/d0/62c7d0a8a21e4939931a399877b99a28.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="general">
                    <h2 className="product-detail__more-title">ELBİSE MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-12 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spring-wedding-guest-dresses-1-1579898788.png" alt="" />
                          <h2 className="product-detail__more-title gender">KADIN</h2>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">BLUZ MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-12 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://cdn.shopify.com/s/files/1/0035/5935/8509/files/PhoebePointelleCard_03_900x_a9f1513d-714a-43ea-a64f-f8a68466807a_720x.jpg?v=1616483120" alt="" />
                          <h2 className="product-detail__more-title gender">KADIN</h2>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">ÇANTA MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://i.pinimg.com/736x/57/30/ef/5730ef82ee1dc0f9b96855ca99556c52.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KADIN</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mrj09heilr-goruck-gr1-26l-8-original-1606753515.jpg?crop=1.00xw:0.668xh;0,0.0623xh&resize=640:*" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="general">
                    <h2 className="product-detail__more-title">TAKI,SAAT,GÖZLÜK VE DAHA FAZLASI</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://aestheticallychicbeauty.com/wp-content/uploads/2020/02/Gouden-sieraden-online-kopen-_-Fashionchick_nl.jpeg" alt="" />
                          <h2 className="product-detail__more-title gender">KADIN</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://www.realmenrealstyle.com/wp-content/uploads/2019/11/mens-jewelry-bracelet-steel-shop.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">T-SHIRT MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://cdn.shopify.com/s/files/1/0036/7306/3491/files/womens-top.jpg?v=1609224699" alt="" />
                          <h2 className="product-detail__more-title gender">KADIN</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/white-tee-1623337322.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">GÖMLEK MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0 mb-3">
                        <div className="product-detail__more-item">
                          <img src="https://media.boohoo.com/i/boohoo/fzz60399_blue_xl?pdp.template" alt="" />
                          <h2 className="product-detail__more-title gender">KADIN</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://i.pinimg.com/474x/ca/32/cc/ca32cc91c9be328a2f69cbd73e1209e5.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">CEKET MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://blog.thejacketmaker.com/wp-content/uploads/2021/07/Denim-jacket-female-feature-930x620.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KADIN</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://assets.overland.com/is/image/overlandsheepskin/14227-bkb2-av90452?wid=330" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">İÇ GİYİM MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0">
                        <div className="product-detail__more-item">
                          <img src="http://images.summitmedia-digital.com/cosmo/images/2014-images/february_2014/02-07-2014/lace-lingerie-main-image.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KADIN</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://i.pinimg.com/originals/01/36/7a/01367a66c2ef104fc432abef54648faf.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </TabPanel>
          <TabPanel className="tab-panel">
            <div className="product-detail__more pb-5">
              <div className="row">
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">SPOR AYAKKABI MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0 mb-3">
                        <div className="product-detail__more-item">
                          <img src="https://www.rankandstyle.com/media/lists/t/tween-sneakers-kids_nkzalGl.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ ÇOCUK</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://cdn.shopify.com/s/files/1/0245/2950/2289/files/Charlie-Blue_marlin_1140x.jpg?v=1627699637" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK ÇOCUK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">T-SHIRT MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://media.vertbaudet.com/Pictures/vertbaudet/184816/t-shirt-with-3d-bow-detail-for-girls.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ ÇOCUK</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://imgaz1.chiccdn.com/thumb/large/oaupload/newchic/images/2A/74/af2f688b-c8b9-4a4c-9cca-e1bca8fd8af1.jpg?s=906x906" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK ÇOCUK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">SWEATSHIRT MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://i.pinimg.com/originals/62/4e/39/624e395f3215f1c382da33d02c64d12f.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ ÇOCUK</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://thetshirtman.co.uk/wp-content/uploads/2017/10/prod_62039_115249.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK ÇOCUK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">EŞOFMAN MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0 mb-3">
                        <div className="product-detail__more-item">
                          <img src="https://i8.amplience.net/i/jpl/jd_369934_b?qlt=92&w=600&h=765&v=1" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ ÇOCUK</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/sxkwvrbtjbpx5zerp9ur/sportswear-older-tracksuit-ZSm4DZ.png" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK ÇOCUK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">ŞORT MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://www.twinset.com/dw/image/v2/BCKJ_PRD/on/demandware.static/-/Sites-master-catalog/default/dw321ced17/images/TwinSet/Images/Catalog/201GJ2361-03498-03.JPG?sw=930" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ ÇOCUK</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://i.pinimg.com/originals/84/62/e4/8462e41da753293f28e257cf1d33c248.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK ÇOCUK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">İÇ GİYİM-PİJAMA MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://www.katiaandbony.com/forever-baskili-kiz-cocuk-pijama-takimi-mellow-rose-kiz-cocuk-pijama-katiabony-14383-50-K.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ ÇOCUK</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0 mb-3">
                        <div className="product-detail__more-item">
                          <img src="https://cdn.arnetta.com.tr/batman-lisansli-lacivert-erkek-cocuk-pijama-takimi-outlet-batman-1alana1bedava-9036-14-B.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK ÇOCUK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">ELBİSE MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-12 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://lunamag.com/wp-content/uploads/2018/03/8-epic-Belgian-Brands-for-kids.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ ÇOCUK</h2>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">TAYT MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-12 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://cdn.shoplo.com/6950/s/4/assets/banner_15967265671.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ ÇOCUK</h2>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="tab-panel">
            <div className="product-detail__more pb-5">
              <div className="row">
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title"> AYAKKABI MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0 mb-3">
                        <div className="product-detail__more-item">
                          <img src="https://i2.wp.com/thefrugalgirls.com/wp-content/uploads/2018/09/Free-Baby-Shoes-With-Promo-Code.jpg?fit=612%2C615&ssl=1" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ BEBEK</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://cdn.shopify.com/s/files/1/1284/8025/products/bear_shoes_on_1024x1024.jpg?v=1552034884" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK BEBEK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">TAKIM MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://ae01.alicdn.com/kf/HTB1EuNtiBDH8KJjSszcq6zDTFXa9/3PCS-Set-Cute-Baby-Girl-Clothes-2018-Spring-Toddler-Kids-Tops-Flamingo-Print-Pants-Leggings-Headband.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ BEBEK</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://i.pinimg.com/736x/73/f8/55/73f855567314632535f578ae80f7b34b.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK BEBEK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">TULUM MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://cdn.shopify.com/s/files/1/0057/0962/7455/products/64671884_2246922958738631_534146386610880512_n.jpg?v=1561230736" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ BEBEK</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://i.pinimg.com/736x/8c/99/08/8c9908cb95ed0daa7cceaf459eaa5977.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK ÇOCUK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">ZIBIN MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0 mb-3">
                        <div className="product-detail__more-item">
                          <img src="https://ae01.alicdn.com/kf/HTB1.LykmdcnBKNjSZR0q6AFqFXan/2018-Cotton-Short-Sleeve-Newborn-Baby-Bodysuits-Bebes-Clothing-Bodysuit-Girl-Clothes.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ BEBEK</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://ae01.alicdn.com/kf/H6a988f06f8ac4be1a23ed939708cec31G/Funny-Baby-Newborn-Jumpsuit-Born-To-Rock-White-Cotton-Long-Sleeve-Baby-Bodysuit-Baby-Boys-Girls.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK BEBEK</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">ELBİSE MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-12 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://cuteoutfits.com/wp-content/uploads/2020/02/smiling-girl-with-teddy-bear-baby-girl-easter-outfits-ss-featured-750x420.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ BEBEK</h2>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">ŞORT MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-6 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://i.pinimg.com/736x/d5/b4/57/d5b45719e9b29f58ca6181d8592eaa34.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">KIZ BEBEK</h2>
                        </div>
                      </div>
                      <div className="col-md-6 p-0">
                        <div className="product-detail__more-item">
                          <img src="https://media.vertbaudet.com/Pictures/vertbaudet/179556/striped-t-shirt-shorts-outfit-for-baby-boys.jpg" alt="" />
                          <h2 className="product-detail__more-title gender">ERKEK BEBEK</h2>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>

      <div className="custom-container">
        <h2 className="big-title">EV & YAŞAM</h2>
        <Tabs className="tab">
          <TabList className="tab-list mb-4">
            <Tab className="tab-list__title">Ev Tekstili</Tab>
            <Tab className="tab-list__title">Aydınlatma</Tab>
            <Tab className="tab-list__title">Ev Dekorasyon</Tab>
            <Tab className="tab-list__title">Sofra & Mutfak</Tab>
            <Tab className="tab-list__title">Ev Aletleri</Tab>
          </TabList>

          <TabPanel className="tab-panel">
            <div className="product-detail__more pb-5">
              <div className="row">
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">HALI MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-12 pr-0 mb-3">
                        <div className="product-detail__more-item">
                          <img src="https://s3.amazonaws.com/rencollection.final/wp-content/uploads/2018/12/17123554/ren1.jpeg" alt="" />

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">NEVRESİM MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-12 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://m.media-amazon.com/images/I/71H6cKxawJL._AC_SL1000_.jpg" alt="" />
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="general">
                    <h2 className="product-detail__more-title">YASTIK MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-12 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://i.pinimg.com/736x/6f/4e/4f/6f4e4f07cec9497e0b6bd3a7dbace823.jpg" alt="" />
                       
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
  
                <div className="col-md-6">
                  <div className="general">
                    <h2 className="product-detail__more-title">KILIF MODELLERİ</h2>
                    <div className="row">
                      <div className="col-md-12 pr-0">
                        <div className="product-detail__more-item">
                          <img src="https://i.pinimg.com/736x/57/30/ef/5730ef82ee1dc0f9b96855ca99556c52.jpg" alt="" />
               
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          
              </div>
            </div>
          </TabPanel>
        
        </Tabs>
      </div>



      {/* <div className="product-list">
        {productList.map((product, index) => (
          <HomeProduct productList={product} key={index} />
        ))}
      </div> */}
    </>
  );
};

export default Home;
