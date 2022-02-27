import { useState, useEffect } from 'react';
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import received from '../../assets/images/order.svg'
import close from '../../assets/images/reply-message.svg'
import tick from '../../assets/images/tick.svg'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

//Actions
import { fetchCreateOrder, fetchCreateOrderMember } from '../../store/actions/orders'
import { confirmForSendWhatsappMessage, userMemberConfirm, userInfoUpdate } from '../../store/actions/users'

//Helpers
import { IsLoginIn } from '../../helpers/auth'

const confirmModal = (props) => {
  const [openMemberConfirmModal, setOpenMemberConfirmModal] = useState();
  const [confirmInputValue, setConfirmInputValue] = useState("");
  const [orderLoading, setIsOrderLoading] = useState(false);
  const dispatch = useDispatch();

  let isLoginIn = IsLoginIn()
  let userInfo = useSelector(state => state.auth.authInfo)
  let selecteFilterSizeTitle = useSelector((state) => state.products.productDetailSelectedSizeTitle); //Seçilen Beden Adı
  let selecteFilterColorTitle = useSelector((state) => state.products.productDetailSelectedColorTitle); //Seçilen Renk Adı

  //Üye Onay Modal mı açılsın yoksa Sipariş Onay Modalı mı? (true, false) => props.isConfirmModal değeri orderCreate componentinden geliyor.
  useEffect(() => {
    setOpenMemberConfirmModal(props.isConfirmModal)
  }, [props.isConfirmModal]);

  //Evet, bilgilerim doğru, siparişimi oluşturabiliriz.
  function orderProductSubmitConfirm() {
    setIsOrderLoading(true)
    setTimeout(() => {
      props.onClickSuccess() //bu modalı kapat. //orderCreate Modala yani parent'a child props gönderdik.
      props.closeCreateModal(false) //orderCreate Modala yani parent'a child props gönderdik. Amaç: Siparişi onaylaya basıldığında createModal kapat ve Success Modal aç.
    }, 5000);
    setTimeout(() => {
      setIsOrderLoading(false)
    }, 5001);

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
              "size": selecteFilterSizeTitle,
              "color": selecteFilterColorTitle,
              "price": props.totalPrice,
              "count": props.orderCount,
              "butikId": props.butikId,
              "productId": props.productId,
              "userId": userInfo.id,
            }))
            :
            <p>as</p>
          }
        </>
    }
  }

  //Üye onaylı değilse üyeliği onayla ve ardından siparişi oluştur.
  async function confirmUser() {
    if (!userInfo.status) { //Status false ise 
      dispatch(userMemberConfirm(confirmInputValue, userInfo.id, props.formValue.values.username, props.formValue.values.phone, props.formValue.values.address)); //üyelik onayla
      dispatch(fetchCreateOrderMember({ //sipariş oluştur.
        ...props.formValue.values,
        "namesurname": props.formValue.values.username,
        "phone": props.formValue.values.phone,
        "address": props.formValue.values.address,
        "size": selecteFilterSizeTitle,
        "color": selecteFilterColorTitle,
        "price": props.totalPrice,
        "count": props.orderCount,
        "butikId": props.butikId,
        "productId": props.productId,
        "userId": userInfo.id,
      }))
      props.closeCreateModal(false) //Create Modal kapat.
      setOpenMemberConfirmModal(false) // Onay formu kapat.
    }
  }

  return (
    <Modal open={props.open} onClose={props.onClose} showCloseIcon={props.showCloseIcon} classNames={{ modal: 'modal-steps medium' }} center>
      {orderLoading &&
        <div className="order-loading">
          <div className="order-loading__wrp">
            <p>Siparişiniz oluşturuluyor..</p>
          </div>
        </div>
      }

      {!openMemberConfirmModal ? //üye onaylı ise.. Sipariş Onay Modal
        <>
          <div className={`${orderLoading ? "d-none" : ""}`}>
            <div className="d-flex modal-top">
              <Image src={received} alt="Ürün hakkında soru sor" />
              <h3 className="modal-title ml-3">Form onayı</h3>
            </div>
            <div className="modal-form">
              <h3 className="large-title">Tüm bilgileriniz doğru ise, siparişinizi oluşturmak <br /> istiyor musunuz?</h3>
              <div className="alert-modal__action d-flex align-items-center flex-column">
                <div className="green-button d-flex align-items-center mt-3" onClick={() => { orderProductSubmitConfirm() }}>
                  <Image src={tick} alt="Ürün hakkında soru sor" />
                  <p>Evet, bilgilerim doğru, siparişimi oluşturabiliriz.</p>
                </div>

                <div className="green-button danger d-flex align-items-center mt-3" onClick={() => props.onClickBack()}>
                  <Image src={close} alt="Ürün hakkında soru sor" />
                  <p>Hayır, bilgilerimi tekrar kontrol etmek istiyorum.</p>
                </div>
              </div>
            </div>
          </div>
        </>
        : //üye onaylı değilse.. Üye Onay Modal
        <div className="modal-form member-confirm">
          <h3 className="member-confirm__title">Sahte üyeliklere karşı önlem almak amacıyla sizden <br /> <strong>bir kereye mahsus </strong> üye onay kodu almamız gerekiyor.</h3>
          <p className="member-confirm__title">Onay kodunuzu doğruladıktan sonra siparişiniz oluşturulacaktır.</p>
          <p className="member-confirm__text">0539 506 69 51 numaralı telefonunuza whatsapp üzerinden onay kodu gönderidik.
            <br /> <br /> Gönderilen 5 haneli onay kodunu giriniz.</p>
          <div className="alert-modal__action d-flex align-items-center flex-column">
            <div className="user-info__confirm w-100">
              <input className="mt-1" type="text" placeholder="Onay kodu" autoFocus onChange={e => setConfirmInputValue(e.target.value)} />
              <div class="green-button mx-0 w-100 mt-3">
                <div class="d-flex align-items-center justify-content-center h-100" onClick={confirmUser}>
                  <button type="submit" class="ant-btn ant-btn-primary button-text ml-0 text-white">
                    <span>Üyeliğimi Onayla</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </Modal>
  );
};

export default confirmModal;
