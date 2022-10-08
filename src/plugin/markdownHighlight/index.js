import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'
// 如果开启了typescript 需要额外安装 npm install @types/highlight.js
// 通过 import * as hljs from 'highlight.js' 引入
export default {
    install(Vue) {
        Vue.directive('highlight', function (el) {
            const blocks = el.querySelectorAll('pre codeEditor')
            blocks.forEach(block => {
                hljs.highlightElement(block)
            })
        })
    }
}
