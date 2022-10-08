<template>
<div class="virtualScrollTable">
  <div class="btn">
    <el-button @click="show = !show">
      {{!show? '点击渲染无虚拟滚动10000' : '点击渲染虚拟滚动100000'}}
    </el-button>
  </div>
  <card title="使用虚拟滚动渲染100000条数据"  v-if="!show">
    <template #content>
      <el-table
          key="2"
          :isVirtual="true"
          :data="tableData"
          tableKey="testTable"
          Theight="500"
          :itemHeight="48"
          border
          style="width: 100%">
        <el-table-column
            prop="date"
            label="日期">
        </el-table-column>
        <el-table-column
            prop="date"
            label="日期">
        </el-table-column>
        <el-table-column
            prop="date"
            label="日期">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
      </el-table>
    </template>
  </card>

  <card title="不使用虚拟滚动渲染10000条数据" v-if="show">
    <template #content>
      <el-table
          key="1"
          :isVirtual="false"
          :data="tableData.slice(1,10000)"
          border
          height="500"
          style="width: 100%">
        <el-table-column
            prop="date"
            label="日期">
        </el-table-column>
        <el-table-column
            prop="date"
            label="日期">
        </el-table-column>
        <el-table-column
            prop="date"
            label="日期">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
      </el-table>
    </template>
  </card>
<!--isVirtual：开启虚拟列表； Theight： 表格高度； itemHeight: 表格行高；tableKey: 表格key（必填）    -->

</div>
</template>

<script>
export default {
    name: 'virtualScrollTable',
    data() {
        return {
            show: false,
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }]
        }
    },
    mounted() {
        for (let i = 0; i< 100000; i ++){

            this.tableData.push({
                date: i,
                name: i + 100,
                address: i +1000
            })
        }
    }
}
</script>

<style scoped>
.btn{
  display: flex;
  justify-content: flex-end;
}
</style>
