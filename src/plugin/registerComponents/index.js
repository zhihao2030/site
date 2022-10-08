
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
    // 其组件目录的相对路径
    '@/components',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /\.vue$/
)

const components = []
requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)

    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
        camelCase(
            // 使用 组件 name 属性来确定标签名
            componentConfig.default.name
        )
    )
    console.log(componentName)
    // 全局注册组件
    if (!componentConfig.default.isNotGlobal) {
        components.push({name:componentName, component: componentConfig.default || componentConfig})
    }
})

export default {
    install: function (Vue) {
        components.forEach(({name, component}) => Vue.component(name, component))
    }
}
