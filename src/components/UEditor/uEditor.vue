<template>
  <vue-ueditor-wrap v-model="msg" :config="config"  :editor-id="editorId"></vue-ueditor-wrap>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap';
export default {
    name: 'uEditor',
    data: () => ({}),
    computed: {
        msg: {
            get() {
                return this.value
            },
            set(v) {
                this.$emit('update:value',v)
            }
        }
    },
    components: {VueUeditorWrap},
    props: {
        value: String,
        config: Object,
        editorId: {
            type: String,
            required: true
        }
    },
    methods: {}
}
</script>

<style scoped lang='scss'>

</style>
