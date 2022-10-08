<template>
  <div class="intersection-observe">
    <div class="tip">
      禁用请求缓存，因为用的同一张网络图片
    </div>
      <div class="lazy-container" data-lazySrc="https://cdn.pixabay.com/photo/2016/08/17/01/39/mystery-1599527_960_720.jpg"  :data-key="item.id" v-for="item in list" :key="item.id">
        <img
            alt=""
            v-show="item.display"
            src=""
           />
        <div class="loading" v-loading="true" v-if="!item.display"></div>
      </div>
  </div>
</template>
<script>

export default {
    name: 'intersection-observe',
    data: ()=> ({
        list:[],
        observer: {},
        option: {
            root: null,
            rootMargin: '0px',
            threshold: 0
        },
        nodeList: []
    }),
    created() {
        this.init()
        for (let i = 0; i <= 50; i++) {
            this.list.push({
                id: i,
                display: false
            })
        }
    },
    mounted() {
        this.$nextTick(()=>{
            this.init()
        })
    },
    methods: {
        init() {
            this.observer =  new IntersectionObserver(this.observerCallback, this.options);
            this.startOb(this.getNodeList())
        },
        startOb(list) {
            list.forEach(v => this.observer.observe(v))
        },
        observerCallback(entries, observer) {
            // entries观察元素的所有元素信息, observer 被调用的 IntersectionObserve 实例
            entries.forEach(v=> {
                if (v.isIntersecting) {
                    const target = v.target
                    const img = v.target.childNodes[0]
                    const item = this.list[Number(v.target.dataset.key)]
                    img.src = target.dataset.lazysrc
                    item.display = true
                    observer.unobserve(target)
                }
            })

        },
        getNodeList() {
            return  document.querySelectorAll('.lazy-container')
        }
    }
}
</script>

<style scoped lang="less">
.intersection-observe {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .tip {
    margin: 30px 0;
    font-size: 16px;
    font-weight: 700;
  }
  .lazy-container {
    flex-shrink: 0;
    width: 400px;
    height: 400px;
    margin-bottom: 20px;
    img,.loading {
      width: 100%;
      height: 100%;
    }
    .loading {
      border: 1px solid #c0c0c0;
    }
  }
}
</style>
