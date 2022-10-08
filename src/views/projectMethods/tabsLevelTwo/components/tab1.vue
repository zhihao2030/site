<template>
  <div class="tab">
    <div>
      <div style="margin-bottom: 20px">
        当前tab名称： {{name}}
      </div>
      <div>
        当前radeo label： {{radio}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'tab1',
    props: {
        radio: {
            type: Number,
            default: 1
        },
        name: {
            type: String,
            default: ''
        }
    },
    methods: {
        getList() {
            console.log(`${this.name} 的第 ${this.radio} 发送请求`)
        }
    }
}
</script>

<style scoped>
.tab {
  width: 100%;
  height: calc(100vh - 269px);
  background: greenyellow;
  font-size: 40px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
