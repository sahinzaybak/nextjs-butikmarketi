import { useSelector } from 'react-redux'
import Image from 'next/image'
import tick from '../../assets/images/tick.svg'
import Link from "next/link";
import addUser from '../../assets/images/add-user.svg'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

//Helpers
import { IsLoginIn } from '../../helpers/auth'

const confirm = ({ ...props }) => {
  let isLoginIn = IsLoginIn()
  return (
    <Modal {...props} center>
      <div className="d-flex modal-top">
        <Image src={tick} alt="Ürün hakkında soru sor" />
        <h3 className="modal-title ml-3">Siparişiniz onay bekliyor</h3>
      </div>
      <div className="modal-form">
        {!isLoginIn ?
          <>
            <div className="modal-form__top">
              <h3 className="large-title green mb-0">Siparişiniz onay bekliyor..</h3>
              <h3 className="large-title green"></h3>
              <h3 className="large-title green info mb-4 mt-3"><u>Üyeliksiz siparişlerde </u>oluşabilecek <u>sahte siparişlere karşı</u>, siparişinizi onaylamanız için <strong> 0539 506 69 51 </strong> numarasına whatsapp üzerinden <strong> <u> onay mesajı gönderdik. </u> </strong> </h3>
              <h4 className="medium-title green mt-3">Sipariş teslim süresince <u><strong>kargo takibi,</strong></u> <u><strong>ürünün teslim süresi,</strong></u>  <u><strong>ürün doğruluğu</strong> </u> vs gibi konularda sürecin takibinde olacağımızı belirtmek isteriz.</h4>
            </div>
            <div className="small-title mt-4">
              <span>Bundan sonraki siparişlerinizde,</span>
              <p className="small-title__disc">Daha kolay sipariş oluşturma</p>
              <p className="small-title__disc">Kargo takibi yapabilme</p>
              <p className="small-title__disc">Beğendiğiniz ürünleri favorilere ekleme</p>
              <p className="small-title__disc">Teslim aldığınız ürüne yorum yapabilme</p>
              <p className="small-title__disc">Verdiğiniz siparişlerinizi görüntüleme</p>
              <p>gibi ve daha fazla özelliği kullabilmek için, dilerseniz sitemize  <u> <strong>üye olabilirsiniz.</strong></u></p>
            </div>
            <div className="alert-modal__action d-flex align-items-center flex-column">
              <Link href="/kayit-ol">
                <div className="green-button info d-flex align-items-center mt-3">
                  <Image src={addUser} alt="Ürün hakkında soru sor" />
                  <p>Üye olmak istiyorum.</p>
                </div>
              </Link>
            </div>
          </>
          :
          <h3 className="large-title green mb-0">Tebrikler siparişiniz oluşturuldu.</h3>
        }

      </div>
    </Modal>
  );
};

export default confirm;
