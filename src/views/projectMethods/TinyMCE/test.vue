<template>
  <editor :content.sync="content"  />
</template>

<script>
import editor from './my-editor'
export default {
    name: 'test',
    components:{editor},
    data(){
        return {
            content: ''
        }
    }
}
</script>

<style scoped>

</style>
