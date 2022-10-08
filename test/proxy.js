// const obj = {a:1}
//
// const b = new Proxy(obj,{
//     get(target,key) {
//         console.log(target,key,55)fn
//         return target[key]
//     },
//     set(target, key, value) {
//         console.log('setset')
//         target[key] = value
//     }
// })
// console.log(b)

const interface = [true, true, true]

// 查询 吉林-山东 的车票是否已售空的接口
const requestJS = () => new Promise((res, rej) => {
    setTimeout(() => {
        // 请求成功(resolve)则代表车票未售空
        if (interface[0]) return res({ ticket: true, price: 530, destination: '吉林-山东' })
        // 请求成功(rejected)则代表车票已售空
        rej({ ticket: false, destination: '吉林-山东' })
    }, 1000)
})
// 查询 山东-云南 的车票是否已售空的接口
const requestSY = () => new Promise((res, rej) => {
    setTimeout(() => {
        if (interface[1]) return res({ ticket: true, price: 820, destination: '山东-云南' })
        rej({ ticket: false, destination: '山东-云南' })
    }, 1500)
})
// 查询 云南-海南 的车票是否已售空的接口
const requestYH = () => new Promise((res, rej) => {
    setTimeout(() => {
        if (interface[2]) return res({ ticket: true, price: 1500, destination: '云南-海南' })
        rej({ ticket: false, destination: '云南-海南' })
    }, 2000)
})
const noErrorAwait = async f => {
    try{
        const r = await f() // (A)
        generator.next({flag: true, data: r})
        return {flag: true, data: r}
    }catch(e) {
        return {flag: false, data: e}
    }
}

const getInfo = function*() {
    const js = yield  noErrorAwait(requestJS) // (B)
    console.log(`${js.data.price}`)
    const sy = yield noErrorAwait(requestSY) // (C)
    console.log(`${sy.data.price}`)
    const yh = yield noErrorAwait(requestYH) // (D)
    console.log(`${yh.data.price}`)
}

const generator = getInfo()
generator.next()

const asyncList = [requestJS,requestSY,requestYH]


const combineAsyncError = tasks => {
    const doGlide = {}
    const handler = res => {
        doGlide.out = res
        // 预先定义好生成器
        doGlide.node = (function*(){
            const { out, data } = doGlide
            const len = tasks.length
            // yield把循环带回了JavaScript
            while(doGlide.times < len)
                yield noErrorAwait(tasks[doGlide.times++])
            // 全部请求成功(生成器执行完毕)时，返回数据
            out(data)
        })()
        doGlide.node.next()
    }
    return new Promise(res => handler(res))
}


combineAsyncError(asyncList)
    .then(data => {
        console.log('请求结果为：', data)
    })

