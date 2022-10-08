<template>
    <div :class="['message-box',type]">
        <div class="inner">
          <header class="header">
            <h1 class="title">{{title}}</h1>
            <span @click="$messageBox.hide()">x</span>
          </header>
          <div class="content">
            {{content}}
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageBox',
    props: {
        title: {
            type: String,
            default: 'this is title'
        },
        content: String,
        type: {
            type: String,
            default: 'danger',
            validator(value) { //
                return [
                    'primary',
                    'success',
                    'warn',
                    'danger'
                ].includes(value)
                // 新
            }
        }
    }

}
</script>

<style scoped lang="less">
  .message-box {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
      .inner {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 500px;
        transform: translate(-50%, -50%);
        background: #fff;
        box-shadow: 1px 3px 5px #ededed;
        overflow: hidden;
        .header {
          height: 44px;
          padding: 0 10px;
          line-height: 44px;
          box-sizing: border-box;
          .title {
            font-size: 16px;
            font-weight: 700;
            float: left;
          }
          span {
            float: right;
            cursor: pointer;
          }
        }

        .content {
          padding: 20px;
          box-sizing: border-box;
        }
      }
    &.success {
      .header {
        background: green;
      }
    }
    &.primary {
      .header {
        background: skyblue;
      }
    }
    &.warn {
      .header {
        background: yellow;
      }
    }
    &.danger {
      .header {
        background: red;
      }
    }
  }
</style>
