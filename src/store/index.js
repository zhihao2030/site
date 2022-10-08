import Vue from 'vue'
import Vuex from 'vuex'
import templateData from '../../templateData.json'
// 使用vuex
Vue.use(Vuex)

// 导出store
export default new Vuex.Store({
    state: {
        list: [],
        codeList: templateData,
        isCheckSwitch: false,
        docList: [],
        resultList: [],
        keyword: ''
    },
    getters: {
        modules(state) {
            let res = []
            state.list.forEach(v=> {
                const flag = res.find(m=> m.module.code === v.module.code)
                if (!flag) {
                    res.push({
                        module:v.module,
                        list: [v]
                    })

                } else {
                    flag.list.push(v)
                }
            })
            res.sort((a,b)=>{
                return a.module.sort - b.module.sort
            })
            return res
        },
    },
    // 组件通过dispatch方法触发actions里面的countAdd方法，然后actions提交mutations里面的countAdd方法。
    actions: {
        // 接收组件传过来的参数num，Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
        updateList(context,list){
            context.commit('updateList', list)
        },
        updateIsCheckSwitch(context,value) {
            context.commit('updateIsCheckSwitch', value)
        },
        updateDocList(context,value) {
            context.commit('updateDocList', value)
        },
        updateCodeList(context,value) {
            context.commit('updateDocList', value)
        },
        updateResultList(context,value) {
            context.commit('updateDocList', value)
        },
        updateKeyword(context,value) {
            context.commit('updateDocList', value)
        },
    },
    mutations: {
        // 传入一个state对象，接收传过来的参数num
        updateList(state, list){
            state.list = list
        },
        updateIsCheckSwitch(state,value) {
            state.isCheckSwitch = value
        },
        updateDocList(state,value) {
            state.docList = value
        },
        updateCodeList(state,value) {
            state.codeList = value
        },
        updateResultList(state,value) {
            state.resultList = value
        },
        updateKeyword(state,value) {
            state.keyword = value
        }
    }
})
