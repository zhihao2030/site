<template>
  <div class="home">
    <div class="search animate__animated animate__fadeInLeft">
      <el-input placeholder="请输入内容" clearable v-model="key" @clear="init" style="width: 500px;" @keydown.native.enter="search">
        <el-button type="success" plain slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="content animate__animated animate__fadeInRight" v-for="module in itemList" :key="module.module.code">
      <div class="title">
        {{module.module.name}}：
      </div>
      <div class="list-item" v-for="item in module.list" :key="item.path">
        <el-tooltip :enterable="false"  class="item" effect="light" :content="item.description" placement="top">
          <el-link @click="$router.push(item.path)" style="font-size: 18px" target="_blank" class="ellipsis">{{item.name}}</el-link>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
    name: 'home',
    data: () => ({
        key: '',
        itemList: []
    }),
    computed: {
        ...mapState(['list','resultList','keyword']),
        ...mapGetters(['modules'])
    },
    created() {
        this.$store.commit('updateIsCheckSwitch',false)
        this.resultList.length ? this.getCache() : this.init()
    },
    watch: {
        key(v) {
            this.$store.commit('updateKeyword',v)
        }
    },
    methods: {
        search() {
            if (!this.key) return
            const key = this.key
            const cloneArr = JSON.parse(JSON.stringify(this.modules))
            this.itemList = cloneArr.filter(module=> {
                const arr = module.list.filter(({name,title,description,docName,codeNames})=>{
                    return this.checkInclude(key.toLowerCase(),codeNames,docName,name,title,description)
                })
                if(arr && arr.length) {
                    module.list = arr
                    return true
                } else {
                    return false
                }
            })
            this.$store.commit('updateResultList',this.itemList)
        },
        checkInclude(str,codeNamesArr,...arg) {
            const args = Array.from(arg).map(v=> {
                if (v) {
                    return v.toLowerCase()
                }
            })
            if (!args || !args.length) return
            let flag = false
            for(let i = 0; i<args.length; i++) {
                if(args[i] && args[i].toLowerCase().includes(str)) {
                    flag = true
                    break
                }
            }
            // todo 搜索文档
            // const docFlag = this.$store.state.docList(v=>{
            //
            // })
            return flag || (codeNamesArr && codeNamesArr.find(v=> v.toLowerCase().includes(str)))
        },
        init() {

            this.itemList = this.modules
            this.$store.commit('updateResultList',[])
        },
        getCache() {
            this.itemList = this.resultList
            this.key = this.keyword
        }
    }
}
</script>

<style scoped lang="less">
  .home {
    padding: 20px 30px;
    .search {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
    .content {
      padding: 30px;
      padding-top: 50px;
      display: flex;
      position: relative;
      flex-wrap: wrap;
      .title {
        position: absolute;
        top: 15px;
        left: 10px;
        font-weight: 700;
      }
      .list-item {
        width: 20%;
        margin-bottom: 20px;
        .ellipsis {
          overflow: hidden;//溢出隐藏
          white-space: nowrap;//禁止换行
          text-overflow: ellipsis;//...
        }
      }
    }
  }
</style>
