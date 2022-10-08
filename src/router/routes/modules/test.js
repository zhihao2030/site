const module = {
    code: 'test',
    name: '测试功能',
    sort: 4
}

export default [
    {
        path: 'testMarkdown',
        name: 'testMarkdown',
        component: () => import('@views/test/testMarkdown/testMarkdown'),
        meta: {
            title: '解析Markdown 文件',
            description: 'Markdown 文件渲染html测试',
            name: 'testMarkdown',
            juejin: '',
            docName: 'test',
            codeNames: ['testMarkdown','onlineEdit','codeEditor','iframeVm']
        }
    },
].map(v=>{
    v.meta.module=module
    return v
})
