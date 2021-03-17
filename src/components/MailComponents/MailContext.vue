<template>
  <div>
      <div class="editor" id="editor" ref="editor"></div>
  </div>
</template>

<script>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import filesApi from "@/api/filesApi";
import mailTemplateApi from "@/api/mailTemplateApi";
import WangEditor from "wangeditor";
import i18next from "i18next";

@Component
export default class MailContext extends Vue {
  iflink = false;
  link = "";
  linktext = "";
  file = [];
  imagesbase64 = [];
  editor = "";

  @Prop()
  send;

  @Prop()
  template;

  @Prop()
  type;

  async mounted() {
    this.editor = new WangEditor("#editor");
    this.editor.config.lang = 'en'
    this.editor.i18next = i18next
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "foreColor",
      "backColor",
      "link",
      "list",
      "justify",
      "quote",
      "image",
      "table",
      "undo",
      "redo",
    ];
    this.editor.create();

    this.editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
      this.file = event.target.files[0];
      let result = await filesApi.uploadimage(this.file);
      if (result == 200) {
        let imgUrl = `https://raincrmstorage.blob.core.windows.net/pictures/${this.file.name}`;
        let id = `${this.file.name}${this.randomNum()}`;
        let imageMIME = await this.generateBase64Img(this.file, id);
        this.imagesbase64.push(imageMIME);
        insertImgFn(imgUrl);
      }
    };
  }

  //template
  @Watch("template")
  async changeTemplate(new_val) {
    if (new_val == "++Add" || new_val == "") {
      this.editor.txt.html("")
      //
    } else {
      let result = await mailTemplateApi.getMailT(new_val);
      let str = result.templateValue;
      this.editor.txt.html(str)
      console.log(str)
    }
  }

  randomNum() {
    let Rand = Math.random();
    return 10000 + Math.round(Rand * 80000);
  }

  async generateBase64Img(file, id) {
    let base64file = "";
    if (file.length != 0) {
      await this.getbase64file(file).then((result) => {
        base64file = result.substring(result.indexOf(",") + 1);
      });
    }

    const image = `
--foo_bar_baz
Content-Type: image/png; name=${file.name}
Content-Transfer-Encoding: base64
Content-Disposition: inline; filename=${file.name}
Content-ID: <${id}>

${base64file}
`;

    return image;
  }

  async getbase64file(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (res) => {
        resolve(res.target.result);
      };

      reader.readAsDataURL(file);
    });
  }

  @Watch("send")
  async sendContext(new_val) {
    this.$emit("passValue", {
      html: this.editor.txt.html(),
      imagesarr: this.imagesbase64,
      type: this.type,
    });
    this.imagesbase64 = [];
  }
}
</script>

<style scoped>
.edit-div {
  border: 1px solid #bbb;
  width: 100%;
  height: 300px;
  min-height: 120px;
  max-height: 300px;
  _height: 120px;
  margin-left: auto;
  margin-right: auto;
  padding: 3px;
  outline: 0;
  border: 1px solid #a0b3d6;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  _overflow-y: visible;
}
</style>
