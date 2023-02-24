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

const select1 = document.getElementById('selector1');
const select2 = document.getElementById('selector2');


let fromCurr = [];
let toCurr = [];

function controlFlag(element, flagId) {
  element.addEventListener('change', function () {
    const selectedCountry = element.value;
    // console.log("selectedCountry = " + selectedCountry);
    if (flagId === "flag1") {
        fromCurr.push(selectedCountry);
    }
    if(flagId === "flag2"){
        toCurr.push(selectedCountry)
    }
    const apiUrl = 'https://www.countryflagicons.com/FLAT/64/' + selectedCountry + '.png';
    const flagImage = document.getElementById(flagId);
    flagImage.src = apiUrl;
  });
}
controlFlag(select1, 'flag1');
controlFlag(select2, 'flag2');

// =====================================================================================================================
// default
let curr1Val = pickedCurrency1.value;
// console.log(`curr1Val dsaaaaaaaaaaaaaaaa= ${curr1Val}` )
let curr1Name = dict[curr1Val];
// console.log(`curr1Name = ${curr1Name}` )

let curr2Val = pickedCurrency2.value;
let curr2Name = dict[curr2Val];
// console.log(`curr2Name = ${curr2Name}` )

// =====================================================================================================================
// for button
function getRates(currency_name) {
    if(currency_name === "pln"){ return 1; }
    return fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${currency_name}`)
        .then((response) => response.json())
        .then(json_data => {
            console.log(json_data);
            const value_in_pln = json_data.rates[0].mid;
            console.log(`currency_name = ${currency_name} and value_in_pln = ${value_in_pln}`);
            return value_in_pln;
        })
        .catch(error => {
            console.error(error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
  if (conversionButton) {
    conversionButton.addEventListener('click', () => {
        console.log('Button clicked!');
        // TODO: fix changing curr1Name and curr2Name
        let fromFlag = fromCurr.slice(-1)[0];
        let toFlag = toCurr.slice(-1)[0];
        if (fromFlag === undefined) { fromFlag = "EU"; }
        if(toFlag === undefined) { toFlag = "PL"; }
        console.log("fromFlag = " + fromFlag + " and toFlag = " + toFlag);
        console.log("fromCurr = " + dict[fromFlag] + " and toCurr = " + dict[toFlag]);

        Promise.all([getRates(dict[fromFlag]), getRates(dict[toFlag])])
        .then(values => {
            const tab = values;
            console.log(`${dict[fromFlag]} = ${tab[0]}; ${dict[toFlag]} = ${tab[1]};`);
            console.log(`${pickedCurrency1.value} to ${pickedCurrency2.value} = ${(tab[0] / tab[1]).toFixed(4)}`);
            console.log(`Amount for ${dict[fromFlag]} to ${dict[toFlag]}: ${valueForInput.value}`);
            let valueForOutput = valueForInput.value * ((tab[0] / tab[1]).toFixed(2));
            console.log("Value for output = " + valueForOutput);
            outputRatio.innerHTML = `${valueForInput.value} ${dict[fromFlag]} => ${valueForOutput} ${dict[toFlag]}`
        });
    });
    fromCurr.splice(0, fromCurr.length);
    toCurr.splice(0, toCurr.length);
  } else {
    console.log("Button Not Working!!!");
  }
});