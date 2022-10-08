<template>
  <div class="tabsLevelTwo box-wrap-pd">
    <div class="tab-header">
      <div class="tabs">
        <el-button :type="cpData.key === item.key ? 'primary' : 'info'" @click="change(item)" class="item-margin-right" v-for="item in list" :key="item.key">{{item.name}}</el-button>
      </div>
      <div class="radio">
        <el-radio-group v-model="radio" @change="changeRadio">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">备选项111</el-radio>
          <el-radio :label="3">备选项222</el-radio>
          <el-radio :label="4">备选项222</el-radio>
        </el-radio-group>
      </div>
      <div class="content">
          <component
              :ref="cpData.name"
              :name="cpData.name"
              :radio="cpData.radioIns"
              :is="cpData.tab" />
      </div>
    </div>
  </div>
</template>

<script>
import tab1 from '@views/projectMethods/tabsLevelTwo/components/tab1';
import tab2 from '@views/projectMethods/tabsLevelTwo/components/tab2';
import tab3 from '@views/projectMethods/tabsLevelTwo/components/tab3';
export default {
    name: 'tabsLevelTwo',
    data: ()=> ({
        list: [
            {name: 'tab1',radioIns: 1, tab: tab1, key: 1},
            {name: 'tab2',radioIns: 1, tab: tab2,key: 2},
            {name: 'tab3',radioIns: 1, tab: tab3, key: 3},
        ],
        radio: 1,
        cpData: {
            tab: tab1,
            radioIns: 1,
            name: '',
            key: 1,
        }
    }),
    components: {
        tab1,
        tab2,
        tab3
    },
    mounted() {

    },
    methods: {
        changeRadio(v) {
            const tab = this.list.find(v=> v.key === this.cpData.key)
            // 记录当前tab的rado
            tab.radioIns = v
            this.cpData.radioIns = v
            setTimeout(()=>{
                const tabRef = this.$refs[tab.name]
                tabRef && tabRef.getList()
            })
        },
        change(item) {
            this.cpData = {...item}
            // 重置ui
            this.radio = item.radioIns
            // 发送请求
            setTimeout(()=>{
                const tabRef = this.$refs[item.name]
                tabRef && tabRef.getList()
            })
        }
    }
}
</script>

<style scoped lang="less">
.radio {
  margin: 20px 0;
}
</style>
