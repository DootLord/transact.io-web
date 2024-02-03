const chartElem = document.getElementById('acquisitions');
const charts = [];

async function initStocks() {
    const containerElem = document.getElementById('chartContainer');
    const stocks = await (await fetch("/api/stock")).json();
    for (const stock of stocks) {
        let canvas = document.createElement('canvas');
        canvas.id = stock.ticker;
        containerElem.appendChild(canvas);
        let canvasElem = document.getElementById(stock.ticker);
        let stockChart = new Chart(canvasElem, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: stock.ticker,
                    data: [],
                    borderWidth: 2
                }]
            }
        });
        charts.push({ "ticker": stock.ticker, "chart": stockChart });
    }
}

async function getStocks() {
    const stocks = await (await fetch("/api/stock")).json();

    for (const chart of charts) {
        const thisChart = chart.chart;
        const thisValue = stocks.find(stock => chart.ticker === stock.ticker).value;
        thisChart.data.datasets[0].data.push(thisValue);
        thisChart.data.labels.push(new Date().toLocaleTimeString());

        // if(thisChart.data.datasets[0].data.length > 10) {
        //     thisChart.data.datasets[0].data.shift();
        //     thisChart.data.labels.shift();
        // }
        thisChart.update();
    }

}

async function init() {
    await initStocks();
    setInterval(getStocks, 1000);
}

init()
