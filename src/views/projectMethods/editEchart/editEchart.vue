<template>
    <div class="edit-chart item-margin-t">
      <div class="option-chart">
        <iframe id="preview" frameborder="0" height="600px" width="50%"></iframe>
      </div>
    </div>
</template>

<script>
import {defaultOptions,htmlData} from '@views/projectMethods/editEchart/config';


export default {
    name: 'editEchart',
    data: () => ({
        content: defaultOptions,
        updateData: '',
        htmlScript: '',
        htmlCss: '',
        test: ''
    }),
    components: {

    },
    watch: {
        updateData: {
            handler(newV, oldV) {
                if (!newV) return
                this.update()
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.updateData = defaultOptions
        this.update()
    },
    methods: {
        updateOptions(v) {
            this.updateData = v
        },
        update(html) {
            this.test = htmlData(html,'','test',this.updateData,this.$echarts)
            const preview = document.getElementById('preview')
            console.log(this.test)
            preview.setAttribute('srcdoc', this.test);
        }

    }
    // computed: {
    //     option
    // }
}
</script>

<style scoped lang="less">
.edit-chart {
  .option-chart {
    display: flex;
    .code-edit{
      width: 50%;
    }
  }
}
</style>
