const goToChartsButton =  document.getElementById('go-charts')
const goToConvButton =  document.getElementById('go-conv')

goToChartsButton.addEventListener('click', ()=>{
    console.log('goToChartsButton working!')
    window.location.href = 'charts'
})

goToConvButton.addEventListener('click', ()=>{
        console.log('goToConvButton working!')
    window.location.href = 'conv'
})