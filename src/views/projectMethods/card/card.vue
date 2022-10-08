<template>
  <div class="card-display-container" @mousedown.stop="mousedownCard" @mouseup.stop="mouseupCard">
    <div v-for="(card,index) in list" :key="index" :class="`card my-card-${index}`" :data-cardIndex="index" :style="getStyle(index)" ref="card">{{index}}</div>
  </div>
</template>

<script>
export default {
    name: 'card',
    data:()=>({
        cardsInfo: [],
        list: [
            {key:1},
            {key:2},
            {key:4},
            {key:4}
        ],
        cardStyle: {
            left: null,
            top: null
        },
        curPosition: {
            left: null,
            top: null
        },
        stopPosition:{
            left: null,
            top: null
        },
        isMousedown: false,
        throwDistance: 1000,
        throwTriggerDistance:100,
        isThrow:false
    }),
    computed:{
        angle() {
            return  Math.atan2((this.curPosition.left-0), (this.curPosition.top-0));
        },
        left() {
            return Math.cos(this.angle)*this.throwDistance;
        },
        top() {
            return Math.sin(this.angle)*this.throwDistance;
        },
    },
    methods: {
        getStyle(index) {
            return  this.cardsInfo?.[index] || {}
        },
        mousedownCard(v) {
            const {target: {classList,dataset: {cardindex}}} = v.target
            if (!Array.prototype.includes.call(classList,'card')) return // 判断是否点击card
            // get card current position
            const cardNode = this.$refs.card
            const left = cardNode?.offsetLeft
            const top = cardNode?.offsetTop
            const {clientX, clientY} = v
            let disX = clientX - left;
            let disY = clientY - top;
            this.curPosition.left = clientX
            this.curPosition.top = clientY
            document.onmousemove = (e)=>{
                // 鼠标按下并移动的事件
                // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;
                let top = e.clientY - disY;
                // 移动当前元素
                if(left < 0) {
                    left = 0
                }else if(left > window.innerWidth - cardNode.offsetWidth){
                    left = window.innerWidth - cardNode.offsetWidth
                }

                if(top < 0) {
                    top = 0
                }else if(top > window.innerHeight - cardNode.offsetHeight) {
                    top = window.innerHeight - cardNode.offsetHeight
                }
                this.curPosition.left = left
                this.curPosition.top = top
                this.cardStyle.left = left + 'px'
                this.cardStyle.top = top + 'px'
            };
            document.onmouseup = (e)=>{
                let distance=this.getDistance(0,0,this.curPosition.left,this.curPosition.top);
                console.log(distance,5)
                if(distance>this.throwTriggerDistance){
                    this.makeCardThrow();
                }else{
                    // this.makeCardBack();
                }
                document.onmousemove = null

            }
        },
        makeCardThrow() {
            console.log(this.angle)
            this.isThrow=true;
            this.cardStyle.left=Math.cos(this.angle)*this.throwDistance;
            this.cardStyle.top=Math.sin(this.angle)*this.throwDistance;
            console.log(this.cardStyle)
        },
        mouseupCard(v) {
            document.onmousemove = null
            const {clientX, clientY} = v
            this.stopPosition.left = clientX
            this.stopPosition.top = clientY
            const distance =this.getDistance(this.curPosition.left,this.curPosition.top,this.left,this.top);
            // if(distance>this.throwTriggerDistance){
            //     this.makeCardThrow();
            // }else{
            //     this.makeCardBack();
            // }
            this.isMousedown =false
        },
        // 计算两点之间的直线距离
        getDistance(x1, y1, x2, y2) {
            var _x = Math.abs(x1 - x2);
            var _y = Math.abs(y1 - y2);
            return Math.sqrt(_x * _x + _y * _y);
        }


    },
    mounted() {
    // console.log(this.$refs?.key.style)
    //   this.curPosition.left = this.$refs?.key?.style
    }
}
</script>

<style scoped lang="less">
.card-display-container {
  width: 100%;
  height: calc(100vh - 160px);
  position: relative;
  overflow: hidden;
  .card {
    width: 300px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    background: white;
    box-shadow: 0 0 17px rgb(0 0 0 / 31%);
    margin: -200px 0 0 -150px;
    text-align: center;
    line-height: 400px;
    font-size: 250px;
    cursor: pointer;
    user-select: none;
    opacity: 1;
    //transition: all 0.3s ease 0s;
  }
  .my-card-0 {
    margin-top: -230px;
    z-index: 3;
    transform: scale(1.1);
  }
  .my-card-1 {
    z-index: 2;
  }
  .my-card-2 {
    margin-top: -170px;
    z-index: 1;
    transform: scale(0.9);
  }
  .my-card-3 {
    margin-top: -140px;
    transform: scale(0.8);
  }
}
</style>
<!--
https://juejin.cn/post/6906143905922678797#heading-0
https://github.com/taoeer/card/blob/main/index.html
-->
