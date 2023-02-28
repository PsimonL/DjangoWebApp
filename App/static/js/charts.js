const goToHomeButton =  document.getElementById('go-home');
const goToConvButton =  document.getElementById('go-conv');
const goToChartsButton =  document.getElementById('go-charts');

goToHomeButton.addEventListener('click', ()=>{
    console.log('goToHomeButton working!');
    window.location.href = '/';
});

goToConvButton.addEventListener('click', ()=>{
        console.log('goToConvButton working!');
    window.location.href = '/conv';
});

goToChartsButton.addEventListener('click', ()=>{
    window.alert("That's your current location!!!");
});
// =====================================================================================================================
// console.log("Before getRates");
async function getRates(currency_name) {
    const result = {};
    for (const it of currency_name) {
        if(it ==='pln'){ continue; }
        const response = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${it}`);
        const data = await response.json();
        result[it] = data.rates[0].mid;
  }
    result["pln"] = 1;
    return result;
}

// console.log("Before setter")
import {dict} from './countryFlagCurrency.js';
async function setter(){
    // const currencyNames = ["chf", "eur", "gbp", "usd"];
    const currencyNames = Object.values(dict);
    return await getRates(currencyNames);
}
//======================================================================================================================


function controlFlag(selector, flagId) {
    const element = document.getElementById(selector);
    element.addEventListener('change', function () {
        const flagImage = document.getElementById(flagId);
        flagImage.src = 'https://www.countryflagicons.com/FLAT/64/' + element.value + '.png';
      });
}
controlFlag('selector', 'flag');


async function get10USD(){
    const response = await fetch('http://api.nbp.pl/api/exchangerates/rates/a/usd/last/10/?format=json');
    const data = await response.json();
    const result = {};
    for(let i = 0; i < 10; i++){
        let rates = data['rates'];
        let whichDict = rates[i];
        let value = whichDict['mid'];
        let datetime = whichDict['effectiveDate'];
        console.log(`${datetime} USD${i} = ${value}`);
        result[datetime] = value;
    }
    console.log(result);
    return result;
}
async function setter10USD(){
    return await get10USD();
}

//======================================================================================================================
//======================================================================================================================
const ctxBarChart = document.getElementById('barChart');
const ctxLineChart = document.getElementById('lineChart');

console.log("Before charts")
async function charts() {
    const resultBarChart = await setter();
    console.log("CHARTS resultBarChart = " + resultBarChart);
    const valuesBarChart = Object.values(resultBarChart);
    console.log("CHARTS resultBarChart valuesForBarChart = " + valuesBarChart);
    const keysBarChart = Object.keys(resultBarChart);
    console.log("CHARTS resultBarChart keysForBarChart = " + keysBarChart);
    new Chart(ctxBarChart, {
        type: 'bar',
        data: {
            labels: keysBarChart,
            datasets: [{
                label: 'Currency value bar chart',
                data: valuesBarChart,
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
        options: {
            // maintainAspectRatio: false,
            // responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 10
                    }
                }]
            }
        }
    })



    const resultLineChart = await setter10USD();
    console.log("CHARTS resultLineChart = " + resultLineChart);
    const valuesLineChart = Object.values(resultLineChart);
    console.log("CHARTS resultLineChart valuesForLineChart = " + valuesLineChart);
    const keysLineChart = Object.keys(resultLineChart);
    console.log("CHARTS resultLineChart keysForLineChart = " + keysLineChart);
    new Chart(ctxLineChart, {
        type: 'line',
        data: {
            labels: keysLineChart,
            datasets: [{
                label: 'Currency value line chart for USD for past 10 days',
                data: valuesLineChart,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                // fill: false,
                // lineTension: 0
            }]
        },
        options: {
            // maintainAspectRatio: false,
            // responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 6
                    }
                }]
            }
        }
    })
}
charts().then(r => {console.log(" " + r); console.log("Finished");}).catch(error => console.log(error))