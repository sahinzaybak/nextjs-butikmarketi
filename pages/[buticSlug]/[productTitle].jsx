//*** Ürün Detay Sayfası

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import SliderSlick from "react-slick";

//Components
import DetailHeader from '../../src/components/product-detail/detail-header'
import ProductGallerySlider from '../../src/components/product-detail/product-gallery-slider'
import ProductGalleryThumb from '../../src/components/product-detail/product-gallery-thumb'
import ProductInfoTop from '../../src/components/product-detail/product-info-top'
import ProductInfoBottom from '../../src/components/product-detail/product-info-bottom'
import ProductComments from '../../src/components/product-detail/product-comments'
import ProductDetailContentLoader from '../../src/components/content-loader/product-detail-loader'
import ProductCard from "../../src/components/product-card";
import { pageIncreaseCount } from '../../src/helpers/pageIncreaseCounts'

//Action
import { fetchProductDetail, fetchSelectedFavoritesProductIds } from '../../src/store/actions/products'

//Helpers
import { IsLoginIn } from '../../src/helpers/auth'

//Modal Components
import OrderCreateModal from '../../src/components/modals/orderCreate'
import OrderSuccessModal from '../../src/components/modals/orderSuccess'
import InfoModal from '../../src/components/modals/info'

const ProductDetail = () => {
  const router = useRouter();
  const productTitle = router.query.productTitle;
  const dispatch = useDispatch();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [load, setLoad] = useState(false);

  //** Modallar için >
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const onCloseModal = () => setOpen(false);
  const onCloseModalSuccess = () => setOpenSuccess(false);
  const onCloseModalInfo = () => setOpenInfo(false);

  function closeCreateModal(childPropsValue) { //Child'dan veriyi aldık. (false) => Confirm Modal'dan gelen props ile Create Modal'ı kapat. 
    setOpen(childPropsValue)
  }

  function openSuccesModal(childPropsValue) { //Child'dan veriyi aldık. (true) => Confirm Modal'dan gelen props ile Success Modal'ı aç.
    setOpenSuccess(childPropsValue)
  }
  //** Modallar için />

  const settings = {
    lazyLoad: 'ondemand',
    infinite: true,
    arrows: true,
    autoplay: true,
    speed: 500,
    touchThreshold: 100,
    slidesToShow: 5,
    slidesToScroll: 2,
  };

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  let productDetail = useSelector((state) => state.products.detailProductInfo); //Dolan "ürün bilgisini" al.
  // let similarProduct = useSelector((state) => state.products.categoryProductList); //Dolan "benzer ürün bilgisini" al.

  //productDetail 2 kere servise gitmesi problem çözümü.
  useEffect(() => {
    setLoad(true)
  }, []);

  //Girilen ürüne ait ürün detay bilgisi" doldurmak için action'a dispatch et. -> yesiltshirt
  useEffect(() => {
    dispatch({ type: 'PRODUCT_DETAIL_CLEAR', payload: [] })
    dispatch(fetchProductDetail(productTitle)); //Ürün detay bilgileri
    if (IsLoginIn())
      dispatch(fetchSelectedFavoritesProductIds());
  }, [productTitle]);


  //Sayfa yüklendiğinde filtreleme seçeneklerinin ilki seçili gelsin.
  useEffect(() => {
    if (productDetail != "") {
      dispatch({ type: 'SELECTED_FILTER_SIZE', payload: { index: 0, selectedTitle: productDetail?.attributes?.sizes[0]?.size_title } })
      dispatch({ type: 'SELECTED_FILTER_COLOR', payload: { index: 0, selectedTitle: productDetail?.attributes?.colors[0]?.color_title } })

      setTimeout(() => {
        if (load && productDetail) pageIncreaseCount(productDetail.id, productDetail.attributes.clicks, "products", "clicks"); //Görüntülenme sayısı arttırma (Helpers)
      }, 5000);
    }
  }, [productDetail]);

  return (
    <>
      {productDetail == "" ? <ProductDetailContentLoader /> :
        <div className="product-detail">
          {productDetail && productDetail?.attributes?.comments && productDetail?.attributes?.butiks.data[0] &&
            <>
              <DetailHeader
                buticLogo={productDetail.attributes.butiks.data[0].attributes.butik_image}
                butikSlug={productDetail.attributes.butiks.data[0].attributes.butik_slug}
                buticName={productDetail.attributes.butiks.data[0].attributes.butik_name}
                productTitle={productDetail.attributes.title}
                price={productDetail.attributes.price}
                onOpenModal={() => { setOpen(true) }}
                onOpenModalInfo={() => { setOpenInfo(true) }}
              />
              <div className="custom-container">
                <div className="product-detail__main">
                  <div className="row">
                    <div className="col-md-6">
                      <ProductGallerySlider
                        images={productDetail.attributes.images}
                        nav={nav2}
                        ref={slider => (setSlider1(slider))} />
                    </div>
                    <div className="col-md-6">
                      <div className="product-info">
                        <ProductInfoTop
                          productTitle={productDetail.attributes.title}
                          comments={productDetail.attributes.comments}
                          commentsCount={productDetail.attributes.comments.length}
                          productDescription={productDetail.attributes.description} />
                        <ProductGalleryThumb
                          images={productDetail.attributes.images}
                          nav={nav1}
                          ref={slider => (setSlider2(slider))} />
                        <ProductInfoBottom
                          productColors={productDetail.attributes.colors}
                          productSize={productDetail.attributes.sizes}
                          productLink={productDetail.attributes.link}
                          productId={productDetail.id}
                          productWhatsappClicksValues={productDetail.attributes.whatsappClicks}
                          isLoginIn={IsLoginIn()}
                          onOpenModal={() => { setOpen(true) }}
                          onOpenModalInfo={() => { setOpenInfo(true) }}
                        />
                      </div>
                    </div>
                  </div>
                  <ProductComments comments={productDetail.attributes.comments} />
                </div>
                {/* <div className="product-detail__similar pt-4 mt-4">
              <h3 className="text-center">İlginizi çekebilecek diğer ürünler</h3>
              <div className="mt-4">
                <SliderSlick {...settings}>
                  {similarProduct.products && similarProduct.products.map((product, index) =>
                    <ProductCard product={product} slide key={index} />
                  )}
                </SliderSlick>
              </div>
            </div> */}

              </div>
              <div className="product-detail__more pb-5">
                <div className="row">
                  <div className="col-md-3">
                    <div className="product-detail__more-item">
                      <img src="https://footwearnews.com/wp-content/uploads/2019/05/met-gala-2019-converse.jpg" alt="" />
                      <h2 className="product-detail__more-title">Daha fazla AYAKAKABI</h2>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="product-detail__more-item">
                      <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/white-tee-1623337322.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*" alt="" />
                      <h2 className="product-detail__more-title">Daha fazla T-SHIRT</h2>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="product-detail__more-item">
                      <img src="https://glorytrends.com/wp-content/uploads/2020/04/womens-handbags-2021.jpg" alt="" />
                      <h2 className="product-detail__more-title">Daha fazla ÇANTA</h2>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="product-detail__more-item">
                      <img src="https://ktnimg.mncdn.com/mnresize/406/534/product-images/1KAK68167PW001/1500Wx1969H/1KAK68167PW001_G01_zoom1_V02.jpg" alt="" />
                      <h2 className="product-detail__more-title">Daha fazla BLUZ</h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sipariş Ver, Sipariş Tamamlandı, ve Info Modal */}

              <>
                <OrderCreateModal
                  open={open}
                  onClose={onCloseModal}
                  productColors={productDetail.attributes.colors}
                  productPrice={productDetail.attributes.price}
                  productId={productDetail.id}
                  butikId={productDetail.attributes.butiks.data[0].id}
                  productSize={productDetail.attributes.sizes}
                  closeCreateModal={closeCreateModal} //Child Props => Yukarıda props değerini aldık. (false)
                  openSuccesModal={openSuccesModal} //Child Props => Yukarıda props değerini aldık. (true)
                />

                <InfoModal
                  open={openInfo}
                  onClose={onCloseModalInfo} />

                <OrderSuccessModal
                  open={openSuccess}
                  onClose={onCloseModalSuccess}
                  classNames={{ modal: 'modal-steps' }} />
              </>

            </>
          }
        </div>
      }
    </>
  );
};

export default ProductDetail;
