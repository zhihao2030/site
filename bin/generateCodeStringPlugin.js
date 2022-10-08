const fs = require('fs');
const path = require('path')
const fileDatas = {};
const pathName = path.resolve(__dirname, '../src/views');
const pathName2 = path.resolve(__dirname, '../src/components');
function getFilesByDir(pathName) {
    const files = fs.readdirSync(pathName)
    for(var i = 0;i < files.length;i ++){
        const file = fs.statSync(path.join(pathName, files[i]))
        if(file.isFile()){
            if (files[i].endsWith('.vue') && !files[i].includes('index')) {
                const fileData = fs.readFileSync(path.join(pathName, files[i]), 'utf-8')
                const name = files[i].replace('.vue','')
                fileDatas[name] = fileData
            }
        }else if(file.isDirectory()){
            getFilesByDir(path.join(pathName, files[i]))
        }
    }
}

getFilesByDir(pathName)
getFilesByDir(pathName2)
fs.writeFileSync(path.resolve(__dirname,'../templateData.json'),JSON.stringify(fileDatas))
