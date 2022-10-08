### 1.定义
IntersectionObserve 是浏览器提供的一个原生**构造函数**，它也被称作**交叉观察器。** 它可以观察我们的元素是否可见，也就是是否和可视区发生**交叉**

>**IntersectionObserver****接口** (从属于[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)) 提供了一种异步观察目标元素与其**祖先元素**或**顶级文档视窗**([viewport](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport))交叉状态的方法。祖先元素与视窗([viewport](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport))被称为**根(root)。**
https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver

![[Pasted image 20220509224406.png]]
### 2. 属性
#### 2.1 [`IntersectionObserver.root`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/root) 只读

所监听对象的具体祖先元素([`element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element))。如果未传入值或值为`null`，则默认使用顶级文档的视窗。

#### 2.2 [`IntersectionObserver.rootMargin`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/rootMargin) 只读

计算交叉时添加到**根(root)**边界盒[bounding box (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/bounding_box "Currently only available in English (US)")的矩形偏移量， 可以有效的缩小或扩大根的判定范围从而满足计算需要。此属性返回的值可能与调用构造函数时指定的值不同，因此可能需要更改该值，以匹配内部要求。所有的偏移量均可用**像素(pixel)**(`px`)或**百分比(percentage)**(`%`)来表达, 默认值为"0px 0px 0px 0px"。

#### 2.3 [`IntersectionObserver.thresholds`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/thresholds) 只读

一个包含阈值的列表, 按升序排列, 列表中的每个阈值都是监听对象的交叉区域与边界区域的比率。当监听对象的任何阈值被越过时，都会生成一个通知(Notification)。如果构造器未传入值, 则默认值为0。

### 3. 方法
### 3.1 [`IntersectionObserver.disconnect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/disconnect)

使`IntersectionObserver`对象停止监听工作。

### 3.2 [`IntersectionObserver.observe()`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/observe)

使`IntersectionObserver`开始监听一个目标元素。

### 3.3 [`IntersectionObserver.takeRecords()`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/takeRecords)

返回所有观察目标的[`IntersectionObserverEntry`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserverEntry)对象数组。

### 3.4 [`IntersectionObserver.unobserve()`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/unobserve)

使`IntersectionObserver`停止监听特定目标元素
### 2.使用
创建一个新的`IntersectionObserver`对象，当其监听到目标元素的可见部分穿过了一个或多个阈(thresholds)时，会执行指定的回调函数
创建一个 IntersectionObserver 对象，并传入相应参数和回调用函数，该回调函数将会在目标(**target**)元素和根(**root**)元素的交集大小超过阈值(**threshold**)规定的大小时候被执行。
```js
let options = {
  root: document.querySelector('#scrollArea'),
  // 指定根(**root**)元素，用于检查目标的可见性。必须是目标元素的父级元素。
  // 如果未指定或者为`null`，则默认为浏览器视窗。
  rootMargin: '0px',
  // 该属性值是用作 root 元素和 target 发生交集时候的计算交集的区域范围， 
  // 使用该属性可以控制 root 元素每一边的收缩或者扩张。默认值为0。
  threshold: 1.0
  
  // 阈值threshold为1.0意味着目标元素完全出现在 root 选项指定的元素中可见时，
  // 回调函数将会被执行（到设置的交叉比例 执行回调）
}

let observer = new IntersectionObserver(callback, options);
// callback 接受两个参数
//  
// observe。
```

![[Pasted image 20220509230431.png]]
**entries**：它是一个 IntersectionObserverEntry 对象数组 ，IntersectionObserverEntry 主要存储的是一些观察元素的信息，主要有以下 7 个属性：

> time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒  
> target：被观察的目标元素，是一个 DOM 节点对象  
> rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 null  
> boundingClientRect：目标元素的矩形区域的信息  
> `isIntersecting`：目标元素当前是否可见 Boolean 值 可见为 true  
> intersectionRect：目标元素与视口（或根元素）的交叉区域的信息  
> intersectionRatio：目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为 1，完全不可见时小于等于 0

  
**observer**：它返回的是被调用的 IntersectionObserve 实例，


创建一个 observer 后需要给定一个目标元素进行观察。


```js
let target = document.querySelector('#listItem');
observer.observe(target);

```

```js
<head>
  <style>
    .viewport {
      width: 300px;
      height: 200px;
      border: 1px solid blue;
      overflow: auto;
    }


    .box1 {
      height: 600px;
      width: 100%;
    }


    .observed {
      width: 100px;
      height: 100px;
      border: 1px solid green;
    }


    .imgs {
      width: 100px;
      height: 100px;
    }
  </style>
</head>


<body>
  <div class="viewport" id="viewport">
    <div class="box1">
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
      <img src="./place.jpg" data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg" alt="图片" class="imgs" />
    </div>
  </div>
</body>
<script>
  let viewport = document.getElementById("viewport"); // 可视区域
  let imgList = document.querySelectorAll(".imgs"); // 被观察元素


  let options = {
    root: viewport
  }
  let IO = new IntersectionObserver(IOCallback, options);


  // 循环所有 img 标签，使它被观察
  imgList.forEach((item) => {
    IO.observe(item)
  })


  // 回调函数
  function IOCallback(entries, observer) {
    // 循环所有观察元素
    entries.forEach(item => {
      // 如果出现在可视区内，则替换 src
      if (item.isIntersecting) {
        console.info("出现在可视区内")
        item.target.src = item.target.dataset.src  // 替换 src
        IO.unobserve(item.target)  
        // 停止观察当前元素 避免不可见时候再次调用 callback 函数*******
      }
    });
  }
</script>


```