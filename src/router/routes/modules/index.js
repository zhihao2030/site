const modules = require.context('.', false, /\.js$/);
const asyncRoutes = []

modules.keys().forEach((key) => {
    if (key === './index.js') return
    asyncRoutes.push(...modules(key).default)
})
export default asyncRoutes
