import Vue from 'vue'
import editInput from '@views/projectMethods/editTable/editComponents/edit-input.vue';
import editSpan from '@views/projectMethods/editTable/editComponents/edit-span.vue';

console.log(editInput)
const InputConstructor = Vue.extend(editInput) // // 继承组件对象input构造函数，实例化生成组件对象
const SpanConstructor = Vue.extend(editSpan) // // 继承组件对象input构造函数，实例化生成组件对象

export {
    InputConstructor,
    SpanConstructor
}
