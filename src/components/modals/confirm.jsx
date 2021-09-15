import Image from 'next/image'
import received from '../../assets/images/order.svg'
import close from '../../assets/images/reply-message.svg'
import tick from '../../assets/images/tick.svg'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const confirm = (props) => {
  return (
    <Modal open={props.open} onClose={props.onClose} showCloseIcon={props.showCloseIcon} classNames={{ modal: 'alert-modal' }} center>
      <div className="d-flex modal-wrp pb-1">
        <Image src={received} alt="Ürün hakkında soru sor" />
        <h3 className="modal-title ml-3">Sipariş onayı</h3>
      </div>
      <div className="modal-form mt-4">
        <h3 className="large-title">Tüm bilgileriniz doğru ise, siparişinizi oluşturmak <br /> istiyor musunuz?</h3>
        <div className="alert-modal__action d-flex align-items-center flex-column">
          <div className="green-button d-flex align-items-center mt-3" onClick={() => props.onClickSuccess()}>
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

export default confirm;
