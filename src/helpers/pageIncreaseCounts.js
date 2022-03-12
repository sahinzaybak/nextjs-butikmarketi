import axios from "axios";
export const pageIncreaseCount = (increasePageItemId, defaultClicks, increasePage, servicesAttr) => { 
	// increasePageItemId = butikId,productId..vs
	// increasePage = product,butiks,whatsapp.vs
	// servicesAttr = clicks, whatsappClicks, instagramClicks..vs
	var currentDay = function (sp) {
	  let today = new Date();
	  var dd = today.getDate();
	  var mm = today.getMonth() + 1;
	  var yyyy = today.getFullYear();
  
	  if (dd < 10) dd = "0" + dd;
	  if (mm < 10) mm = "0" + mm;
	  return yyyy + sp + mm + sp + dd;
	};
  
	let isTodayValue = defaultClicks.some((x) => x.date == currentDay("-")); // Daha önce bugünün tarihinde click verisi var mı?
	if(isTodayValue){  // VAR ise, bugün tarihli clickCount değerini 1 arttır ve objeyi GÜNCELLE.
	  const todayValueIndexNo = defaultClicks.findIndex((x) => x.date == currentDay("-"));
	  const todayValue = defaultClicks.find((x) => x.date == currentDay("-"));
	  todayValue.clickCount++;
	  defaultClicks[todayValueIndexNo] = todayValue; // butikClicks array içinde bugüne ait indexNo ile +1 olmuş objeyi güncelle.
	  axios.put(`http://localhost:1337/api/${increasePage}/${increasePageItemId}`, {
		data: {
		  [servicesAttr]: [
		   ...defaultClicks,
		  ],
		},
	  });
	}
	else{ // YOK ise, bugünün tarihi ile yeni bir object OLUŞTUR.
	  axios.put(`http://localhost:1337/api/${increasePage}/${increasePageItemId}`, {
		data: {
		  [servicesAttr]: [
		   ...defaultClicks,
		   {
			clickCount: 1,
			date: currentDay("-"),
		  }
		  ],
		},
	  });
	}
  };