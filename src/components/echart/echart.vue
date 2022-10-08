<template>
    <div :id="`echarts-${id}`" :style="style"></div>
</template>

<script>
export default {
    name: 'chart',
    props: {
        id: {
            type: [String, Number],
            default: 'default'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
        },
        option: {
            type: Object,
            // Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，
            // 使用闭包保证一个vue实例拥有自己的一份props
            default: () => ({
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

            })
        }
    },
    data:() => ({
        // echarts实例
        chart: ''
    }),
    computed: {
        style() {
            return {
                height: this.height,
                width: this.width
            }
        }
    },
    watch: {
        option: {
            handler(newVal, oldVal) {
                if (this.chart) {
                    if (newVal) {
                        this.chart.setOption(newVal);
                    }
                    else {
                        this.chart.setOption(oldVal);
                    }
                }
                else {
                    this.init();
                }
            },
            deep: true // 对象内部属性的监听，关键。
        }

    },
    methods: {
        init() {
            this.chart = this.$echarts.init(document.getElementById(`echarts-${this.id}`))
            this.chart.setOption(this.option)
            // 图表无据窗口大小进行自动缩放
            window.addEventListener('resize', this.chart.resize);
        }

    },
    mounted() {
        this.init();
    },
}
</script>

<style scoped>

</style>
