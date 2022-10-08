<template>
  <div class="input-toolTip">
    <el-tooltip placement="top" :content="value" :disabled="notShow">
      <el-input v-model="value" @mouseover.native="mouseoverInput" />
    </el-tooltip>

  </div>
</template>

<script>
export default {
    name: 'inputToolTip',
    data: () => ({
        value: null,
        notShow: true
    }),
    props: {},
    methods: {
        mouseoverInput({target: {scrollWidth,offsetWidth}}) {
            console.log(scrollWidth,offsetWidth)
            this.notShow = scrollWidth < offsetWidth
        }
    }
}
</script>

<style scoped lang='less'>
.input-toolTip {
  width: 20%;
}
</style>
