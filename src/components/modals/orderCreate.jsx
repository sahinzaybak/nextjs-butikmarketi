import Image from 'next/image'
import ship from '../../assets/images/shipped.svg'
import received from '../../assets/images/order.svg'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const orderCreate = ({...props}) => {
  return (
    <Modal {...props} center>
      <div className="d-flex modal-wrp pb-1">
        <Image src={ship} alt="Ürün hakkında soru sor" />
        <h3 className="modal-title ml-3">Sipariş Oluştur</h3>
      </div>
      <div className="modal-form mt-4">
        <div className="d-flex justify-content-between">
          <div className="modal-item">
            <input type="text" placeholder="Adınız Soyadınız" />
          </div>
          <div className="modal-item">
            <input type="text" placeholder="Cep Tel Numaranız (Whatsapp)" />
          </div>
        </div>
        <div className="modal-item w-100 mt-3">
          <textarea placeholder="Ürünün gönderileceği adres" />
        </div>
        <div className="modal-item w-100 mt-3">
          <textarea placeholder="Açıklama (İstediğiniz beden, renk..vs)" />
        </div>
        <div className="green-button d-flex align-items-center mt-3 ml-auto" {...props} >
          <Image src={received} alt="Ürün hakkında soru sor" />
          <p>Ürünü sipariş et</p>
        </div>
      </div>
    </Modal>
  );
};

export default orderCreate;
