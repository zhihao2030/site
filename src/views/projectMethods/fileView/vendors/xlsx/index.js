import ExcelJS from 'exceljs';
import Vue from 'vue';
import Table from './Table';
import 'handsontable/dist/handsontable.full.min.css';

/**
 * 渲染excel
 */
export default async function render(buffer, target) {
    console.log(buffer,555)
    const workbook = await new ExcelJS.Workbook().xlsx.load(buffer);
    console.log('aaa')
    console.log(workbook, 'workbook');
    return new Vue({
        render: (h) =>
            h(Table, {
                props: {
                    workbook,
                },
            }),
    }).$mount(target);
}
