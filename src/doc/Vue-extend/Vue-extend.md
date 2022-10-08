### 1.Vue.extend
我们知道，无论哪种程序语言，或多或少都会有封装、继承、多态的思想，而Vue.extend方法就是Vue的一个用于继承组件的方法。官方是这样定义的：使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
构造器也可以理解为是一个类，既然是一个类，就可以去实例化对象，extend方法可以实例一个组件对象，而这个组件对象拥有我们最初定义的loading.vue所有属性和方法。所以我们将这个组件对象挂载到一个div上，让其有一个着落，即成为dom元素。

### 2.propsData
propsData对象用于给继承的组件传递参数，也可以传递一个函数，从而继承组件通过这个函数通知外部使用组件

```javascript
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

```
