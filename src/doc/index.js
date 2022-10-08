import store from '@/store'
const list = []

const modules = require.context('.', true, /\.md$/);
modules.keys().forEach((key) => {
    const keyArr = key.split('/')
    const mdName = keyArr[keyArr.length-1].replace('.md','')
    const docName = keyArr.length > 2 ? keyArr[1] : mdName
    const file = list.find(v=>  v.docName === docName)
    if (file) {
        file.mdFile.push({
            name: mdName,
            value: modules(key).default
        })
    } else {
        list.push({
            docName,
            mdFile: [
                {
                    name: mdName,
                    value: modules(key).default
                }
            ]
        })
    }
})
console.log(list)
store.commit('updateDocList',list)
