const BaseUrl = `https://api.exchangerate-api.com/v4/latest`;
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (let select of dropdowns) {
    for (let currCodes in countryList) {
        let newOptions= document.createElement("option");
        newOptions.innerText = currCodes;
        newOptions.value = currCodes;
        if (select.name === "from" && currCodes === "USD") {
            newOptions.selected = "selected";
        } else if (select.name === "to" && currCodes === "INR"){
            newOptions.selected = "selected";
        }
        select.append(newOptions);
}
select.addEventListener("change",(evt) => {
    updateFlag(evt.target);
});
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newSource = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSource;
}
window.addEventListener("load",() => {
    updateExchangeRate();
})
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
const updateExchangeRate = async () => {
    let amt = document.querySelector(".amount input");
    let amtVal = amt.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amt.value = "1";
    }
    const Url = `${BaseUrl}/${fromCurr.value}`;
    try {
        const response = await fetch(Url);
        const data = await response.json();
        const rate = data.rates[toCurr.value];
        const totalAmt = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${totalAmt.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        console.log(Url);
    }
}