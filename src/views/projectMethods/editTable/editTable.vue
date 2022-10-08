<template>
<div>
  <el-table
      @cell-dblclick="dblclick"
      :cell-class-name="cellClassName"
      :data="tableData"
      style="width: 100%">
    <el-table-column
        prop="date"
        label="日期"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {InputConstructor,SpanConstructor} from '@views/projectMethods/editTable/editComponents';

export default {
    name: 'editTable',
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {
        dblclick(row, column, cell, event) {
            console.log(row)
            if (row.isEdit) return
            row.isEdit = true
            row.oldCellValue = row[column['property']]
            const input = new InputConstructor({
                propsData:{
                    cellValue: row.oldCellValue, // 传递单元格的值
                    editDone: this.editDone, // 传递回调函数用于保存行数据，组件中可以触发之
                    cellDom: cell, // 传递这个dom元素
                    rowData: row, // 传递双击的行的数据
                    property: column.property, // 传递双击的是哪个字段
                }
            }).$mount(cell.children[0])
            console.log(input,777)
        },
        cellClassName({ row, column, rowIndex, columnIndex }) {
            row.index = rowIndex; // 自定义指定一个索引，下方能够用到
        },
        editDone(params) {
            params.row.isEdit = false
            if (params.cellValue === params.row.oldCellValue) {
                console.log('未修改数据');
            } else {
                console.log(params.property + params.row.oldCellValue +'修改为' + params.cellValue )
                params.row[params.property] = params.cellValue;
                // 这里模拟一下发了请求，得到最新表体数据以后，更新tableData
                setTimeout(() => {
                    //        给那个数组的     第几项            修改为什么值
                    this.$set(this.tableData, params.row.index, params.row);
                }, 300);
            }

            new SpanConstructor({
                propsData:{
                    cellValue: params.cellValue, // 传递单元格的值
                }
            }).$mount(params.cellDom.children[0]) // 覆盖原本cell
        },
    }
}
</script>
