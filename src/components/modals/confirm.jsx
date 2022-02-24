import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import received from '../../assets/images/order.svg'
import close from '../../assets/images/reply-message.svg'
import tick from '../../assets/images/tick.svg'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

//Actions
import { fetchCreateOrder, fetchCreateOrderMember} from '../../store/actions/orders'

//Helpers
import { IsLoginIn } from '../../helpers/auth'

const confirmModal = (props) => {
  const dispatch = useDispatch();
  let isLoginIn = IsLoginIn()
  let userInfo = useSelector(state => state.auth.authInfo)
  let selecteFilterSizeTitle = useSelector((state) => state.products.productDetailSelectedSizeTitle); //Seçilen Beden Adı
  let selecteFilterColorTitle = useSelector((state) => state.products.productDetailSelectedColorTitle); //Seçilen Renk Adı

  //Evet, bilgilerim doğru, siparişimi oluşturabiliriz.
  function orderProductSubmitConfirm() {
    props.closeCreateModal(false) //orderCreate Modala yani parent'a child props gönderdik. Amaç: Siparişi onaylaya basıldığında createModal kapat ve Success Modal aç.
    {
      !isLoginIn ? //üyesiz sipariş
      dispatch(fetchCreateOrder({
        ...props.formValue.values,
        "size": selecteFilterSizeTitle,
        "color": selecteFilterColorTitle,
        "price": props.totalPrice,
        "count": props.orderCount,
        "butikId": props.butikId,
        "productId": props.productId,
        "userId": userInfo.id,
      }))
      :
      <>
        {userInfo.status ? //üye sipariş => üyelik onaylı ise
          dispatch(fetchCreateOrderMember({
            ...props.formValue.values,
            "namesurname": userInfo.namesurname,
            "phone": userInfo.phone,
            "address": userInfo.address,
            "namesurname": userInfo.nameSurname,
            "size": selecteFilterSizeTitle,
            "color": selecteFilterColorTitle,
            "price": props.totalPrice,
            "count": props.orderCount,
            "butikId": props.butikId,
            "productId": props.productId,
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

  return (
    <Modal open={props.open} onClose={props.onClose} showCloseIcon={props.showCloseIcon} classNames={{ modal: 'modal-steps medium' }} center>
      <div className="d-flex modal-top">
        <Image src={received} alt="Ürün hakkında soru sor" />
        <h3 className="modal-title ml-3">Form onayı</h3>
      </div>
      <div className="modal-form">
        <h3 className="large-title">Tüm bilgileriniz doğru ise, siparişinizi oluşturmak <br /> istiyor musunuz?</h3>
        <div className="alert-modal__action d-flex align-items-center flex-column">
          <div className="green-button d-flex align-items-center mt-3" onClick={() => {orderProductSubmitConfirm(); props.onClickSuccess()}}>
            <Image src={tick} alt="Ürün hakkında soru sor" />
            <p>Evet, bilgilerim doğru, siparişimi oluşturabiliriz.</p>
          </div>
          <div className="green-button danger d-flex align-items-center mt-3" onClick={() => props.onClickBack()}>
            <Image src={close} alt="Ürün hakkında soru sor" />
            <p>Hayır, bilgilerimi tekrar kontrol etmek istiyorum.</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default confirmModal;
