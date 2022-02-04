import Image from 'next/image'
import received from '../../../assets/images/order.svg'
import close from '../../../assets/images/reply-message.svg'
import tick from '../../../assets/images/tick.svg'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const orderCancel = (props) => {
  return (
    <Modal open={props.open} onClose={props.onClose} showCloseIcon={props.showCloseIcon} classNames={{ modal: 'modal-steps medium' }} center>
      <div className="d-flex modal-top">
        <Image src={received} alt="Ürün hakkında soru sor" />
        <h3 className="modal-title ml-3">Sipariş İptali</h3>
      </div>
      <div className="modal-form">
        <h3 className="large-title">Siparişinizi gerçekten iptal etmek istiyor musunuz?</h3>
        <div className="alert-modal__action d-flex align-items-center flex-column">
          <div className="green-button d-flex align-items-center mt-3" onClick={() => props.onClickSuccess()}>
            <Image src={tick} alt="Ürün hakkında soru sor" />
            <p>Evet, siparişimi iptal edebiliriz.</p>
          </div>
          <div className="green-button danger d-flex align-items-center mt-3" onClick={() => props.onClickBack()}>
            <Image src={close} alt="Ürün hakkında soru sor" />
            <p>Hayır, iptal etmek istemiyorum.</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default orderCancel;
