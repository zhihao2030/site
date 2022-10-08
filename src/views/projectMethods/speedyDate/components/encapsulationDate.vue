<template>
  <div class="block">
    <!--    <span class="demonstration">选择日期：</span>-->
    <el-date-picker
        v-model="value"
        ref="datePick"
        type="daterange"
        :format ='format'
        :value-format='valueFormat'
        @change="change"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
    </el-date-picker>
  </div>

</template>

<script>
export default {
    name: 'encapsulationDate',
    props: {
        format: {
            type: String,
            default: 'yyyy/MM/dd'
        },
        valueFormat: {
            type: String,
            default: 'yyyy-MM-dd'
        },
        pickerOptions: {
            type: Object,
            default: () => {
                return {
                    shortcuts: [
                        {
                            text: '今年以来',
                            onClick (picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setDate(1)
                                start.setMonth(0)
                                picker.$emit('pick', [start, end])
                            }
                        },
                        {
                            text: '近一年',
                            onClick (picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
                                picker.$emit('pick', [start, end])
                            }
                        },
                        {
                            text: '近半年',
                            onClick (picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
                                picker.$emit('pick', [start, end])
                            }
                        }, {
                            text: '近三月',
                            onClick (picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                                picker.$emit('pick', [start, end])
                            }
                        },
                        {
                            text: '近一个月',
                            onClick (picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                                picker.$emit('pick', [start, end])
                            }
                        },
                        {
                            text: '近两周',
                            onClick (picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 14)
                                picker.$emit('pick', [start, end])
                            }
                        }
                    ]
                }
            }
        }
    },
    data () {
        return {
            value: ''
        }
    },
    created () {
        this.value = this.getNowTime()
    },
    methods: {
        change (e) {
            this.$emit('change', e)
            // 保证在选择完时间后，日期弹出框不会消失
            /* this.$refs.datePick.focus();
            this.value = e;*/
        },
        // 初始默认执行(重点)
        getNowTime () {
            const start = new Date(new Date().getTime() - 3600 * 1000 * 1)
                .toISOString()
                .replace('T', ' ')
                .split('.')[0]
            const end = new Date(new Date().getTime() + 3600 * 1000 * 24 * 365)
                .toISOString()
                .replace('T', ' ')
                .split('.')[0]
            return [start, end]
        }
    }
}
</script>

<style>

</style>
