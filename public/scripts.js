function getWeight(){
    let weight = document.getElementById('weight').value
    return weight
}

function getDate(){
    let date = new Date()
    date = `${date.getDate()}-${1 + date.getMonth()}-${date.getFullYear()}`
    return date
}

function getDataInLocalStorage(id="db"){
    let db = JSON.parse(localStorage.getItem(id)) || []
    return db
}

function setDataInLocalStorage(id, data){
    localStorage.setItem(id, JSON.stringify(data))
}

function saveWeight(){
    let weight = getWeight()
    let date = getDate()
    let newData = { date, weight }
    db = getDataInLocalStorage()
    db.push(newData)
    setDataInLocalStorage("db", db)
    setGraph()
}

function transformData(){
    const listInfo = getDataInLocalStorage()
    const labels = []
    const dataset = []

    for(let info of listInfo){
        labels.push(info.date)
        dataset.push(info.weight)
    }
        
    const dataStructed = { labels, dataset}
    return dataStructed
    
}

function setGraph(){
    const dataStructed = transformData()
    const ctx = document.getElementById("graph").getContext('2d')
    const structGraph = {
        type: 'line',
        data: {
        labels:  dataStructed.labels,
        datasets:[{
            label: "peso",
            data: dataStructed.dataset,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    }
    const myChart = new Chart(ctx, structGraph)

}