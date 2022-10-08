<template>
   <div class="testMarkdown">
     <div class="ui">
       <onlineEdit title="测试jsEditor"/>
     </div>
   </div>
</template>

<script>
import onlineEdit from '@/components/onlineEdit/onlineEdit'
export default {
    name: 'testMarkdown',
    data: () => ({
        jsonCode: ''
    }),
    components: {
        onlineEdit
    },
    mounted() {

    },
    computed: {

    },
    methods: {
        handleJsonChange(v) {
            console.log(v)
        }
    }
}
</script>

<style scoped>

</style>
