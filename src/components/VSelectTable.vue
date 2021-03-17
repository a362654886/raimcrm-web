<template>
  <div>
    <div style="display: flex; width: 15%; margin-right: 10px;float:right">
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
    <b-table
      ref="selectableTable"
      selectable
      :select-mode="'multi'"
      :items="items"
      :fields="fields"
      @row-selected="onRowSelected"
      :per-page="localPerPage"
      :current-page="currentPage"
      responsive="sm"
    >
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
    <div style="display: flex">
      <div style="width: 30%">
        <div style="float: left; display: flex; margin-left: 1rem; width: 100%">
          <b-button
            class="tableButton"
            variant="primary"
            size="sm"
            @click="selectAllRows"
            >Select All</b-button
          >
          <b-button
            class="tableButton"
            variant="primary"
            size="sm"
            @click="selectPageRows"
            >Select This Page</b-button
          >
          <b-button
            class="tableButton"
            variant="primary"
            size="sm"
            @click="clearSelected"
            >Clear selected</b-button
          >
        </div>
      </div>

      <div style="width: 40%">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="localPerPage"
          aria-controls="my-table"
          align="center"
          v-if="pagination"
        ></b-pagination>
      </div>

      <div style="width: 30%; display: flex">
        <div style="margin-left: 1rem">
          <select class="custom-select inputbox" v-model="userId">
            <option
              v-for="(member, index) in this.userSelection"
              :key="index"
              :value="member.value"
            >
              {{ member.text }}
            </option>
          </select>
        </div>
        <div style="margin-left: 1rem">
          <b-button
            style="background-color: #dc143c; width: 150px"
            @click="passValueToParents"
            >Save</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getStoreUser, getUserSelection, searchUsersByTeam } from "../../db-models/db-userManagement";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VSelectTable extends Vue {
  currentPage = 1;
  teamId = "";
  userId = "";
  localPerPage = 0;

  @Prop() private fields!: string[];

  @Prop() private items!: any[];

  @Prop()
  private rows!: number;

  @Prop()
  private perPage!: number;

  @Prop() private pagination!: boolean;

  private selected: any[] = [];

  private userSelection: any[] = [];

  private bcColor = "background-color:white";

  async created() {
    this.localPerPage = this.perPage;
    const storeUser = getStoreUser();
    this.teamId = storeUser.teamId;
    this.userSelection = await getUserSelection(this.teamId)
    this.userId = storeUser.email;
  }

  onRowSelected(item: any) {
    this.selected = item;
  }
  selectPageRows() {
    (this.$refs.selectableTable as any).$el.style.backgroundColor = "";
    this.selected = [];
    // eslint-disable-next-line
    (this.$refs.selectableTable as any).selectAllRows();
  }
  selectAllRows() {
    (this.$refs.selectableTable as any).$el.style.backgroundColor =
      "rgba(0,0,0,.075)";
    this.selected = this.items;
  }
  clearSelected() {
    (this.$refs.selectableTable as any).$el.style.backgroundColor = "";
    this.selected = [];
    // eslint-disable-next-line
    (this.$refs.selectableTable as any).clearSelected();
  }
  passValueToParents() {
    this.selected.forEach((value: any) => {
      value.teamId = this.teamId;
      value.userId = this.userId;
    });
    this.$emit("passValue", this.selected);
    this.$emit("show", this.selected);
  }
}
</script>

<style scoped>
.tableButton {
  margin-left: 1rem;
  width: 33%;
}
</style>
