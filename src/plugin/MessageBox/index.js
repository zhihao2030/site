// 用Vue.extend 扩展组件
// 1. 脱离根节点。
// 2。 脱离app实例
// 3。 组件类通this调用
import _MessageBox from './MessageBox';

export default {
    install(Vue) { // Vue.extend
        // mesBOx 实例
        let messageBox = null
        Vue.component(_MessageBox.name,_MessageBox)

        Vue.prototype.$messageBox = {
            show,
            hide,
            primary,
            error
        }

        function show(props,callback) {
            if(!messageBox) {
                // 创建构造器
                const MessageBox = Vue.extend({ // 会继承vue的所有东西，Vue构造函数的子类
                    render(h) {
                        return h('message-box',{
                            props
                        })
                    }
                })
                console.log(MessageBox)
                // 实例化
                messageBox = new MessageBox()
                console.log(messageBox)
                this.vm = messageBox.$mount()
                console.log(this.vm)
                document.body.appendChild(this.vm.$el)
                callback && callback()
            }

        }
        function hide(callback) {
            document.body.removeChild(this.vm.$el)
            messageBox.$destroy()
            messageBox = null
            this.vm = null
            callback && callback()
        }
        function primary(props,callback) {
            this.show({...props,type: 'primary'},callback)
        }
        function error(props,callback) {
            this.show({...props,type: 'danger'},callback)
        }
    }
}
