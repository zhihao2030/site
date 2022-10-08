<template>
  <div>
    <button @click="openModal">全局模态框</button>
    <button @click="openModal2">全局成功模态框</button>
  </div>
</template>

<script>

export default {
    name: 'vue-extend',
    methods: {
        openModal() {
            this.$messageBox.show({
                title: '通过this调用',
                content: '源文件在plugin中,以插件形式封装',
                type: 'warn'
            })
        },
        openModal2() {
            this.$messageBox.primary({
                title: '全局成功模态框',
                content: '源文件在plugin中,以插件形式封装',
            })
        }
    }
}
</script>

<style scoped>

</style>
