selectedSeanse = JSON.parse(localStorage.selectedSeanse);
let totalPrice = 0;
let selectedPlaces = " ";


for (let {
        row,
        place,
        type
    } of selectedSeanse.salesPlaces) {
    if (selectedPlaces !== "") {
        selectedPlaces += ", ";
    }
    selectedPlaces += `${row}/${place}`;
    totalPrice += type === "standart" ? Number(selectedSeanse.priceStandart) : Number(selectedSeanse.priceVip);
}

document.querySelector(".ticket__cost").innerHTML = totalPrice;
document.querySelector(".ticket__title").innerHTML = selectedSeanse.filmName;
document.querySelector(".ticket__chairs").innerHTML = selectedPlaces;
document.querySelector(".ticket__hall").innerHTML = selectedSeanse.hallName;
document.querySelector(".ticket__start").innerHTML = selectedSeanse.seanceTime;


let hallConfig = selectedSeanse.hallConfig.replace(/selected/g, "taken");

let acceptionButton = document.querySelector(".acceptin-button");


acceptionButton.addEventListener("click", (event) => {
    event.preventDefault();
    fetch("https://jscp-diplom.netoserver.ru/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `event=sale_add&timestamp=${selectedSeanse.seanceTimeStamp}&hallId=${selectedSeanse.hallId}&seanceId=${selectedSeanse.seanceId}&hallConfiguration=${hallConfig}`,
    });
});