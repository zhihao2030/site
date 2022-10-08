const module = {
    code: 'browserApi',
    name: '浏览器API',
    sort: 3
}

export default [
    {
        path: 'IntersectionObserve',
        name: 'IntersectionObserve',
        component: () => import('@views/browserApi/IntersectionObserve/IntersectionObserve.vue'),
        meta: {
            module,
            title: 'IntersectionObserver 交叉观察器',
            description: 'IntersectionObserver 接口观察一个元素，观察它是否进入了可视区',
            name: 'IntersectionObserver',
            juejin: 'https://juejin.cn/post/7088606940208562184',
            docName: 'IntersectionObserver',
            codeNames: ['IntersectionObserve']
        }
    },
]
