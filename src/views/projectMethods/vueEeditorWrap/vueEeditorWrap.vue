<template>
    <uEditor :vlaue.sync="content" :config="editorConfig"  editor-id="editor-demo-01"/>
</template>

<script>
export default {
    name: 'vueEeditorWrap',
    data: () => ({
        content: '',
        editorConfig: {
        // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
            UEDITOR_HOME_URL: '/UEditor/',
            // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
            serverUrl: '//ueditor.zhenghaochuan.com/cos',
        },
    }),
    props: {},
    methods: {}
}
</script>

<style scoped lang='scss'>

</style>
