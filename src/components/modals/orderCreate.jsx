import { useState } from "react";
import { useSelector } from 'react-redux'
import { Form, Input, Button } from 'antd';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import 'antd/lib/form/style/index.css'
import Image from 'next/image'
import ship from '../../assets/images/shipped.svg'
import received from '../../assets/images/order.svg'
import { FiPlus, FiMinus } from "react-icons/fi";

//Components
import ConfirmModal from '../modals/confirm'
import DetailFilter from '../product-detail/detail-filter'

const orderCreateModal = (props) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [formValue, formValuesChild] = useState({}); //child için state.(formValuesChild)
  const [orderCount, setOrderCount] = useState(1);
  const [price, setPrice] = useState(props.productPrice);
  const onCloseModalAlert = () => setOpenAlert(false);

  let userInfo = useSelector(state => state.auth.authInfo)

  //Confirm Modal'dan gelen props değerleri => Siparişi onaylaya basıldığında createModal kapat ve Success Modal aç. (Child props) 
  function closeCreateModal(getChildPropsValue) {
    props.closeCreateModal(getChildPropsValue)
    props.openSuccesModal(true)
  }

  //Form Tamam ise,
  function onFinish(values) {
    formValuesChild({ values })
    setOpenAlert(true) //Confirm Modal aç
  };

  //Toplam ürün adedi ve toplam fiyat
  function sendParentTotalPrice(productCount) {
    let totalPrice = productCount * props.productPrice
    setPrice(totalPrice)
  }

  return (
    <>
      <Modal open={props.open} onClose={props.onClose} center>
        <div className="d-flex modal-top">
          <Image src={ship} alt="Ürün hakkında soru sor" />
          <h3 className="modal-title ml-3">Sipariş Oluştur</h3>
        </div>
        <Form onFinish={onFinish} autoComplete="on">
          <div className="modal-form">
            {!userInfo.status &&
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
            }
            {!userInfo.status ?
              <div className="modal-item w-100 mt-3">
                <Form.Item name="address" rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input.TextArea placeholder="Ürünün gönderileceği adres" className="textarea" />
                </Form.Item>
              </div>
              :
              <div className="modal-form__address">
                <p>{userInfo.address}</p>
              </div>
            }
            <div className="modal-item w-100 mt-3">
              <Form.Item name="desc" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.TextArea placeholder="Açıklama" className="textarea" />
              </Form.Item>
            </div>

            <div className="modal-item__bottom">
              <DetailFilter
                productSize={props.productSize}
                productColors={props.productColors}
                componentType="Modal"
              />
              <div className="d-flex align-items-center justify-content-between mt-4">
                <div className="product-count">
                  <div className="d-flex align-items-center">
                    <p className="product-count__item" onClick={async () => {
                      if (orderCount != 1) {
                        setOrderCount(orderCount - 1);
                        sendParentTotalPrice((orderCount - 1))
                      }
                    }
                    }><FiMinus />
                    </p>
                    <span>{orderCount}</span>
                    <p className="product-count__item" onClick={() => {
                      if (orderCount != 6) {
                        setOrderCount(orderCount + 1);
                        sendParentTotalPrice((orderCount + 1))
                      }
                    }
                    }><FiPlus />
                    </p>
                  </div>
                </div>
                <h4>{price} ₺</h4>
                <Button type="primary" htmlType="submit">
                  <div className="green-button d-flex align-items-center ml-auto" >
                    <Image src={received} alt="Ürün hakkında soru sor" />
                    <p>Ürünü sipariş et</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Modal>

      {/* ConfirmModal */}
      <ConfirmModal
        open={openAlert}
        onClose={onCloseModalAlert}
        showCloseIcon={false}
        classNames={{ modal: 'modal-steps' }}
        formValue={formValue}
        butikId={props.butikId}
        productId={props.productId}
        totalPrice={price}
        orderCount={orderCount}
        closeCreateModal={closeCreateModal} //Child props. Yukarıda props değerini aldık.
        onClickSuccess={() => {
          setOpenAlert(false)
        }}
        onClickBack={() => setOpenAlert(false)} />
    </>

  );
};

export default orderCreateModal;
  // https://medium.com/geekculture/using-react-hooks-to-get-input-value-9e0aa19b6b37 -> input hooks value