const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// for(code in countryList){
//     console.log(code,countryList[code]);
// }

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const toggleBtn = document.querySelector("#toggle");

toggleBtn.addEventListener("click", () => {
  // Store the current values of 'from' and 'to' dropdowns
  let fromValue = fromCurr.value;
  let toValue = toCurr.value;

  // Swap the values
  fromCurr.value = toValue;
  toCurr.value = fromValue;

  // Update the flags accordingly
  updateFlag(fromCurr);
  updateFlag(toCurr);

  // Call the exchange rate update function after swapping
  updateExchangeRate();
});

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  // console.log(amtVal);
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = 1;
  }

  // console.log(fromCurr.value.toLowerCase());
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  // console.log(response);
  let data = await response.json();
  // console.log(data);
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  // console.log(rate);
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${
    toCurr.value
  }`;
};

updateFlag = (element) => {
  // console.log(element);
  let currCode = element.value;
  let countryCode = countryList[currCode];
  // console.log(countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
  // console.log(img);
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
