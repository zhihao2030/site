<template>
  <div class="card-wrap">
    <el-card class="box-card" v-bind="$attrs">
      <div slot="header" class="clearfix">
        <span class="card-header">{{ title }}</span>
        <div class="header-right">
          <slot name="suffix"></slot>
        </div>
      </div>
      <div class="card-content">
        <slot name="content"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    name: 'card',
    props: {
        title: {
            type: String,
            default: 'card-component'
        },
    }
}
</script>

<style scoped lang="less">
.card-header {
  font-size: 16px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.card-wrap {
  margin:20px 0;
}
</style>
