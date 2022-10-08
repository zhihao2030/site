export const defaultOptions =`const options = {
    title: {
        text: 'Echarts'
    },
    legend: {
        data: ['销量']
    },
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子','tuoxie']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 70]
        }
    ]

}`


export const htmlData = (html1='',css='',id='default',option) => (
    `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
            <style>
                ${css}
            </style>
            <script src="https://cdn.jsdelivr.net/npm/echarts@5.3.2/dist/echarts.min.js"></script>
        </head>
    <body>
    <div class="echart" style="height: 400px; width: 100%;" id="echarts-${id}"></div>
          ${html1}
          <script>
            const chart = echarts.init(document.getElementById("echarts-${id}"))
            ${option}
            chart.setOption(options)
             window.addEventListener('resize', chart.resize);
            // 图表无据窗口大小进行自动缩放
          </script>
    </body>
</html>`)
