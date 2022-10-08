const fs = require('fs')
const path = require('path')
let res = fs.readFileSync(path.resolve(__dirname,'./testMarkdown.vue'),'utf-8');
fs.writeFileSync(path.resolve(__dirname,'./testMarkdown.json'),JSON.stringify(res))


