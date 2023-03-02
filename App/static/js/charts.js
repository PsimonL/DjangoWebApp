// Navigation buttons
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
// Functions for Bar Chart
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
// Functions for Line Chart
let currPicked = [];
const select = document.getElementById('selector');
function controlFlag(element, flagId) {
    element.addEventListener('change', function () {
        const selectedCountry = element.value;
        const apiUrl = 'https://www.countryflagicons.com/FLAT/64/' + selectedCountry + '.png';
        const flagImage = document.getElementById(flagId);
        flagImage.src = apiUrl;
        console.log("CLEAN: currPicked = " + currPicked);
        currPicked.splice(0, currPicked.length);
        currPicked.push(dict[selectedCountry]);
        console.log("NEW: currPicked = " + currPicked);
        plottingLineChart().then(r => {console.log(r)}).catch(error => console.log(error));
      });
}
controlFlag(select, 'flag');

async function get10PastDays() {
    let curr = currPicked[0];
    // if (currPicked[0] === 'eur') { curr = 'eur'; }
    // else { curr = currPicked[0]; }
    if (curr === 'pln') {
        let final = {};
        let ones = new Array(10).fill(1);
        const today = new Date();
        const dates = [];
        for (let i = 0; i < 10; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateString = date.toISOString().slice(0,10);
          dates.push(dateString);
        }
        for (let i = 0; i < ones.length; i++) {
          Object.assign(final, { [dates[i]]: ones[i] });
        }
        window.alert("Polish currency is the currency in which rest of possible picks will be displayed.")
        return final;
    } else {
        console.log("curr  =  " + curr);
        const response = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${curr}/last/10/?format=json`);
        const data = await response.json();
        const result = {};
        for (let i = 0; i < 10; i++) {
            let rates = data['rates'];
            let whichDict = rates[i];
            let value = whichDict['mid'];
            let datetime = whichDict['effectiveDate'];
            console.log(`${datetime} ${curr}${i} = ${value}`);
            result[datetime] = value;
        }
        console.log("result keys = " + Object.keys(result));
        console.log("result values = " + Object.values(result));
        return result;
    }
}
// async function DEFAULTset10PastDays(){
//     return await get10PastDays();
// }

//======================================================================================================================
//======================================================================================================================
// Plotting charts
const ctxBarChart = document.getElementById('barChart');
const ctxLineChart = document.getElementById('lineChart');

async function plottingBarChart(){
    const resultBarChart = await setter();
    // console.log("CHARTS resultBarChart = " + resultBarChart);
    const valuesBarChart = Object.values(resultBarChart);
    // console.log("CHARTS resultBarChart valuesForBarChart = " + valuesBarChart);
    const keysBarChart = Object.keys(resultBarChart);
    // console.log("CHARTS resultBarChart keysForBarChart = " + keysBarChart);
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
}
plottingBarChart().then(r => {console.log(r)}).catch(error => console.log(error));

//======================================================================================================================
function retConfig(keysLineChart, valuesLineChart) {
    return {
        type: 'line',
        data: {
            labels: keysLineChart,
            datasets: [{
                label: 'Currency value line chart for picked currency for past 10 days',
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
    };
}

async function defaultLineChart(){
    let eur = 'eur';
    const response = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${eur}/last/10/?format=json`);
    const data = await response.json();
    const result = {};
    for (let i = 0; i < 10; i++) {
        let rates = data['rates'];
        let whichDict = rates[i];
        let value = whichDict['mid'];
        let datetime = whichDict['effectiveDate'];
        console.log(`${datetime} eur${i} = ${value}`);
        result[datetime] = value;
    }
    const valuesLineChart = Object.values(result);
    const keysLineChart = Object.keys(result);
    console.log("result keys = " + keysLineChart);
    console.log("result values = " + valuesLineChart);
    new Chart(ctxLineChart, retConfig(keysLineChart, valuesLineChart));
}
defaultLineChart();

async function plottingLineChart() {
    const resultLineChart = await get10PastDays();
    const valuesLineChart = Object.values(resultLineChart);
    const keysLineChart = Object.keys(resultLineChart);
    new Chart(ctxLineChart, retConfig(keysLineChart, valuesLineChart));
}