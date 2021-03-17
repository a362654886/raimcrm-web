<template>
  <div class="overflow-auto" style="margin-top: 1rem">
    <b-table
      id="my-table"
      class="table"
      striped
      hover
      :items="items"
      :fields="localFields"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :per-page="localPerPage"
      :current-page="cPage"
      small
      responsive="sm"
      @row-clicked="passValueToParents"
      @head-clicked="showhead"
    >
    </b-table>
    <div style="display: flex">
      <b-pagination
        style="width: 85%"
        v-model="cPage"
        :total-rows="localRows"
        :per-page="localPerPage"
        aria-controls="my-table"
        align="center"
        v-if="pagination"
      ></b-pagination>
      <div style="display: flex; width: 15%; margin-right: 10px">
        <p style="margin-top: 20px; margin-right: 20px">Items/page :</p>
        <b-form-select
          v-model="localPerPage"
          :options="[
            { value: '5', text: '5' },
            { value: '10', text: '10' },
            { value: '20', text: '20' },
            { value: '30', text: '30' },
          ]"
          size="sm"
          class="mt-3"
        ></b-form-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import store from "@/store";

@Component
export default class VTable extends Vue {
  @Prop()
  private tableName!: string;

  @Prop({ default: 1 })
  private currentPage!: number;

  @Prop()
  private sortBy!: string;

  @Prop({ default: 0 })
  private rows!: number;

  @Prop()
  private perPage!: number;

  @Prop({ default: () => true })
  private sortDesc!: boolean;

  @Prop() private fields!: string[];

  @Prop() private items!: string[];

  @Prop() private pagination!: boolean;

  sortkey = "";
  choosekey = "";
  sync = true;
  typetimes = 1;
  cPage = this.currentPage
  localPerPage = this.perPage;
  localFields = this.fields;
  private localRows = this.rows;


  passValueToParents(obj: any, index: any) {
    const num = (this.currentPage - 1) * 10 + index;
    if (this.choosekey == "") {
      this.$emit("passValue", num);
    } else {
      if (this.typetimes % 2 === 0) {
        let newItem = this.items.sort(this.ascending(this.choosekey));
        this.saveTable(newItem);
      } else {
        let newItem = this.items.sort(this.decending(this.choosekey));
        this.saveTable(newItem);
      }
      this.$emit("passValue", num);
    }
  }

  saveTable(items: any[]) {
    switch (this.tableName) {
      case "customer":
        store.commit("saveCustomerSearchResult", items);
        break;
      case "property":
        store.commit("savePropertiesSearchResult", items);
        break;
      default:
        break;
    }
  }

  ascending(value: string | number) {
    return function (m: any, n: any) {
      let a = m[value];
      let b = n[value];
      if (b > a) {
        return 1;
      } else if (b < a) {
        return -1;
      } else {
        return 0;
      }
    };
  }

  decending(value: string | number) {
    return function (m: any, n: any) {
      let a = m[value];
      let b = n[value];
      if (b > a) {
        return -1;
      } else if (b < a) {
        return 1;
      } else {
        return 0;
      }
    };
  }

  showhead(key: string, field: string) {
    if (this.choosekey != key) {
      this.choosekey = key;
      this.typetimes = 1;
    } else {
      this.typetimes++;
    }
  }

  @Watch("cPage")
  updateMobile(new_val: string) {
    this.$emit("passPage", this.cPage,this.localPerPage);
  }

  @Watch("rows")
  updateRows(new_val: any) {
    this.localRows = new_val;
  }

  @Watch("fields")
  updateFields(new_val: any) {
    this.localFields = new_val;
  }

  @Watch("localPerPage")
  updateLocalPerPage(new_val: any) {
    this.localPerPage = parseInt(new_val);
    this.$emit("passPage", this.cPage,this.localPerPage);
  }
}
</script>

<style lang="scss" scoped>
.table {
  cursor: pointer;
}
</style>
