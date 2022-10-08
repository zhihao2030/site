// /public/console/index.js

// 重写的console对象的构造函数，直接修改console对象的方法进行拦截的方式是不行的，有兴趣可以自行尝试
function ProxyConsole() {}
// 拦截console的所有方法
[
    'debug',
    'clear',
    'error',
    'info',
    'log',
    'warn',
    'dir',
    'props',
    'group',
    'groupEnd',
    'dirxml',
    'table',
    'trace',
    'assert',
    'count',
    'markTimeline',
    'profile',
    'profileEnd',
    'time',
    'timeEnd',
    'timeStamp',
    'groupCollapsed'
].forEach((method) => {
    let originMethod = console[method]
    // 设置原型方法
    ProxyConsole.prototype[method] = function (...args) {
        // 发送信息给父窗口
        // 针对特定方法进行参数预处理
        let res = handleArgs(method, args)
        // 没有输出时就不发送信息
        if (res.args) {
            window.parent.postMessage({
                type: 'console',
                method: res.method,
                data: res.args.map((item) => {
                    return handleData(item)
                }),
                res:res.args
            })
        }
        // 调用原始方法
        originMethod.apply(ProxyConsole, args)
    }
})
// 覆盖原console对象
window.console = new ProxyConsole()
// 错误监听
window.onerror = function (message, source, lineno, colno, error) {
    window.parent.postMessage({
        type: 'console',
        method: 'string',
        data: [message, source, lineno, colno, error].map((item) => {
            return handleData(item)
        })
    })
}
window.addEventListener('unhandledrejection', err => {
    window.parent.postMessage({
        type: 'console',
        method: 'string',
        data: [handleData(err.reason.stack)]
    })
})


// 处理数据
const handleData = (content) => {
    let contentType = type(content)
    switch (contentType) {
    case 'boolean': // 布尔值
        content = content ? 'true' : 'false'
        break;
    case 'null': // null
        content = 'null'
        break;
    case 'undefined': // undefined
        content = 'undefined'
        break;
    case 'symbol': // Symbol，Symbol不能直接通过postMessage进行传递，会报错，需要转成字符串
        content = content.toString()
        break;
    case 'function':
        content = content.toString()
        break;
    case 'array': // 数组
    case 'object': // 对象
        content = stringify(content, false, true, [])
        break;
    default:
        break;
    }
    return {
        contentType,
        content,
    }
}

function type(v) {
    return Object.prototype.toString.call(v).split(' ')[1].replace(']','').trim().toLowerCase()

}

// 序列化json数据变成html字符串
/*
    data:数据
    hasKey：是否是作为一个key的属性值
    isLast：是否在所在对象或数组中的最后一项
    visited：已经遍历过的对象/数组，用来检测循环引用
*/
const stringify = (data, hasKey, isLast, visited) => {
    let contentType = type(data)
    let str = ''
    let len = 0
    let lastComma = isLast ? '' : ',' // 当数组或对象在最后一项时，不需要显示逗号
    switch (contentType) {
    case 'object': // 对象
        // 检测到循环引用就直接终止遍历
        if (visited.includes(data)) {
            str += '<span class="string">检测到循环引用</span>'
        } else {
            visited.push(data)
            let keys = Object.keys(data)
            len = keys.length
            // 空对象
            if (len <= 0) {
                // 如果该对象是作为某个属性的值的话，那么左括号要和key显示在同一行
                str += hasKey ? `<span class="bracket">{ }${lastComma}</span>` : `<div class="bracket">{ }${lastComma}</div>`
            } else { // 非空对象
                // expandBtn是展开和收缩按钮
                str += '<span class="el-icon-arrow-right expandBtn"></span>'
                str += hasKey ? '<span class="bracket">{</span>' : '<div class="bracket">{</div>'
                // 这个wrap的div用来实现展开和收缩功能
                str += '<div class="wrap">'
                // 遍历对象的所有属性
                keys.forEach((key, index) => {
                    // 是否是数组或对象
                    let childIsJson = ['object', 'array'].includes(type(data[key]))
                    // 最后一项不显示逗号
                    str += `
                            <div class="objectItem">
                                <span class="key">"${key}"</span>
                                <span class="colon">:</span>
                                ${stringify(data[key], true, index >= len - 1, visited)}${index < len - 1 && !childIsJson ? ',' : ''}
                            </div>`
                })
                str += '</div>'
                str += `<div class="bracket">}${lastComma}</div>`
            }
        }
        break;
    case 'array': // 数组
        if (visited.includes(data)) {
            str += '<span class="string">检测到循环引用</span>'
        } else {
            visited.push(data)
            len = data.length
            // 空数组
            if (len <= 0) {
                // 如果该数组是作为某个属性的值的话，那么左括号要和key显示在同一行
                str += hasKey ? `<span class="bracket">[ ]${lastComma}</span>` : `<div class="bracket">[ ]${lastComma}</div>`
            } else { // 非空数组
                str += '<span class="el-icon-arrow-right expandBtn"></span>'
                str += hasKey ? '<span class="bracket">[</span>' : '<div class="bracket">[</div>'
                str += '<div class="wrap">'
                data.forEach((item, index) => {
                    // 最后一项不显示逗号
                    str += `
                            <div class="arrayItem">
                            	${stringify(item, true, index >= len - 1, visited)}${index < len - 1 ? ',' : ''}
                            </div>`
                })
                str += '</div>'
                str += `<div class="bracket">]${lastComma}</div>`
            }
        }
        break;
    default: // 其他类型
        let res = handleData(data)
        let quotationMarks = res.contentType === 'string' ? '\"' : '' // 字符串添加双引号
        str += `<span class="${res.contentType}">${quotationMarks}${res.content}${quotationMarks}</span>`
        break;
    }
    return str
}


const handleArgs = (method, contents) => {

    // 处理占位符
    if (contents.length > 0) {
        if (type(contents[0]) === 'string') {
            // 只处理%s、%d、%i、%f、%c
            let match = contents[0].match(/(%[sdifc])([^%]*)/gm) // "%d年%d月%d日" -> ["%d年", "%d月", "%d日"]
            if (match) {
                // 后续参数
                let sliceArgs = contents.slice(1)
                let strList = []
                // 遍历匹配到的结果
                match.forEach((item, index) => {
                    let placeholder = item.slice(0, 2)
                    let arg = sliceArgs[index]
                    // 对应位置没有数据，那么就原样输出占位符
                    if (arg === undefined) {
                        strList.push(item)
                        return
                    }
                    let newStr = ''
                    switch (placeholder) {
                    // 字符串，此处为简单处理，实际和chrome控制台的输出有差异
                    case '%s':
                        newStr = String(arg) + item.slice(2)
                        break;
                        // 整数
                    case '%d':
                    case '%i':
                        newStr = (type(arg) === 'number' ? parseInt(arg) : 'NaN') + item.slice(2)
                        break;
                        // 浮点数
                    case '%f':
                        newStr = (type(arg) === 'number' ? arg : 'NaN') + item.slice(2)
                        break;
                        // 样式
                    case '%c':
                        newStr = `<span style="${arg}">${item.slice(2)}</span>`
                        break;
                    default:
                        break;
                    }
                    strList.push(newStr)
                })
                contents = strList
                // 超出占位数量的剩余参数也不能丢弃，需要展示
                if (sliceArgs.length > match.length) {
                    contents = contents.concat(sliceArgs.slice(match.length))
                }
            }
        }
    }


    // 处理方法
    switch (method) {
    // 只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果
    case 'assert':
        if (contents[0]) {
            contents = null
        } else {
            method = 'error'
            contents = ['Assertion failed: ' + (contents[1] || 'console.assert')]
        }
        break;
    default:
        break;
    }
    return {
        method,
        args: contents
    }
}
