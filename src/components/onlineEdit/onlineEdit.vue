<template>
  <div class="online-edit" :style="{height: editHeight}">
    <div class="js-edit">
      <code-editor
          :title="title"
          ref="jsEditor"
          :jsonCode="jsonCode"
          :readonly="false"
          @change="handelChange"
      />
    </div>
    <div class="run">
      <iframeVm :iframe-src="jsonCode" :logList="logList" @clear=" logList = [] "/>
    </div>
  </div>
</template>

<script>

import iframeVm from '@/components/iframeVm/iframeVm'

export default {
    name: 'onlineEdit',
    data: () => ({
        jsonCode: '',
        logList: []
    }),
    components: {
        iframeVm
    },
    props: {
        title: {
            type: String
        },
        height: {
            type: String,
            default: '400'
        }
    },
    computed: {
        editHeight() {
            return this.height.includes('px') ? this.height : this.height + 'px'
        }
    },
    methods: {
        handelChange(v) {
            this.jsonCode = v
        }
    },
    created() {
        // 监听iframe信息
        window.addEventListener('message', ({ data = {} }) => {
            if (data.type === 'console')
                this.logList.push({
                    type: data.method,// console的方法名
                    data: data.data,// 要显示的信息，一个数组，可能同时打印多条信息
                    res:data.res
                })
            console.log(this.logList,999)
        })}

}
</script>

<style scoped lang="less">
.online-edit {
  display: flex;
  width: 100%;
  .js-edit {
    width: 48%;
  }
  .run {
    width: 48%;
  }
  justify-content: space-between;
  /deep/.CodeMirror {
    height: calc(100% - 53px) !important;
    overflow-y: hidden !important;
  }
  /deep/.CodeMirror-scroll {
    height: 100% !important;
    overflow-y: auto !important;
  }
}
</style>
