<template>
  <el-tabs type="border-card">
    <el-tab-pane v-for="(item, index) in list"  :key="index" :label="item.name">
      <markdown :htmlFile="item.value" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
    name: 'docTab',
    props: {
        list: {
            type:Array,
            default:()=> ([])
        }
    }
}
</script>

<style scoped>

</style>
