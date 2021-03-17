<template>
  <div class="backGround">
    <h3
      style="
        color: white;
        height: 60px;
        padding-top: 13px;
        background-color: #0074d9;
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 1rem;
        margin-bottom: 1rem;
      "
    >
      Mail Template Management
    </h3>
    <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />

    <div style="display: flex; margin-left: 5%; margin-right: 5%">
      <div style="width: 20%">
        <div class="scrollbox">
          <div
            v-for="(template, index) in templates"
            :key="index"
            @click="settemplate(template)"
          >
            <b-card
              :id="template.templateName"
              style="margin-top: 10px; height: 50%"
              @mousemove="changeColor(template.templateName)"
            >
              <div style="display: flex">
                <div style="width: 90%">
                  <p style="height: 100%">{{ template.templateName }}</p>
                </div>
              </div>
            </b-card>
          </div>
        </div>
      </div>
      <div style="width: 90%">
        <div class="templatecontext">
          <b-form-input
            class="form-control inputtext"
            placeholder="New Template Name"
            style="width: 70%; margin-top: 1rem; margin-bottom: 1rem"
            v-model="newTemplateName"
            v-if="addbutton"
          />
          <MailContext
            :send="send"
            :type="type"
            @passValue="getTemplate"
            :template="this.template.templateName"
            style="height: 80%; width: 70%"
          />
        </div>
        <b-button
          v-if="updatebutton"
          style="margin: 1rem"
          @click="updateTemplate"
          >Update</b-button
        >
        <b-button
          v-if="updatebutton"
          style="margin: 1rem"
          @click="deleteTemplate"
          >Delete</b-button
        >
        <b-button v-if="addbutton" style="margin: 1rem" @click="addTemplate"
          >Add</b-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import mailTemplateApi from "../api/mailTemplateApi";
import VAlert from "@/components/VAlert.vue";
import AlertModel from "../../db-models/alertModel";
import MailContext from "../components/MailComponents/MailContext.vue";

@Component({
  components: {
    VAlert,
    MailContext,
  },
})
export default class TemplateManagement extends Vue {
  private alert = new AlertModel();

  private mailtemplate = "";

  private templates: any[] = [];
  private template: any = "";
  private updatebutton = true;
  private addbutton = false;
  private newTemplateName = "";
  private send = false;
  private type = "update";
  private setId = "";

  async created() {
    this.templates = await mailTemplateApi.getMailTs();
    this.templates.push({
      templateName: "++Add",
      templateValue: "",
    });
    this.template = this.templates[0];
    this.mailtemplate = this.templates[0].templateValue;
  }

  settemplate(template: any) {
    let x = document.getElementById(template.templateName);
    x.style.backgroundColor = "yellow";
    this.setId = template.templateName;

    this.template = template;
    this.mailtemplate = template.templateValue;
    if (template.templateName == "++Add") {
      this.addbutton = true;
      this.updatebutton = false;
    } else {
      this.addbutton = false;
      this.updatebutton = true;
    }
  }

  changeColor(id: string) {
    for (let i = 0; i < this.templates.length; i++) {
      if (this.templates[i].templateName == id) {
        let x = document.getElementById(id);
        x.style.backgroundColor = "pink";
      } else {
        if (this.templates[i].templateName != this.setId) {
          let y = document.getElementById(this.templates[i].templateName);
          y.style.backgroundColor = "white";
        }
      }
    }
  }

  async updateTemplate() {
    this.type = "update";
    this.send = !this.send;
    this.templates.push({
      templateName: "++Add",
      templateValue: "",
    });
  }

  async deleteTemplate() {
    let result = await mailTemplateApi.deleteTemplate(
      this.template.templateName
    );
    this.showalert(result.status);
    this.templates = await mailTemplateApi.getMailTs();
    this.templates.push({
      templateName: "++Add",
      templateValue: "",
    });
  }

  async getTemplate(obj: any) {
    this.mailtemplate = "";
    this.mailtemplate = obj.html;
    let Template: any = "";
    let result: any = "";
    switch (obj.type) {
      case "update":
        this.template.templateValue = this.mailtemplate;
        Template = {
          TemplateName: this.template.templateName,
          TemplateValue: this.template.templateValue,
        };
        result = await mailTemplateApi.updateTemplate(Template);
        this.showalert(result.status);
        this.templates = await mailTemplateApi.getMailTs();
        break;
      case "add":
        this.template.templateValue = this.mailtemplate;
        Template = {
          TemplateName: this.newTemplateName,
          TemplateValue: this.template.templateValue,
        };
        result = await mailTemplateApi.addTemplate(Template);
        this.showalert(result.status);
        this.templates = await mailTemplateApi.getMailTs();
        this.templates.push({
          templateName: "++Add",
          templateValue: "",
        });
        break;
    }
  }
  async addTemplate() {
    this.type = "add";
    this.send = !this.send;
  }

  showalert(status: any) {
    if (status == 200) {
      this.alert.showSuccess("success", this.alert);
    } else {
      this.alert.showfail("someting wrong", this.alert);
    }
  }
}
</script>

<style scoped>
.templatecontext {
  margin: auto;
  position: relative;
  left: 15%;
  right: 15%;
  margin-top: 1rem;
  bottom: 0;
  height: 400px;
}

.backGround {
  background-color: #f7f7f7;
  width: 100%;
  height: 100%;
  position: absolute;
}
.el-menu-item {
  padding-left: 0px;
  text-align: left;
}
.menu {
  position: relative;
  overflow-y: auto;
  max-height: 300px;
}
.scrollbox {
  position: relative;
  overflow-y: auto;
  max-height: 80%;
}
.card-body{
  padding:0;
}
</style>
