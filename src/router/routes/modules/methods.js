const module = {
    code: 'projectMethods',
    name: '项目常用方法',
    sort: 1
}

export default [
    {
        path: 'tabsLevelTwo',
        name: 'tabsLevelTwo',
        component: () => import('@views/projectMethods/tabsLevelTwo/tabsLevelTwo.vue'),
        meta: {
            module,
            title: '两级控制tabs切换',
            description: '两级控制tabs切换',
            name: 'tabsLevelTwo',
            juejin: '',
            codeNames: ['tabsLevelTwo','tab1','tab2','tab3']
        }
    },
    {
        path: 'onlineEchart',
        name: 'onlineEchart',
        component: () => import('@/views/projectMethods/editEchart/editEchart'),
        meta: {
            module,
            title: '在线编辑echart',
            description: '提供多个chart例子，并实现在线调试',
            name: 'onlineEchart',
            juejin: 'https://www.isqqw.com/'
        }
    },
    {
        path: 'speedyDate',
        name: 'speedyDate',
        component: () => import('@views/projectMethods/speedyDate/speedyDate.vue'),
        meta: {
            module,
            title: '快捷日期选择器',
            description: '封装快捷日期选择器',
            name: 'speedyDate',
            juejin: ''
        }
    },
    {
        path: 'card',
        name: 'card',
        component: () => import('@views/projectMethods/card/card.vue'),
        meta: {
            module,
            title: '拖拽，抛卡片',
            description: '未完成',
            name: 'card',
            juejin: ''
        }
    },
    {
        path: 'virtualScrollTable',
        name: 'virtualScrollTable',
        component: () => import('@views/projectMethods/virtualScrollTable/virtualScrollTable'),
        meta: {
            module,
            title: 'virtualScrollTable（虚拟滚动表格）',
            description: '基于el-table 的虚拟滚动表格，用于大量数据渲染',
            name: 'virtualScrollTable',
            juejin: 'https://element.eleme.cn/2.11/#/zh-CN/component/table',
            codeNames: ['virtualScrollTable'],
            docName: 'virtualScrollTable'
        }
    },
    {
        path: 'fileView',
        name: 'fileView',
        component: () => import('@views/projectMethods/fileView/fileView'),
        meta: {
            module,
            title: 'fileView',
            description: '实现word、excel、pdf、ppt、mp4、图片、文本等文件的预览',
            name: 'fileView',
            // juejin: 'https://element.eleme.cn/2.11/#/zh-CN/component/table',
            codeNames: ['fileView'],
            docName: 'virtualScrollTable'
        }
    },
    {
        path: 'editTable',
        name: 'editTable',
        component: () => import('@views/projectMethods/editTable/editTable'),
        meta: {
            module,
            title: 'editTable',
            description: 'Vue.extend 实现双击编辑表格',
            name: 'editTable',
            codeNames: ['editTable','edit-input','edit-span'],
            docName: 'Vue-extend'
        }
    },
    {
        path: 'animate-clock',
        name: 'animate-clock',
        component: () => import('@views/projectMethods/animate-clock/animate-clock'),
        meta: {
            module,
            title: 'animate-clock',
            description: 'Vue组件-卡片动画倒计时',
            name: 'animate-clock',
            codeNames: ['animate-clock','time-clock','animate-card'],
            docName: ''
        }
    },
    {
        path: 'input-toolTip',
        name: 'input-toolTip',
        component: () => import('@views/projectMethods/input-toolTip/input-toolTip'),
        meta: {
            module,
            title: 'input-toolTip',
            description: '输入框超长toolTip',
            name: 'input-toolTip',
            codeNames: ['input-toolTip'],
            docName: ''
        }
    },
    {
        path: 'TinyMCE',
        name: 'TinyMCE',
        component: () => import('@views/projectMethods/TinyMCE/test'),
        meta: {
            module,
            title: 'TinyMCE',
            description: '富文本编辑器',
            name: 'TinyMCE',
            codeNames: ['TinyMCE'],
            docName: ''
        }
    },
    {
        path: 'vueEeditorWrap',
        name: 'vueEeditorWrap',
        component: () => import('@views/projectMethods/vueEeditorWrap/vueEeditorWrap'),
        meta: {
            module,
            title: 'vueEeditorWrap',
            description: '富文本编辑器UEditor',
            name: 'UEditor',
            codeNames: ['vueEeditorWrap'],
            docName: ''
        }
    },
]
