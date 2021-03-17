<template>
  <div style = "margin-bottom:10px" v-if = "ifshow">
    <b-button variant="primary" disabled>
      <b-spinner small ></b-spinner>
      Loading...{{show_precentage}}
    </b-button>
  </div>
</template>

<script lang="ts">
import {Component,Prop, Vue, Watch} from "vue-property-decorator";

@Component
export default class VLoadding extends Vue{
  @Prop() private ifshow!: boolean;
  @Prop({default:""}) private precentage!: string;

  private show_precentage = this.precentage

  @Watch("precentage")
  updateMobile(new_val: string) {
    this.show_precentage = new_val;
  }
}
</script>

<style scoped>

</style>