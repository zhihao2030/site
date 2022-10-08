const module = {
    code: 'Vue2-API',
    name: 'Vue2-API',
    sort: 2
}

export default [
    {
        path: 'Vue.extend',
        name: 'Vue.extend',
        component: () => import('@views/VueApi/vue-extend/vue-extend'),
        meta: {
            module,
            title: 'Vue.extend()封装扩展全局组件',
            description: 'Vue.extend()用于创建一个基于Vue构造函数的子类，参数为一个包含`组件选项`的对象（组件构造器）',
            name: 'Vue.extend()',
            juejin: ''
        }
    },
]
