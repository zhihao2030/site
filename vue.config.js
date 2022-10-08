const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
    publicPath: '/',  // 基本路径
    outputDir: 'dist',
    // 构建时的输出目录
    assetsDir: 'public', // 放置静态资源的目录
    indexPath: 'index.html', // html 的输出路径
    filenameHashing: true, // 文件名哈希值
    lintOnSave: false, // 是否在保存的时候使用 `eslint-loader` 进行检查。

    // 组件是如何被渲染到页面中的？ （ast：抽象语法树；vDom：虚拟DOM）
    // template ---> ast ---> render ---> vDom ---> 真实的Dom ---> 页面
    // runtime-only：将template在打包的时候，就已经编译为render函数
    // runtime-compiler：在运行的时候才去编译template
    runtimeCompiler: true,

    transpileDependencies: [], // babel-loader 默认会跳过 node_modules 依赖。
    productionSourceMap: false, // 是否为生产环境构建生成 source map

    // 调整内部的 webpack 配置 用configureWebpack简单的配置；用chainWebpack做高级配置；包括对loader的添加，修改；以及插件的配置z
    configureWebpack:  {
        optimization:{
            splitChunks:{
                chunks: 'all',
                minSize: 60000,
                maxAsyncRequests: 10,
                maxInitialRequests: 3,
                enforceSizeThreshold: 50000,
                maxSize: 0,
                cacheGroups:{ // 提取公共代码
                    // 注意:
                    // 这里的key命名自定义
                    // priority：值越大优先级越高
                    // chunks指定哪些模块需要打包，可选值有
                    //  * initial: 初始块
                    //  * async: 按需加载块(默认)
                    //  * all: 全部块

                    // common: 打包业务中公共代码（上面的tools.js）
                    common: {
                        name: 'common', // 指定包名，不指定时使用上层key作为包名
                        chunks: 'all',
                        minSize: 10,
                        priority: 0
                    },
                    // vendor: 打包node_modules中的文件（上面的 lodash）
                    vendor: {
                        name: 'vendor',
                        test: /node_modules/,
                        chunks: 'all',
                        priority: 10
                    },
                    // monacoEditor: {
                    //     chunks: 'async',
                    //     name: 'chunk-monaco-editor',
                    //     priority: 22,
                    //     test: /[\/]node_modules[\/]monaco-editor[\/]/,
                    //     enforce: true,
                    //     reuseExistingChunk: true,
                    // },
                }
            },
            usedExports:true,
            minimize:true
        },
        module: {
            rules: [
                // 配置读取 *.md 文件的规则
                {
                    test: /\.md$/,
                    use: [ // markdown-loader、html-loader是为了让vue能够解析md格式的文件
                        { loader: 'html-loader' },
                        { loader: 'markdown-loader', options: {} }
                    ]
                }
            ]
        },
        plugins:[
            // new MonacoWebpackPlugin({
            //     languages: ['javascript'],
            // }),
            new MiniCssExtractPlugin(), // 提取css公共代码
            // new BundleAnalyzerPlugin(),
        ],
        externals: {
            'echarts': 'echarts',
            'monacoEditor': 'monaco-editor'
        }
    },

    chainWebpack: (config) => {
        config.resolve.symlinks(true); // 修复热更新失效
        // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
        config.plugin('html').tap(args => {
            // 修复 Lazy loading routes Error
            args[0].chunksSortMode = 'none';
            return args;
        });
        config.resolve.alias // 添加别名
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@store', resolve('src/store'));
    },

    // 配置 webpack-dev-server 行为。
    devServer: {
        open: true, // 编译后默认打开浏览器
        host: 'localhost',  // 域名
        port: 8080,  // 端口
        // proxy: {
        //     '/api': {
        //         target: 'http://127.0.0.1:10001',
        //         changeOrigin: true, // 是否跨域
        //         ws: false, // 是否支持 websocket
        //         secure: false, // 如果是 https 接口，需要配置这个参数
        //         pathRewrite: { // 可以理解为一个重定向或者重新赋值的功能
        //             '^/api': ''    // '^/api': '/'    这种接口配置出来     http://127.0.0.1:10001/login
        //         }               // '^/api': '/api'  这种接口配置出来     http://127.0.0.1:10001/api/login
        //     }
        // }
    }
}


/*
*
* 压缩代码
实现删除多余的代码、注释、简化代码的写法等⽅式。


压缩JS：
Webpack默认在生产环境下（mode:'production'）自动进行代码压缩，内部用的是terser-webpack-plugin插件，具体使用请查看官网


压缩css:
要压缩css，前提是先提取css到独立文件中（前面讲过），然后通过css-minimizer-webpack-plugin插件实现压缩CSS，该插件基于cssnano实现css代码的压缩优化

*
*
* Tree Shaking 也叫摇树优化，
* 是一种通过移除冗余代码，来优化打包体积的手段，它并不是webpack中的某个配置选项，而是一组功能搭配使用后的效果，基于ESModules模块化（即只有ESModules的模块化代码才能使Tree Shaking生效），在production生产环境下默认开启


 */
