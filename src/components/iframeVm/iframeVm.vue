<template>
  <div class="iframeVm">
    <iframe :srcdoc="src" frameborder="0" v-show="false"></iframe>
    <div class="header">
      <div class="title">
        控制台
      </div>
        <el-button type="primary" plain @click="run">运行</el-button>
        <el-button type="warning" style="margin-right: 10px"  plain @click="$emit('clear')">清空</el-button>
    </div>
    <div class="result-area">
      <div class="logBox">
        <div class="logRow" v-for="(log, index) in logList" :key="index">
          <template v-for="(logItem, itemIndex) in log.data">
            <div
                class="logItem json"
                v-if="['object', 'array'].includes(logItem.contentType)"
                v-html="logItem.content"
                @click="jsonClick"
            ></div>
            <!-- 基本数据类型 -->
            <div v-else class="logItem message" :class="[logItem.contentType]" v-html="logItem.content"></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {iframeHtml} from './config'
export default {
    name: 'iframeVm',
    data: ()=>({
        src: '',
        expandIndex: 0
    }),
    props: {
        iframeSrc: {
            type: String,
            default: ''
        },
        logList: {
            type: Array,
            default: ()=>([])
        }
    },
    computed: {

    },
    methods: {
        run() {
            if(!this.iframeSrc) {
                return this.$messageBox.error({
                    title: '错误',
                    content: '代码为空，请填写代码',
                })
            }
            this.src = iframeHtml()
            setTimeout(()=>{
                this.src = iframeHtml(this.iframeSrc)
            })

        },
        getChildByClassName(el, className){
            let children = el.children
            for (let i = 0; i < children.length; i++) {
                if (children[i].classList.contains(className)) {
                    return children[i]
                }
            }
            return null
        },
        jsonClick(e) {
        // 点击是展开收缩按钮
            if (e.target && e.target.classList.contains('expandBtn')) {
                let target = e.target
                let parent = target.parentNode
                // id，每个展开收缩按钮唯一的标志
                let index = target.getAttribute('data-index')
                if (index === null) {
                    index = this.expandIndex++
                    target.setAttribute('data-index', index)
                }
                // 获取当前状态，0表示收缩、1表示展开
                let status = target.getAttribute('expand-status') || '1'
                // 在子节点里找到wrap元素
                let wrapEl = this.getChildByClassName(parent, 'wrap')
                // 找到下层所有的按钮节点
                let btnEls = wrapEl.querySelectorAll('.expandBtn')
                // 收缩状态 -> 展开状态
                if (status === '0') {
                    // 设置状态为展开
                    target.setAttribute('expand-status', '1')
                    // 展开
                    wrapEl.style.height = 'auto'
                    // 按钮箭头旋转
                    target.classList.remove('shrink')
                    // 移除省略号元素
                    let ellipsisEl = this.getChildByClassName(parent, 'ellipsis')
                    parent.removeChild(ellipsisEl)
                    // 显示下级展开收缩按钮
                    for (let i = 0; i < btnEls.length; i++) {
                        let _index = btnEls[i].getAttribute('data-for-index')
                        // 只有被当前按钮收缩的按钮才显示
                        if (_index === index) {
                            btnEls[i].removeAttribute('data-for-index')
                            btnEls[i].style.display = 'inline-block'
                        }
                    }
                } else if (status === '1') {
                    // 展开状态 -> 收缩状态
                    target.setAttribute('expand-status', '0')
                    wrapEl.style.height = 0
                    target.classList.add('shrink')
                    let ellipsisEl = document.createElement('div')
                    ellipsisEl.textContent = '...'
                    ellipsisEl.className = 'ellipsis'
                    parent.insertBefore(ellipsisEl, wrapEl)
                    for (let i = 0; i < btnEls.length; i++) {
                        let _index = btnEls[i].getAttribute('data-for-index')
                        // 只隐藏当前可以被隐藏的按钮
                        if (_index === null) {
                            btnEls[i].setAttribute('data-for-index', index)
                            btnEls[i].style.display = 'none'
                        }
                    }
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
.iframeVm {
  width: 100%;
  height: 100%;
  border-left: 1px solid #cdcdcd;;
  border-right: 1px solid #cdcdcd;;
  border-bottom: 1px solid #cdcdcd;;
  overflow-y: hidden;
  .result-area {
    width: 100%;
    height: calc(100% - 36px);
    overflow-y: auto;
    //background: #b3d4fc;
    .logBox {
      .logRow {
        border-bottom: 1px solid #5a5f73;
        padding: 7px 10px 5px;
        margin-bottom: 0;
        display: flex;

        &.error {
          background: rgba(255, 0, 0, 0.2) !important;
        }

        &.warn {
          background: rgba(235, 255, 0, 0.15);
        }

        .logItem {
          display: inline-block;
          margin-right: 10px;

          &.message {
            color: #fff;
            white-space: pre-wrap;

            &.string {
              color: #ce9178;
            }

            &.number {
              color: #b5cea8;
            }

            &.boolean,
            &.null,
            &.undefined {
              color: #569cd6;
            }

            &.symbol {
              color: #3dc9b0;
            }
            &.error {
              color: #b70b0b;
            }
          }

          &.json {
            line-height: 22px;
            color: #999999;
            padding-left: 20px;
            position: relative;

            /deep/ .expandBtn {
              position: absolute;
              left: 0;
              cursor: pointer;
              transform: rotateZ(90deg);
              transition: all 0.3s;
              line-height: 22px;

              &.shrink {
                transform: rotateZ(0deg);
              }
            }

            /deep/ .wrap {
              overflow: hidden;
            }

            /deep/ .object,
            /deep/ .array {
              margin-left: 20px;
            }

            /deep/ .bracket {
              color: #999999;
            }

            /deep/ .key {
              color: #e06c75;
            }

            /deep/ .colon {
              color: #999999;
              margin: 0 5px;
            }

            /deep/ .string,
            /deep/ .symbol {
              color: #98c379;
            }

            /deep/ .number {
              color: #d19a66;
            }

            /deep/ .boolean,
            /deep/ .null,
            /deep/ .undefined {
              color: #56b6c2;
            }
          }
        }
      }
    }
  }
  .header {
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #cdcdcd;;
    border-top: 1px solid #cdcdcd;;
    height: 36px;
    background: #fff;
    position: relative;
    .title {
      position: absolute;
      top: 19px;
      left: 1rem;
      font-weight: 600;
      font-size: 16px;
    }
  }
}
</style>
