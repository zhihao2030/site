const obj = {
    a: 1,
    b: {
        c: 2,
        d:3
    }
}
let arr = [1,2,3,4,{a:1,b:2}]
function isObj(v) {
    return Object.prototype.toString.call(v) === '[object Object]'
}

function isArr(v) {
    return Object.prototype.toString.call(v) === '[object Array]'
}

function deepClone3(target) {
    if (typeof target === "object" && target !== null) {
        let result = Array.isArray(target) ? [] : {};
        if (Array.isArray(target)) {
            target.forEach((item, index) => {
                result[index] = deepClone4(item);
            });
        } else {
            Object.keys(target).forEach((key) => {
                result[key] = deepClone4(target[key]);
            });
        }
        return result;
    } else {
        return target;
    }
}

function deepClone4(target) {
    // map解决循环引用的问题
    const map = new Map(); // 用map将已经访问过得对象存起来
    const clone = (obj) => {
        // 如果是已经访问过得对象，直接返回  避免循环引用导致栈溢出

        if (map.has(obj)) {
            return obj;
        }
        if (obj === null || typeof obj !== "object") return obj;
        if (obj instanceof Boolean) return new Boolean(obj.valueOf());
        if (obj instanceof Number) return new Number(obj.valueOf());
        if (obj instanceof String) return new String(obj.valueOf());
        if (obj instanceof RegExp) return new RegExp(obj.valueOf());
        if (obj instanceof Date) return new Date(obj.valueOf());
        let cpObj = obj instanceof Array ? [] : {};
        map.set(obj, 1);
        for (let key in obj) {
            cpObj[key] = clone(obj[key]);
        }
        return cpObj;
    };
    return clone(target);
}

function deepClone(obj) {
    let copy = {}
    let arr = []
    if (isObj(obj)) {
        const keys = Object.keys(obj)
        keys.forEach(e=>{
            if (isObj(obj[e]) || isArr(obj[e])) {
                copy[e] =  deepClone(obj[e])
            } else {
                copy[e] = obj[e]
            }

        })
        return  copy
    } else if(isArr(obj)){
        obj.forEach((e,index)=>{
            if (isObj(e) || isArr(e)) {
                arr[index] = deepClone(e)
            } else{
                arr[index] = (e)
            }
        })
        return arr
    }

}
const t = {a:1}

function thisFn() {
    console.log(this)
}
thisFn.call(t)
