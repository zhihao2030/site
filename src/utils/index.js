// 检测类型
/**
 *
 * @param type 需要判断的
 * @param compare  需要比较的
 * @returns {string|boolean}
 */
export const  checkType = (type, compare) => {
    if (compare) {
        return Object.prototype.toString.call(type) ===  compare
    } else {
        return Object.prototype.toString.call(type)
    }
}
