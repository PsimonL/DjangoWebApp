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

console.log("Working");
console.log("Before getRates")

async function getRates(currency_name) {
        if (currency_name === "pln") {
        console.log("Curr = pln and Val = 1");
        return 1;
    }
      const result = {};
    for (const it of currency_name) {
        const response = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${it}`);
        const data = await response.json();
        result[it] = data.rates[0].mid;
  }
    result["pln"] = 1;
    return result;
}

console.log("Before setter")
async function setter(){
    const currencyNames = ["chf", "eur", "gbp", "usd"];
    return await getRates(currencyNames);
}

//======================================================================================================================
const ctxBarChart = document.getElementById('barChart');
const ctxLineChart = document.getElementById('lineChart');

const stars = [135850, 52122, 148825, 16939, 9763];
const frameworks = ['React', 'Angular', 'Vue', 'Hyperapp', 'Omi'];

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
                label: 'Github Stars',
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
    })



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
charts().then(r => {console.log(" " + r); console.log("Finished");}).catch(error => console.log(error))