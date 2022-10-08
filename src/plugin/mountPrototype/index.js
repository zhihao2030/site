import * as echarts from 'echarts';

export default {
    install (Vue){
        Vue.prototype.$echarts = echarts // 将echarts注册成Vue的全局属性
        window.$echarts = echarts
    }
}
