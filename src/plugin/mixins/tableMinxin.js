export default {
    data () {
        return {
            visibleList: 0,
            offsetting: 0,
            Theight: 0,
            itemHeight: 0,
            isVirtual: false,
            start: 0,
            end: 0,
        }
    },
    computed: {
        data () {
            // 修改el-table加载数据逻辑
            if (this.isVirtual) {
                return this.table.tableData.slice(this.start, this.end)
            } else {
                return this.table.tableData
            }
        },
        tableKey() {
            return this.$parent.$attrs.tableKey
        },
        fixHeight () { // 少于10条不需要虚拟滚动
            return this.table.tableData.length > 10
        }
    },
    watch: {
        'table.tableData' :{
            handler(value) {
                if (this.isVirtual && this.fixHeight) {
                    console.log(this.isVirtual)
                    this.handleVirtualTable(value)
                }
            },
            immediate:true
        },
        isVirtual(v) {
            if (v) {
                this.handleVirtualTable(this.table.tableData)
            }
        }
    },
    beforeDestroy () {
        console.log('beforeDestroy')
        this.handleScroll = null
    },
    created () {
        console.log(4444,this.$parent)
        this.isVirtual = this.$parent.$attrs.isVirtual
        // 开启虚拟列表需要固定列表高度，默认500
        // 可动态设置Theight
        this.Theight = this.$parent.$attrs.Theight || 500
        this.itemHeight = this.$parent.$attrs.itemHeight || 42
    },
    mounted () {
        // 缩放浏览器时需要重新计算
        this.$nextTick(() => {
            console.log(this.isVirtual,555)
            if (this.isVirtual && this.fixHeight) {
                this.$parent.$el.classList.add(this.tableKey)
                //  :class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
                let scrollContainer = document.querySelector(`.${this.tableKey} .is-scrolling-none`)
                window.addEventListener('resize', () => {
                    scrollContainer.style.maxHeight = `${this.$parent.$attrs.Theight || 500}px` // 设置滚动区域高度
                    // 列表数据初始化（可见条数）
                    this.visibleList = Math.ceil(scrollContainer.clientHeight / this.itemHeight)
                    this.end = this.start + this.visibleList

                })
            }
        })
    },
    methods: {
        handleVirtualTable (data) { // 表格数据变化执行
            this.$nextTick(() => {
                // 表格添加唯一class
                if (!this.tableKey)  throw new Error('为未写tableKey值')
                this.$parent.$el.classList.add(this.tableKey)
                console.log(this.$parent.$el.classList)
                let
                    virtualDiv = document.querySelector(`#${this.tableKey}`),
                    tableBody = document.querySelector(`.${this.tableKey} .el-table__body`), // 表格体 主体区
                    scrollContainer = document.querySelector(`.${this.tableKey} .is-scrolling-none`) // 滚动区
                scrollContainer.scrollTop = 0
                scrollContainer.style.overflowY = 'auto'
                scrollContainer.style.maxHeight = `${this.Theight || 500}px`
                scrollContainer.addEventListener('scroll', this.handleScroll, true)

                // 虚拟空滚动列表，作用是出现滚动条，监听滚动计算真实大小
                if (!virtualDiv) {
                    virtualDiv = document.createElement('div')
                    virtualDiv.id = `${this.tableKey}`
                    virtualDiv.style.height = `${data.length * this.itemHeight}px`
                    scrollContainer.appendChild(virtualDiv)
                } else {
                    virtualDiv.style.height = `${data.length * this.itemHeight}px`
                }

                // 脱离虚拟列表 避免影响高度
                Object.assign(tableBody.style, {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                })

                this.end = this.visibleList = Math.ceil(
                    scrollContainer.clientHeight / this.itemHeight
                )
            })
        },
        handleScroll (event) {
            console.log(this.data,this.end,this.start,this.id)
            let scrollTop = event.target.scrollTop
            this.start = Math.floor(scrollTop / this.itemHeight)
            this.end = this.start + this.visibleList
            this.offsetting = scrollTop - (scrollTop % this.itemHeight)
            document.querySelector(`.${this.tableKey} .el-table__body`
            ).style.transform = `translateY(${this.offsetting}px)`
        },
    }
}
