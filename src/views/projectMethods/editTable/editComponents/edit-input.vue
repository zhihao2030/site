<template>
   <div class="cell">
     <el-input ref="elInputRef"  size="mini" v-model.trim="cellValue" placeholder="请输入内容" @blur="handleInputBlur" />
   </div>
</template>

<script>
export default {
    props: {
        cellValue: {
            type: [String, Number],
            default: ''
        },
        editDone: Function,
        rowData: Object,
        property: String,
        cellDom: Node
    },
    data() {
        return {
            input: ''
        }
    },
    mounted() {
        console.log(this)
        // 用户双击后，让其处于获取焦点的状态
        this.$refs.elInputRef.focus();
    },
    methods:{
        handleInputBlur() {
            this.editDone({
                cellValue: this.cellValue,
                cellDom: this.cellDom,
                row: this.rowData,
                property: this.property,
            })
        }
    }
}
</script>

<style scoped lang="less">
.cell {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 8px;
}
</style>
