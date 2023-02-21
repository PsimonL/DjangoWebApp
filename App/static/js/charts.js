console.log("Working!")

import {dict} from './countryFlagCurrency.js';
let data = [];
let labels = [];

class CurrAndVal {
  constructor(curr, val) {
    this.curr = curr;
    this.val = val;
    labels.push(curr);
      data.push(val);
  }
}
console.log("Before getData")
let currValDict = [];
function getRates(currency_name) {
    if(currency_name === "pln"){
        console.log("Curr = pln and Val = 1");
        return 1;
    }
    return fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${currency_name}`)
        .then((response) => response.json())
        .then(json_data => {
            // console.log(json_data);
            const value_in_pln = json_data.rates[0].mid;
            console.log(`Curr = ${currency_name} and Val = ${ value_in_pln}`);
            // currValDict = Object.assign({}, currValDict, {currency_name: value_in_pln})
            let obj = new CurrAndVal(currency_name, value_in_pln);
            return {currency_name: value_in_pln};
        })
        .catch(error => {
            console.error(error);
        });
}


for (const key of Object.keys(dict)) {
    // console.log(key + ": " + dict[key])
    getRates(dict[key])
    // let X = getRates(dict[key])
    // console.log(X)
}

labels.push("pln")
data.push(1)
console.log(labels)
console.log(data)

console.log("After getData")






const ctxBarChart = document.getElementById('barChart');
const ctxLineChart = document.getElementById('lineChart');



const stars = [135850, 52122, 148825, 16939, 9763];
const frameworks = ['React', 'Angular', 'Vue', 'Hyperapp', 'Omi'];


//======================================================================================================================
const barChart = new Chart(ctxBarChart, {
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
//  data: {
//     labels: frameworks,
//     datasets: [{
//         label: 'Github Stars',
//         data: stars,
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//         // fill: false,
//         // lineTension: 0
//     }]
//  },
// })

const lineChart = new Chart(ctxLineChart, {
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