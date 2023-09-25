let selectedSeanse = JSON.parse(localStorage.selectedSeanse);

document.addEventListener("DOMContentLoaded", () => {
    let acceptButton = document.querySelector('.acceptin-button');
    let infoTitle = document.querySelector('.buying__info-title');
    let filmStart = document.querySelector('.buying__info-start');
    let hallInfo = document.querySelector('.buying__info-hall');
    let priceStandart = document.querySelector('.price-standart');
    let confStepWrapper = document.querySelector('.conf-step__wrapper');


    Request('POST', 'https://jscp-diplom.netoserver.ru/', `event=get_hallConfig&timestamp=${selectedSeanse.seanceTimeStamp}&hallId=${selectedSeanse.hallId}&seanceId=${selectedSeanse.seanceId}`, function(response) {
        if (response) {
            selectedSeanse.hallConfig = response;
        }
        confStepWrapper.innerHTML = selectedSeanse.hallConfig;
        let chairs = [...document.querySelectorAll('.conf-step__row .conf-step__chair')];
        let chairsSelected = [...document.querySelectorAll('.conf-step__row .conf-step__chair_selected')];

        chairs.forEach((chair) => {
            chair.addEventListener('click', (event) => {
                if (event.target.classList.contains('conf-step__chair_taken')) {
                    return;
                }
                event.target.classList.toggle('conf-step__chair_selected');
                chairsSelected = [...document.querySelectorAll('.conf-step__row .conf-step__chair_selected')];
                if (chairsSelected.length) {
                    acceptButton.removeAttribute("disabled");
                } else {
                    acceptButton.setAttribute("disabled", true);
                }
            });
        });


        if (chairsSelected.length > 0) {
            acceptButton.removeAttribute("disabled");
        } else {
            acceptButton.setAttribute("disabled", true);
        }

    });

    acceptButton.addEventListener("click", (event) => {
        event.preventDefault();

        let selectedPlaces = Array();
        let divRows = Array.from(document.getElementsByClassName("conf-step__row"));
        let configurationHall = document.querySelector('.conf-step__wrapper').innerHTML;


        for (let i = 0; i < divRows.length; i++) {
            let places = Array.from(divRows[i].getElementsByClassName("conf-step__chair"));
            for (let j = 0; j < places.length; j++) {
                if (places[j].classList.contains("conf-step__chair_selected")) {
                    let typePlace = (places[j].classList.contains("conf-step__chair_standart")) ? "standart" : "vip";
                    selectedPlaces.push({
                        "row": i + 1,
                        "place": j + 1,
                        "type": typePlace
                    });
                }
            }
        }
        selectedSeanse.hallConfig = configurationHall;
        selectedSeanse.salesPlaces = selectedPlaces;
        localStorage.clear();
        localStorage.setItem('selectedSeanse', JSON.stringify(selectedSeanse));
        window.location.href = "payment.html";
    });

    infoTitle.innerHTML = selectedSeanse.filmName;
    filmStart.innerHTML = `Начало сеанса ${selectedSeanse.seanceTime}`;
    hallInfo.innerHTML = selectedSeanse.hallName;
    priceStandart.innerHTML = selectedSeanse.priceStandart;

});