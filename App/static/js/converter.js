// function getValue() {
//   let text = document.getElementById('enter').value;
//   document.getElementById('conversion').innerHTML = 'Value: ' + text;
// }

// =====================================================================================================================
const select1 = document.getElementById('selector1');
const select2 = document.getElementById('selector2');
function controlFlag(element, flagId) {
  element.addEventListener('change', function () {
    const selectedCountry = element.value;
    const apiUrl = 'https://www.countryflagicons.com/FLAT/64/' + selectedCountry + '.png';
    const flagImage = document.getElementById(flagId);
    flagImage.src = apiUrl;
  });
}
controlFlag(select1, 'flag1');
controlFlag(select2, 'flag2');

// =====================================================================================================================
const pickedCurrency1 = document.getElementById('selector1');
const pickedCurrency2 = document.getElementById('selector2');
const valueForInput = document.getElementById('enter');
const valueForOutput = document.getElementById('conversion');
const conversionButton =  document.querySelector('.exchange-button');
const outputRatio = document.getElementById('conversion');

const dict = {
    "CH": "chf",
    "PL": "pln",
    "EU": "eur",
    "GB": "gbp",
    "US": "usd"
};
let curr1Val = pickedCurrency1.value;
const curr1Name = dict[curr1Val];
let curr2Val = pickedCurrency2.value;
const curr2Name = dict[pickedCurrency2.value];

let inputVal = valueForOutput.value;

// =====================================================================================================================
// EVENT LISTENERS
// for currency1
pickedCurrency1.addEventListener('change', (eventCurr1) => {
    curr1Val = eventCurr1.target.value;
    console.log(`Selected CURR1: ${curr1Val}`);

});

// for currency 2
pickedCurrency2.addEventListener('change', (eventCurr2) => {
    curr2Val = eventCurr2.target.value;
    console.log(`Selected CURR2: ${curr2Val}`);
});

// for amount (how much currency1 to currency2)
valueForInput.addEventListener('input', (eventInput) => {
    inputVal = eventInput.target.value;
    console.log(`Amount for curr1 to curr2: ${inputVal}`);
});

// for button
function getRates(currency_name) {
    if(currency_name === "pln"){ return 1; }
    return fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${currency_name}`)
        .then((response) => response.json())
        .then(json_data => {
            console.log(json_data);
            const value_in_pln = json_data.rates[0].mid;
            console.log(`${currency_name} ${typeof (value_in_pln)}`);
            return value_in_pln;
        })
        .catch(error => {
            console.error(error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
  if (conversionButton) {
    conversionButton.addEventListener('click', () => {
        console.log("Button Status: " + conversionButton);
        console.log('Button clicked!');

        Promise.all([getRates(curr1Name), getRates(curr2Name)])
        .then(values => {
        const tab = values;
            console.log("tab[0] = " + tab[0]);
            console.log("tab[1] = " + tab[1]);
            console.log(`${pickedCurrency1} to ${pickedCurrency2} = ${(tab[0] / tab[1]).toFixed(4)}`);
            let valueForOutput = valueForInput.value * ((tab[0] / tab[1]).toFixed(2));
            console.log("valueForOutput = " + valueForOutput);
            outputRatio.innerHTML = `${valueForInput.value} ${curr1Name} => ${valueForOutput} ${curr2Name}`
        });
    });
  } else {
    console.log("Button Not Working!!!");
  }
});
