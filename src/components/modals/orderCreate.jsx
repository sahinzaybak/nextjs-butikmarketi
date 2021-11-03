import React, { useState } from "react";
import Image from 'next/image'
import ship from '../../assets/images/shipped.svg'
import received from '../../assets/images/order.svg'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

//Component
import DetailFilter from '../product-detail/detail-filter'

const orderCreateModal = (props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAdress] = useState('');
  const [desc, setDesc] = useState('');
  const isValidationAllForm = true

  function orderProduct() { //Ürünü sipariş et
    props.formValuesChild({ name, phone, address, desc, isValidationAllForm}) 
    //child'a veri göndermek => props.formValuesChild (detail-header/OrderCreateModal)
  }
  return (
    <Modal open={props.open} onClose={props.onClose} center>
      <div className="d-flex modal-top">
        <Image src={ship} alt="Ürün hakkında soru sor" />
        <h3 className="modal-title ml-3">Sipariş Oluştur</h3>
      </div>
      <div className="modal-form">
        <div className="d-flex justify-content-between">
          <div className="modal-item">
            <input type="text" placeholder="Adınız Soyadınız" onChange={e => setName(e.target.value)} />
          </div>
          <div className="modal-item">
            <input type="text" placeholder="Cep Tel Numaranız (Whatsapp)" onChange={e => setPhone(e.target.value)} />
          </div>
        </div>
        <div className="modal-item w-100 mt-3">
          <textarea placeholder="Ürünün gönderileceği adres" onChange={e => setAdress(e.target.value)} />
        </div>
        <div className="modal-item w-100 mt-3">
          <textarea placeholder="Açıklama (İstediğiniz beden, renk..vs)" onChange={e => setDesc(e.target.value)} />
        </div>

        <DetailFilter
          productSize={props.productSize}
          productColors={props.productColors}
          componentType="Modal"
        />
        <div className="green-button d-flex align-items-center mt-3 ml-auto" onClick={() => { props.onClick(), orderProduct() }} >
          <Image src={received} alt="Ürün hakkında soru sor" />
          <p>Ürünü sipariş et</p>
        </div>
      </div>
    </Modal>
  );
};

export default orderCreateModal;
  // https://medium.com/geekculture/using-react-hooks-to-get-input-value-9e0aa19b6b37 -> input value