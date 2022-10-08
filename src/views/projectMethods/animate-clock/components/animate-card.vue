<template>
  <div class="animate-card">
    <div class="card-group" v-for="(item,idx) in val" :key="idx" :style="{'font-size': size+'px'}">
      <transition-group enter-active-class="animate__animated animate__bounceIn" leave-active-class="animate__animated animate__fadeOutDown">
        <div class="card-item" :class="{'disabled': selfDisabled}" v-for="num in 10" :key="num" v-show="item== num-1">{{num-1}}</div>
      </transition-group>
    </div>
  </div>

</template>

<script>
export default {
    name: 'animate-card',
    data: () => ({}),
    props: {
        val: {
            type: Array,
            default: () => ['0', '0'],
        },
        size: {
            type: Number,
            default: 16,
        },
        selfDisabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {}
}
</script>

<style lang="less" scoped>
.animate-card {
  width: auto;
  display: inline-block;
  height: 100%;
  .card-group {
    display: inline-block;
    position: relative;
    width: 40px;
    padding: 5px;
    height: 100%;
    vertical-align: middle;
    .card-item {
      position: absolute;
      background: #3a7fe4;
      color: #fff;
      width: 30px;
      height: 40px;
      top: -20px;
      line-height: 40px;
    }
    .disabled {
      background: #ccc !important;
    }
  }
}
</style>

<!--
主要思路是通过 vue 的 transition-group 机制，将 0-9 所有的卡片都渲染好，隐藏起来，
通过 v-show 来触发绑定在 transition-group 上的动画效果，从而实现动态监听数据变化的效果。
transition-group
-->
