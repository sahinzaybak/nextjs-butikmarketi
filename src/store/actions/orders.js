import axios from "axios";
import cargoInfo from '../../api/cargo.json'


let currentDay = function (sp) {
  let today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return yyyy + sp + mm + sp + dd;
};
export const fetchCreateOrder = (getOrdersValue) => (dispatch) => { //Sipariş oluştur.
  axios.post("http://localhost:1337/api/order-inactives", { //Sipariş oluştur
      data: {
        butikId: getOrdersValue.butikId,
        products: getOrdersValue.productId,
        nameSurname: getOrdersValue.username,
        phone: getOrdersValue.phone,
        address: getOrdersValue.address,
        description: getOrdersValue.desc,
        size: getOrdersValue.size,
        color: getOrdersValue.color,
        count: getOrdersValue.count,
        cargoNo:"",
        isOrderCancel:false,
        status: false, //üyeliksiz siparişlerde onay olmadan status false.
        totalPrice: getOrdersValue.price,
        orderDate: currentDay("-"),
      },
    }).then((value) => {
      axios.post("http://localhost:8080/sendMsg", {
        //Whatsapp mesaj gönder
        name: getOrdersValue.username,
        phone: parseInt(9 + getOrdersValue.phone),
        order_id: " ",
        user_id: value.data.data.id,
      });
    });
};

export const fetchCreateOrderMember = (getOrdersValue) => (dispatch) => { //Sipariş oluştur.
  debugger;
  const config = {headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}`}};
  axios.post("http://localhost:1337/api/orders", { //Sipariş oluştur
      data: {
        butikId: getOrdersValue.butikId,
        products: getOrdersValue.productId,
        nameSurname: getOrdersValue.namesurname,
        phone: getOrdersValue.phone,
        address: getOrdersValue.address,
        description: getOrdersValue.desc,
        size: getOrdersValue.size,
        color: getOrdersValue.color,
        count: getOrdersValue.count,
        cargoNo:"",
        isOrderCancel:false,
        status: false, //üyeliksiz siparişlerde onay olmadan status false.
        totalPrice: getOrdersValue.price,
        orderDate: currentDay("-"),
        userId: getOrdersValue.userId,
      },
    },config)
};

export const fetchOrderConfirm = (orderNumber) => async (dispatch) => { //Siparişi onayla
  const orderInfo = await axios.get(`http://localhost:1337/api/orders?filters[orderNo]=${orderNumber}`); //Önce siparişi bul.
  axios.put(`http://localhost:1337/api/orders/${orderInfo.data.data[0].id}`, { //Sipariş ID'ye göre status'u güncelle.
    data: {
      status: true,
    },
  });
};

export const fetchOrderDetailInfo = (orderNumber,securityCode) => (dispatch) => { //Sipariş bilgilerini getir.
  axios.get(`http://localhost:1337/api/order-inactives/${orderNumber}/${securityCode}?populate=products,products.butiks`)
  .then((response) => {
      dispatch({
        type: "ORDER_DETAIL_INFO",
        payload: response.data.data
      });
    });
};

export const fetchOrderCancel = (orderId) => (dispatch) =>{ //Siparişi iptal et
  axios.put(`http://localhost:1337/api/order-inactives/${orderId}`, {
    data: {
      isOrderCancel: true,
    },
  });
};

export const fetchCargoInfo = () => (dispatch) => { //Kargo Takibi
  dispatch({
    type: "CARGO_INFO",
    payload: cargoInfo.value,
  });
};


export const fetchProductComments = (productId,defaultComments,comment,rating, imageList) => (dispatch) =>{ //Ürüne yorum yap
  debugger;
  axios.put(`http://localhost:1337/api/products/${productId}`, {
    data: {
      comments:[
        ...defaultComments,
        {
        comment_name:"maho",
        star: rating,
        comment:comment,
        commentImages:[
          {
            image:imageList[0].image_slider
          }
        ]}]
    },
  });
};