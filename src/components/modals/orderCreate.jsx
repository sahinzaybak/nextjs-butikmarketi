import React from "react";
import { Form, Input, Button } from 'antd';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import 'antd/lib/form/style/index.css'
import Image from 'next/image'
import ship from '../../assets/images/shipped.svg'
import received from '../../assets/images/order.svg'

//Component
import DetailFilter from '../product-detail/detail-filter'

const orderCreateModal = (props) => {
  let isValidationAllForm = false;
  
  function onFinish(values) {
    isValidationAllForm = true //Tüm inputlar okeyse true yap
    props.formValuesChild({ values }) //Child'a veri göndermek (detail-header/OrderCreateModal)
    props.onClickOpenConfirmModal(isValidationAllForm) //Child'a true gönderdik ki tüm inputlar okeyse confirm modal'ı açsın.
  };

  return (
    <Modal open={props.open} onClose={props.onClose} center>
      <div className="d-flex modal-top">
        <Image src={ship} alt="Ürün hakkında soru sor" />
        <h3 className="modal-title ml-3">Sipariş Oluştur</h3>
      </div>
      <Form onFinish={onFinish} autoComplete="off">
        <div className="modal-form">
          <div className="d-flex justify-content-between">
            <div className="modal-item">
              <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input placeholder="Adınız Soyadınız" />
              </Form.Item>
            </div>
            <div className="modal-item">
              <Form.Item name="phone" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input placeholder="Cep Tel Numaranız (Whatsapp)" />
              </Form.Item>
            </div>
          </div>
          <div className="modal-item w-100 mt-3">
            <Form.Item name="address" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.TextArea placeholder="Ürünün gönderileceği adres" className="textarea" />
            </Form.Item>
          </div>
          <div className="modal-item w-100 mt-3">
            <Form.Item name="desc" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.TextArea placeholder="Açıklama" className="textarea" />
            </Form.Item>
          </div>
          <DetailFilter
            productSize={props.productSize}
            productColors={props.productColors}
            componentType="Modal"
          />
          <Button type="primary" htmlType="submit" className="w-100">
            <div className="green-button d-flex align-items-center mt-3 ml-auto" >
              <Image src={received} alt="Ürün hakkında soru sor" />
              <p>Ürünü sipariş et</p>
            </div>
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default orderCreateModal;
  // https://medium.com/geekculture/using-react-hooks-to-get-input-value-9e0aa19b6b37 -> input hooks value