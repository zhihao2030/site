<template>
  <div class="markdown-body" v-html="htmlFile" v-highlight ></div>
</template>

<script>
import {marked} from 'marked'
export default {
    name: 'markdown',
    props: {
        htmlFile: {
            default: ''
        }
    },
    data: () => ({
        htmlData: ''
    }),
    watch: {
        html(v) {
            if (!v) return
            this.htmlData = marked(v)
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style scoped>

</style>
