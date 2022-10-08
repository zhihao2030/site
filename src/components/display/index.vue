<template>
    <div class="display">
      <el-page-header @back="goBack" :content="content" />
      <div class="check-code" v-if="codeList.length">
        <el-button size="small" type="success" plain @click="drawer = true">查看源码</el-button>
      </div>
      <div class="switch-btn" v-if="$route.meta.docName">
       <el-switch
           v-model="check"
           @change="switchChange"
           active-text="查看文档"
           inactive-text="UI效果" />
     </div>
      <div class="base-info note-card">
        <el-card class="box-card" style="width: 100%; margin-bottom: 20px">
          <div class="inner">
            <div>
              {{description}}
            </div>
            <div class="go" v-if="juejin">
              <el-tooltip class="item" effect="light" content="掘金资料" placement="top">
                <el-button type="danger" icon="el-icon-loading" circle @click="toJ"></el-button>
              </el-tooltip>
            </div>
          </div>
        </el-card>

      </div>
      <div class="animate__animated animate__fadeInUp" v-show="!check">
          <router-view >
            <!-- todo: 未生效问题 -->
          </router-view>
        </div>
      <docTab class="animate__animated animate__fadeInDown" :list="list || []" v-show="check && list"></docTab>
      <div class="error" v-show="check && !list">
        {{this.error}}
      </div>
      <el-backtop target=".display" />

      <el-drawer
          title="源码查看"
          size="100%"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose">
        <div class="content">
          <codeTab :list="codeList"/>
        </div>
      </el-drawer>
    </div>
</template>

<script>
import docTab from '@components/docTab/docTab.vue';
import codeTab from '@/components/codeTab/codeTab'
export default {
    name: 'display',
    computed: {
        content() {
            return String(this.$route.meta.title)
        },
        description() {
            return String(this.$route.meta.description)
        },
        juejin() {
            return this.$route.meta.juejin
        },
        list() {
            const fileName = this.$route.meta.docName
            if (fileName) {
                const flag = this.$store.state.docList.find(v=> v.docName === fileName.replace('.md',''))
                if (flag) {
                    return flag.mdFile
                } else {
                    this.error= '未配置文档md文件！'
                    return ''
                }
            } else {
                return false
            }
        },
        codeList() {
            let data = []
            if (this.$route.meta.codeNames?.[0]) {
                this.$route.meta.codeNames.forEach(v => {
                    this.$store.state.codeList[v] && data.push({name: v,value:this.$store.state.codeList[v]})
                })

            }
            return data
        }
    },
    data: () => ({
        check: false,
        error: '',
        drawer: false,
        direction: 'rtl',
    }),
    components: {
        docTab,
        codeTab
    },
    created() {

    },
    methods: {
        handleClose(done) {
            done()
        },
        toJ() {
            window.open(this.juejin)
        },
        goBack() {
            this.$router.go(-1)
        },
        switchChange(e) {
            this.$store.commit('updateIsCheckSwitch',e)
        }
    }
}
</script>

<style scoped lang="less">
  .display {
    height: calc(100vh - 40px);
    padding: 20px 30px;
    //overflow-y: auto;
    overflow-y: overlay; // 解决滚动条压缩宽度问题
    position: relative;
    .switch-btn {
     position: absolute;
      right: 40px;
      top: 20px;
    }
    .check-code {
      position: absolute;
      right: 240px;
      top: 14px;
    }
    .base-info {
      margin-top: 16px;
    }
    .inner {
      display: flex;
      align-items: center;
      .go {
        margin-left: auto;
      }
    }
  }
</style>
