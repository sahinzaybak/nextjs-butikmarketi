import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import ship from '../../assets/images/shipped.svg'
import Link from "next/link";
import randomInteger from 'random-int';
import 'react-responsive-modal/styles.css';

//Modal Components
import OrderCreateModal from '../modals/orderCreate'
import ConfirmModal from '../modals/confirm'
import InfoModal from '../modals/info'
import OrderSuccessModal from '../modals/orderSuccess'

//Actions
import { fetchCreateOrder, fetchCreateOrderMember} from '../../store/actions/orders'

//Helpers
import { IsLoginIn } from '../../helpers/auth'

const DetailHeader = ({ butikId, buticLogo, buticName, butikSlug, productId, productTitle, price, productColors, productPrice, productSize }) => {
  let selecteFilterSizeTitle = useSelector((state) => state.products.productDetailSelectedSizeTitle); //Seçilen Beden Adı
  let selecteFilterColorTitle = useSelector((state) => state.products.productDetailSelectedColorTitle); //Seçilen Renk Adı

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [formValue, formValuesChild] = useState({}); //child için state.(formValuesChild)
  const [totalPrice, setTotalPrice] = useState(price);
  const [orderCount, setOrderCount] = useState(price);

  // setOpenAlert(true)
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const onOpenModalInfo = () => setOpenInfo(true);
  const onCloseModalInfo = () => setOpenInfo(false);
  const onCloseModalAlert = () => setOpenAlert(false);
  const onCloseModalSuccess = () => setOpenSuccess(false);

  let isLoginIn = IsLoginIn()
  let userInfo = useSelector(state => state.auth.authInfo)
  function orderProductSubmitConfirm() { //Evet, bilgilerim doğru, siparişimi oluşturabiliriz.
    {
      !isLoginIn ? //üyesiz sipariş
      dispatch(fetchCreateOrder({
        ...formValue.values,
        "size": selecteFilterSizeTitle,
        "color": selecteFilterColorTitle,
        "price": totalPrice,
        "count": orderCount,
        "butikId": butikId,
        "productId": productId,
        "userId": userInfo.id,
      }))
      :
      <>
        {userInfo.status ? //üye sipariş => üyelik onaylı ise
          dispatch(fetchCreateOrderMember({
            ...formValue.values,
            "namesurname": userInfo.namesurname,
            "phone": userInfo.phone,
            "address": userInfo.address,
            "namesurname": userInfo.nameSurname,
            "size": selecteFilterSizeTitle,
            "color": selecteFilterColorTitle,
            "price": totalPrice,
            "count": orderCount,
            "butikId": butikId,
            "productId": productId,
            "userId": userInfo.id,
          }))
          :
          <p>
            as
          </p>
        }
      </>

    }
  }

  function getTotalPrice(getTotalPriceValue) { //Child'dan veriyi aldık.
    setTotalPrice(getTotalPriceValue)
  }

  function getOrderCount(getOrderCountValue) { //Child'dan veriyi aldık.
    setOrderCount(getOrderCountValue)
  }

  return (
    <>
      <div className="detail-header d-flex align-items-center justify-content-between">
        <div className="custom-container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="detail-header__logo d-flex">
              <Link href={`/${butikSlug}`}>
                <img src={buticLogo} alt="" />
              </Link>
              <div className="d-block p-2">
                <div className="d-flex align-items-center">
                  <Link href={`/${butikSlug}`}>
                    <h5 className="detail-header__butic">{buticName}</h5>
                  </Link>
                  <span className="detail-header__point">9.8</span>
                </div>
                <h3 className="detail-header__title">{productTitle}</h3>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <p className="detail-header__price">{price} ₺</p>
              <div className="detail-header__action">
                <div className="position-relative">
                  <div className="green-button mx-0" onClick={onOpenModal}>
                    <div className="d-flex align-items-center justify-content-center">
                      <Image src={ship} alt="Ürün hakkında soru sor" />
                      <p className="button-text">Kapıda Ödeme İle Sipariş Oluştur</p>
                    </div>
                  </div>
                  <span className="detail-header__info" onClick={onOpenModalInfo}>Detaylı bilgi almak için tıklayın</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modallar */}
      <OrderCreateModal
        open={open}
        onClose={onCloseModal}
        formValuesChild={formValuesChild}
        productColors={productColors}
        productPrice={productPrice}
        totalPrice={getTotalPrice} //child'dan gelen veri. getTotalPrice(val)
        orderCount={getOrderCount} //child'dan gelen veri. getTotalPrice(val)
        productSize={productSize}
        onClickOpenConfirmModal={(isValidationAllForm) => { if (isValidationAllForm) setOpenAlert(true) }} //confirmModal'ı aç.
      />
      <InfoModal
        open={openInfo}
        onClose={onCloseModalInfo}
      />
      <ConfirmModal
        open={openAlert}
        onClose={onCloseModalAlert}
        showCloseIcon={false}
        classNames={{ modal: 'modal-steps' }}
        onClickSuccess={() => {
          setOpenSuccess(true)
          orderProductSubmitConfirm()
          setOpenAlert(false)
          setOpen(false)
        }}
        onClickBack={() => setOpenAlert(false)}
      />
      <OrderSuccessModal
        open={openSuccess}
        onClose={onCloseModalSuccess}
        classNames={{ modal: 'modal-steps' }} />
    </>
  );
};

export default DetailHeader;
