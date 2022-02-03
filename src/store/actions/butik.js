import axios from "axios";
// const BASE_URL = process.env.REACT_APP_API_URL

export const fetchButikLogo = () => (dispatch) => { //Butik Logoları - Anasayfa carousel için
  axios.get("http://localhost:1337/api/butiks").then((response) => {
    dispatch({
      type: "BUTIK_LOGOS",
      payload: response.data.data,
    });
  });
};

export const fetchButikProfileInfo = (butikSlug) => (dispatch) => { //Butik Profil Sayfası Bilgileri
  axios.get(`http://localhost:1337/api/butiks?filters[butik_slug]=${butikSlug}&populate=products.butiks,clicks,products.whatsappClicks`).then((response) => {
      dispatch({
        type: "BUTIK_PROFILE",
        payload: response.data.data[0], //id, attributes
      });
    });
};

export const fetchButikProfileIncreaseCount = (butikId, butikDefaultClicks) => () => { // Butik Profil Sayfası Görünt. sayısı arttırma.
  let currentDay = function (sp) {
    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return yyyy + sp + mm + sp + dd;
  };

  let isTodayValue = butikDefaultClicks.some((x) => x.date == currentDay("-")); // Daha önce bugünün tarihinde click verisi var mı?
  if(isTodayValue){  // VAR ise, bugün tarihli clickCount değerini 1 arttır ve objeyi GÜNCELLE.
    const todayValueIndexNo = butikDefaultClicks.findIndex((x) => x.date == currentDay("-"));
    const todayValue = butikDefaultClicks.find((x) => x.date == currentDay("-"));
    todayValue.clickCount++;
    butikDefaultClicks[todayValueIndexNo] = todayValue; // butikClicks array içinde bugüne ait indexNo ile cC +1 olmuş objeyi güncelle.
    axios.put(`http://localhost:1337/api/butiks/${butikId}`, {
      data: {
        clicks: [
         ...butikDefaultClicks,
        ],
      },
    });
  }
  else{ // YOK ise, bugünün tarihi ile yeni bir object OLUŞTUR.
    axios.put(`http://localhost:1337/api/butiks/${butikId}`, {
      data: {
        clicks: [
         ...butikDefaultClicks,
         {
          clickCount: 1,
          date: currentDay("-"),
        }
        ],
      },
    });
  }
};
