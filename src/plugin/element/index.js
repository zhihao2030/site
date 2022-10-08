import {
    Button,
    Select,
    PageHeader,
    Backtop,
    Card,
    Input,
    Link,
    Tooltip,
    Loading,
    Radio,
    RadioGroup,
    Icon,
    datePicker,
    Switch,
    Tabs,
    TabPane,
    Drawer,
    Option,
    Table,
    TableColumn
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import tableMixinsfrom from '../mixins/tableMinxin.js'

// 重置table数据流

delete Table.components.TableBody.computed.data

// 添加虚拟列表逻辑

Table.components.TableBody.mixins.push(tableMixinsfrom)
const components = [
    Button,
    Select,
    PageHeader,
    Backtop,
    Card,
    Input,
    Link,
    Tooltip,
    Loading,
    Radio,
    RadioGroup,
    Icon,
    datePicker,
    Icon,
    Switch,
    Tabs,
    TabPane,
    Drawer,
    Option,
    Table,
    TableColumn
]

export default {
    install: (Vue)=> {
        components.forEach(component => Vue.use(component))
    }
}
