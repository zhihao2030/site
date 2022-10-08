const module = {
    code: 'HTTP',
    name: 'HTTP',
    sort: 3
}

export default [
    {
        path: 'http-catch',
        name: 'http-catch',
        component: () => import('@/views/http/http-catch/http-catch'),
        meta: {
            module,
            title: 'http 缓存',
            description: `HTTP缓存常见的有两类：强缓存：可以由这两个字段其中一个决定
                                                    expires
                                                    cache-control(优先级更高)
                                                             
                                            协商缓存：可以由这两对字段中的一对决定                                         
                                                Last-Modified，If-Modified-Since
                                                Etag，If-None-Match(优先级更高)`  ,
            name: 'http 缓存',
            juejin: 'https://juejin.cn/post/7088606940208562184',
            docName: 'http-catch',
            codeNames: ['http-catch']
        }
    },
]
