const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const cors = require('koa2-cors');
const mimes = {
    css: 'text/css',
    less: 'text/css',
    gif: 'image/gif',
    html: 'text/html',
    ico: 'image/x-icon',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    js: 'text/javascript',
    json: 'application/json',
    pdf: 'application/pdf',
    png: 'image/png',
    svg: 'image/svg+xml',
    swf: 'application/x-shockwave-flash',
    tiff: 'image/tiff',
    txt: 'text/plain',
    wav: 'audio/x-wav',
    wma: 'audio/x-ms-wma',
    wmv: 'video/x-ms-wmv',
    xml: 'text/xml',
}

// 获取文件的类型
function parseMime(url) {
    // path.extname获取路径中文件的后缀名
    let extName = path.extname(url)
    extName = extName ? extName.slice(1) : 'unknown'
    return mimes[extName]
}

// 将文件转成传输所需格式
const parseStatic = (dir) => {
    return new Promise((resolve) => {
        resolve(fs.readFileSync(dir), 'binary')
    })
}

const app = new Koa()


app.use(
    cors({
        origin: function(ctx) { // 设置允许来自指定域名请求
            if (ctx.url === '/test') {
                return '*'; // 允许来自所有域名请求
            }
            return 'http://localhost:8080'; // 只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
        credentials: true, // 是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的HTTP请求方法'
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] // 设置获取其他自定义字段
    })
);
app.use(async (ctx) => {
    const url = ctx.request.url

    // 强缓存 协商缓存 css 走强缓存，img走协商缓存

    if (url.includes('css')) {
        //  强缓存
        const time = new Date(Date.now() + 30000).toUTCString()
        ctx.set('Expires', time) // Expires设置过期时间 30s内都走缓存 而不会重新请求

        // 设置 Cache-Control 响应头
        ctx.set('Cache-Control', 'max-age=30')
        // cache-control跟expires效果差不多，只不过这两个字段设置的值不一样而已，前者设置的是秒数，后者设置的是毫秒数
    } else if (url.includes('image')) {
        /*
                强缓存不同的是，强缓存是在时效时间内，不走服务端，只走本地缓存；而协商缓存是要走服务端的，
        如果请求某个资源，去请求服务端时，发现命中缓存则返回304，否则则返回所请求的资源，
        第一次请求资源时，服务端会把所请求的资源的最后一次修改时间当成响应头中Last-Modified的值发到浏览器并在浏览器存起来
        第二次请求资源时，浏览器会把刚刚存储的时间当成请求头中If-Modified-Since的值，传到服务端，服务端拿到这个时间跟所请求
        的资源的最后修改时间进行比对
        比对结果如果两个时间相同，则说明此资源没修改过，那就是命中缓存，那就返回304，如果不相同，则说明此资源修改过了，
        则没命中缓存，则返回修改过后的新资源
        */
        // const ifModifiedSince = ctx.request.header['if-modified-since']
        // const fileStat = await getFileStat(filePath)
        // console.log(new Date(fileStat.mtime).getTime())
        // ctx.set('Cache-Control', 'no-cache')
        // ctx.set('Content-Type', parseMime(url))
        // // 比对时间，mtime为文件最后修改时间
        // if (ifModifiedSince === fileStat.mtime.toGMTString()) {
        //     ctx.status = 304
        // } else {
        //     ctx.set('Last-Modified', fileStat.mtime.toGMTString())
        //     ctx.body = await parseStatic(filePath)
        // }
    }

    if (url === '/') {
        // 访问根路径返回index.html
        ctx.set('Content-Type', 'text/html')
        ctx.body = await parseStatic(path.resolve(__dirname,'./index.html'))
    } else {
        const filePath = path.resolve(__dirname, `.${url}`)
        // 设置类型
        ctx.set('Content-Type', parseMime(url))

        // 设置传输
        ctx.body = await parseStatic(filePath)
        // 设置传输
        ctx.body = await parseStatic(filePath)
    }
})

app.listen(9898, () => {
    console.log('start at port 9898')
})
