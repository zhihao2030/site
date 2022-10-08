import markdownHighlight from '@components/displayMarkdown/displayMarkdown'
import code from '@components/codeEditor/codeEditor'
const list  = [markdownHighlight, code]
export default  {
    install(Vue) {
        list.forEach(v => Vue.component(v.name, v))
    }
}
