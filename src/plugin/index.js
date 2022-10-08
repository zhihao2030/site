import Vue from 'vue';

const modules = require.context('.', true, /\.js$/);
modules.keys().forEach((key) => {
    if (key === './index.js') return
    Vue.use(modules(key).default)
})

