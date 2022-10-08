<template>
  <el-tabs v-model="ins" type="border-card" @tab-click="handleClick">
    <el-tab-pane
        v-for="(item, index) in list"
        :key="index"
        :label="`${item.name}.vue`"
        :name="`${index}`">
      <code-editor
          :title="`${item.name}.vue`"
          :ref="item.name"
          :refName="item.name"
          :jsonCode="item.value"
          :readonly="true"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
    name: 'codeTab',
    props: {
        list: {
            type:Array,
            default:()=> ([])
        }
    },
    data: function() {
        return {
            ins:'0'
        };
    },
    methods:{
        handleClick(tab){
            setTimeout(()=>{
                tab.$children[0].refresh()
            })
        }
    }
}
</script>

<style scoped>

</style>
