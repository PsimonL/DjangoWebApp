console.log("Working!")

const dict = {
    "CH": "chf",
    "PL": "pln",
    "EU": "eur",
    "GB": "gbp",
    "US": "usd"
};
console.log("Before getData")
for (let i = 1; i <= Object.keys(dict).length; i++) {
    console.log("dict index = " + i )
}
  // const response = await fetch('https://example.com/data');
  // const data = await response.json();
  // do something with the data

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