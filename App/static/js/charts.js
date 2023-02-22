const goToHomeButton =  document.getElementById('go-home')
const goToConvButton =  document.getElementById('go-conv')

goToHomeButton.addEventListener('click', ()=>{
    console.log('goToHomeButton working!')
    window.location.href = 'home'
})

goToConvButton.addEventListener('click', ()=>{
        console.log('goToConvButton working!')
    window.location.href = 'conv'
})

console.log("Working!");

import {dict} from './countryFlagCurrency.js';
let valuesForBarChart = [];
let labelsForBarChart = [];

console.log("Before getData")
let currValDict = [];

async function getRates(currencyNames) {
        if (currencyNames === "pln") {
        console.log("Curr = pln and Val = 1");
        return 1;
    }
      const result = {};
    for (const currencyName of currencyNames) {
        const response = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${currencyName}`);
        const data = await response.json();
        const valueInPLN = data.rates[0].mid;
        result[currencyName] = valueInPLN;
  }
    console.log("RESULT = " + result);
    result["pln"] = 1;
    return result;
//     let currency_name = ""
//     for (const key of Object.keys(dict)) {
//         currency_name = dict[key];
//
//     if (currency_name === "pln") {
//         console.log("Curr = pln and Val = 1");
//         return 1;
//     }
//     try {
//         const response = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${currency_name}`);
//         const json_data = await response.json();
//         const value_in_pln = json_data.rates[0].mid;
//         console.log(`Curr = ${currency_name} and Val = ${value_in_pln}`);
//         labelsForBarChart.push(currency_name);
//         valuesForBarChart.push(value_in_pln);
//         console.log(labelsForBarChart)
//         return {currency_name: value_in_pln};
//     } catch (error) {
//         console.log(error);
//     }
// }
}

async function setter(){
    const currencyNames = ["chf", "eur", "gbp", "usd"];
    // const lolo = getRates(currencyNames)
    // .then(result => {
    //     console.log("lolo keys = " + Object.keys(result));
    //     console.log("lolo values = " + Object.values(result));
    // })
    // .catch(error => {
    //     console.error(error);
    // });
    const result = await getRates(currencyNames);
    console.log(result);
    const values = Object.values(result);
    console.log("lolo values = " + values);
    const keys = Object.keys(result);
    console.log("lolo keys = " + keys);
    // await getterValues(values);
    // await getterKeys(keys);
    return result;
}
setter()

// async function getterValues(argVal){
//     console.log("getterValues = " + argVal);
//     return argVal;
// }
//
// async function getterKeys(argName){
//     console.log("getterKeys = " + argName);
//     return argName;
// }

//======================================================================================================================
const ctxBarChart = document.getElementById('barChart');
const ctxLineChart = document.getElementById('lineChart');

const stars = [135850, 52122, 148825, 16939, 9763];
const frameworks = ['React', 'Angular', 'Vue', 'Hyperapp', 'Omi'];

async function charts() {
    const result = await setter();

    console.log("CHARTS result = " + result);

    const values = Object.values(result);
    console.log("CHARTS result values = " + values);
    const keys = Object.keys(result);
    console.log("CHARTS result keys = " + keys);

    new Chart(ctxBarChart, {
        type: 'bar',
        data: {
            labels: frameworks,
            datasets: [{
                label: 'Github Stars',
                data: stars,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)"],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",],
                borderWidth: 1
            }]
        },
    })

// const lineChart = new Chart(ctxLineChart, {
//  type: 'line',
//  valuesForBarChart: {
//     labelsForBarChart: frameworks,
//     datasets: [{
//         label: 'Github Stars',
//         valuesForBarChart: stars,
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//         // fill: false,
//         // lineTension: 0
//     }]
//  },
// })

    new Chart(ctxLineChart, {
        type: 'line',
        data: {
            labels: frameworks,
            datasets: [{
                label: 'Github Stars',
                data: stars,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                // fill: false,
                // lineTension: 0
            }]
        },
    })
}
charts()