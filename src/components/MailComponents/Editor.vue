<template>
  <div>
    <div class="editor" id="editor" ref="editor"></div>
    <button @click="ss">ss</button>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { vueEditor } from "vue-wangeditor-awesome";
import WangEditor from "wangeditor";

@Component({
  components: {
    vueEditor,
  },
})
export default class Editor extends Vue {
  editor = "";

  mounted() {
    this.editor = new WangEditor("#editor");
    this.editor.create();
    this.editor.txt.html("<p>欢迎使用wangEditor编辑器</p>");
  }

  ss() {
    this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法

      // 上传图片，返回结果，将图片插入到编辑器中
      let imgUrl = "asdqwe"
      insertImgFn(imgUrl);
    };
  }
}
</script>
<style scoped>
.editor {
  width: 100%;
  height: 300px;
  margin-bottom: 40px;
}
.a-btn {
  padding-bottom: 80px;
}
.a-btn a {
  display: block;
  color: #fff;
  font-size: 16px;
  line-height: 30px;
  width: 100px;
  text-align: center;
  float: right;
  background: dodgerblue;
}
</style>
