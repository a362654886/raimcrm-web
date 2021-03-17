<template>
  <div class = "labelbox">
    <div>
      <h5 class = "title">{{labelstring}}</h5>
    </div>
    <div>
      <p>{{textadd}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

@Component
export default class VLabel extends Vue {
  @Prop()
  private labelstring!: string;

  @Prop()
  private textstring!: string;

  textadd  = "";
  created(){
      this.textadd = ":  " + this.textstring;
  }

  @Watch("textstring")
  updateMobile(new_val: string) {
    this.textadd = ":  " + new_val;
  }
}
</script>

<style scoped>
.labelbox{
  display: flex;
  font-size: large;
}
.title{
  font-weight: bold;
}
</style>