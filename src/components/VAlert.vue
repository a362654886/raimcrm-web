<template>
  <div v-if = "ifshow">
    <div :class="alertType" role="alert">
      {{text}}
    </div>
  </div>
</template>

<script lang="ts">
import {Component,Prop, Vue} from "vue-property-decorator";

@Component
export default class VAlert extends Vue {
  @Prop() private text!: any;
  @Prop() private type!: any;
  @Prop() private ifshow!: boolean;
  private alertType = "";

  updated(){
    this.changeColor()
  }

  changeColor(){
    if(this.type == 'fail'){
      this.alertType = "alert alert-danger"
    }else if(this.type == 'warning'){
      this.alertType = "alert alert-warning"
    }else if(this.type == 'success'){
      this.alertType = "alert alert-success"
    }
  }
}
</script>