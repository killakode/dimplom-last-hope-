let selectedSeanse = JSON.parse(localStorage.selectedSeanse);


function generateTicket() {


    let price = 0;
    let selectedPlaces = " ";
    let date = new Date(+`${selectedSeanse.seanceTimeStamp * 1000}`);

    let fulldate = date.toLocaleString("ru-RU", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });;

    selectedSeanse.salesPlaces.forEach((element) => {
        if (selectedPlaces != "") {
            selectedPlaces += ", ";
        }
        selectedPlaces += `${element.row}/${element.place}`;
        price +=
            element.type == "standart" ?
            Number(selectedSeanse.priceStandart) :
            Number(selectedSeanse.priceVip);
    });

    document.querySelector(".ticket__title").innerHTML = selectedSeanse.filmName;
    document.querySelector(".ticket__chairs").innerHTML = selectedPlaces;
    document.querySelector(".ticket__hall").innerHTML = selectedSeanse.hallName;
    document.querySelector(".ticket__start").innerHTML = selectedSeanse.seanceTime;




    let textQR = `Фильм: ${selectedSeanse.filmName} Зал: ${
    selectedSeanse.hallName
  } Ряд/Место ${selectedPlaces} Дата: ${date} Начало сеанса: ${
    selectedSeanse.seanceTime
  } Билет действителен строго на свой сеанс`;

    let qrcode = QRCreator(textQR, {
        image: "SVG"
    });
    document.querySelector(".ticket__info-qr").append(qrcode.result);

}

document.addEventListener("DOMContentLoaded", generateTicket);