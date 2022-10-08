<template>
  <div class="json-editor">
    <div class="header">
      {{title}}
    </div>
    <textarea :ref="refName" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';

import 'codemirror/theme/idea.css';
// 括号显示匹配
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/selection/active-line';
// 括号、引号编辑和删除时成对出现
import 'codemirror/addon/edit/closebrackets';
// 折叠代码要用到一些玩意
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/comment-fold.js';

import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/swift/swift.js'
import 'codemirror/mode/vue/vue.js'

import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/javascript-hint'

export default {
    name: 'codeEditor',
    components: {},
    props: {
        jsonCode: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: 'CodeEditor',
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        refName: {
            type: String,
            default:'editor'
        }
    },
    data() {
        return {
            editor: '',
        };
    },
    watch: {
        jsonCode(newVal) {
            console.log(newVal)
            const editorValue = this.editor.getValue();
            if (newVal !== editorValue) {
                this.editor.setValue(
                    // 这里是json格式化
                    newVal
                    // JSON.stringify(JSON.parse(this.jsonCode), null, 2)
                );
                setTimeout(() => {
                    this.editor.refresh();
                }, 1);
            }
        },
        immediate: true,
        deep: true,
    },
    mounted() {
        this.editor = CodeMirror.fromTextArea(this.$refs[this.refName], {
            mode: 'javascript',
            theme: 'idea', // 主题样式
            lint: true,
            tabSize: 2,
            smartIndent: true, // 是否智能缩进
            styleActiveLine: true, // 当前行高亮
            hintOptions: {
                completeSingle: false,
                alignWithWord: false,
                // javascript-hint提供的自动完成的方法。此处可以自定义
                hint: CodeMirror.hint.javascript
            },
            lineNumbers: true, // 显示行号
            gutters: [
                'CodeMirror-linenumbers',
                'CodeMirror-foldgutter',
                'CodeMirror-lint-markers',
            ],
            lineWrapping: true, // 自动换行
            matchBrackets: true, // 括号匹配显示
            autoCloseBrackets: true, // 输入和退格时成对
            readOnly: this.readonly, // 只读
            foldGutter: true,
            fontSize: 17
        });
        // 这里是json格式化
        this.editor.setValue(this.jsonCode);
        this.editor.on('change', cm => {
            this.$emit('change', cm.getValue());
        });
        this.editor.on('keypress', (instance) => {
        // 在键盘事件的时候触发showHint显示自动完成提示框
            instance.showHint();
        // hintOptions配置也可以在此时进行设置
        // instance.showHint({
        //   completeSingle: false,
        //   alignWithWord: false,
        //   hint: CodeMirror.hint.javascript
        // });
        })
    },
    methods: {
    // 这玩意就是为了刷新编辑器的
        refresh() {
            /*
       * refresh: Fires when the editor is refreshed or resized.
       * Mostly useful to invalidate cached values that depend on the editor or character size.
       */
            this.editor && this.editor.refresh();
        },
    },
};
</script>


<style lang="less">
//http://t.zoukankan.com/cndarren-p-14691392.html
// 高度自适应 不能设置scope
.json-editor {
  height: 100%;
  position: relative;
  border: 1px solid #cdcdcd;
  border-radius: 3px;
  .header {
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #cdcdcd;;
    height: 36px;
    background: #fff;
  }
}
/* 高度自适应 */
.json-editor .CodeMirror {
  height:auto!important;
}
.json-editor .CodeMirror-scroll {
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
}

.CodeMirror-foldgutter-folded.CodeMirror-guttermarker-subtle {
  color: black !important;
  font-size: 14px;
}
.CodeMirror-foldgutter-open:after {
  color: black !important;
  font-size: 14px;
}
.json-editor .cm-string {
  color: coral !important;
}
.json-editor .CodeMirror-line {
  height: 24px !important;
  line-height: 24px !important;
}
</style>

