<template>
  <div>
    <div class="propertyBack">
      <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />
      <VLoadding :ifshow="loading.ifshow" />
      <div class="propertyInfo">
        <div class="leftPart">
          <div>
            <div>
              <div
                class="clientTitle"
                style="display: flex; margin-bottom: 10px"
              >
                <h5 style="width: 60%; margin-top: 5px">Basic Info :</h5>
                <div>
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="showEdit('basic')"
                    v-if="!this.propertyInfos.basic"
                  ></el-button>
                  <el-button
                    type="success"
                    icon="el-icon-back"
                    circle
                    @click="showInfo('basic')"
                    v-if="this.propertyInfos.basic"
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-refresh"
                    circle
                    @click="saveUpdate"
                    v-if="this.propertyInfos.basic"
                  ></el-button>
                </div>
              </div>
            </div>

            <div v-if="!this.propertyInfos.basic">
              <div class="basicPart">
                <p class="clientText rowlabel">
                  <strong>Property Type: </strong>{{ property.propertyType }}
                </p>
                <p class="clientText rowlabel">
                  <strong>Title: </strong>{{ this.editProperty.getTitle() }}
                </p>
              </div>
              <div class="basicPart">
                <p class="clientText rowlabel">
                  <strong>Status: </strong>{{ property.status }}
                </p>
                <p class="clientText rowlabel">
                  <strong>Land: </strong
                  >{{ functions.moneyFormat(property.land) }}
                </p>
              </div>
              <div class="basicPart">
                <p class="clientText rowlabel">
                  <strong>BedRoom: </strong>{{ property.bedroom }}
                </p>
                <p class="clientText rowlabel">
                  <strong>BathRoom: </strong>{{ property.bathroom }}
                </p>
              </div>
              <div class="basicPart">
                <p class="clientText rowlabel">
                  <strong>Appraisal range: </strong>{{ property.budgetstring }}
                </p>
                <p class="clientText rowlabel">
                  <strong>Last Trade: </strong
                  >{{ functions.getFormatData(property.lastUpdateCV) }}
                </p>
              </div>
            </div>

            <div v-if="this.propertyInfos.basic">
              <div class="basicPart">
                <VInput
                  class="rowlabel"
                  :titleWidth="'width:70px;font-weight: normal'"
                  :textWidth="'width:200px'"
                  :labelstring="'Property Type'"
                  :contextstring="this.editProperty.Property_Type"
                  :inputtype="'Property_Type'"
                  :type="'select'"
                  :selectOption="property_type_options"
                  @fieldChanged="selectChange"
                />
                <VInput
                  class="rowlabel"
                  :titleWidth="'width:70px;font-weight: normal'"
                  :textWidth="'width:200px'"
                  :labelstring="'Title'"
                  :contextstring="this.editProperty.getTitle()"
                  :inputtype="'Title'"
                  :type="'select'"
                  :selectOption="title_options"
                  @fieldChanged="selectChange"
                />
              </div>
              <div class="basicPart">
                <VInput
                  class="rowlabel"
                  style="margin-top: 0.5rem"
                  :titleWidth="'width:70px;font-weight: normal'"
                  :textWidth="'width:200px'"
                  :labelstring="'Status'"
                  :contextstring="this.editProperty.Status"
                  :inputtype="'Status'"
                  :type="'select'"
                  :selectOption="status_options"
                  @fieldChanged="selectChange"
                />
                <div style="width: 50%; display: flex">
                  <p class="clientText land">Land:</p>
                  <input
                    style="margin-left: 60px"
                    class="numberBox"
                    placeholder="0"
                    v-model="editProperty.Land"
                    v-on:input="getFormatLand()"
                  />
                </div>
              </div>
              <div class="basicPart">
                <div style="width: 50%; display: flex">
                  <p class="clientText bedRoom">Bedroom:</p>
                  <input
                    style="margin-left: 30px"
                    class="numberBox"
                    placeholder="0"
                    v-model="editProperty.Bedroom"
                  />
                </div>
                <div style="width: 50%; display: flex">
                  <p class="clientText bathRoom">Bathroom:</p>
                  <input
                    style="margin-left: 30px"
                    class="numberBox"
                    placeholder="0"
                    v-model="editProperty.Bathroom"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="rightPart">
          <div>
            <div>
              <div
                class="clientTitle"
                style="display: flex; margin-bottom: 10px"
              >
                <h5 style="width: 90%; margin-top: 5px">Other Info :</h5>
                <div>
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="showEdit('other')"
                    v-if="!this.propertyInfos.other"
                  ></el-button>
                  <el-button
                    type="success"
                    icon="el-icon-back"
                    circle
                    @click="showInfo('other')"
                    v-if="this.propertyInfos.other"
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-refresh"
                    circle
                    @click="saveUpdate"
                    v-if="this.propertyInfos.other"
                  ></el-button>
                </div>
              </div>
            </div>

            <div v-if="!this.propertyInfos.other">
              <div class="rows">
                <p class="clientText rowlabel">
                  <strong>Roof: </strong>{{ property.roof }}
                </p>
                <p class="clientText rowlabel">
                  <strong>Exterior: </strong>{{ property.exterior }}
                </p>
              </div>
              <div class="rows">
                <p class="clientText rowlabel">
                  <strong>Garaging: </strong>{{ property.garaging }}
                </p>
                <p class="clientText rowlabel">
                  <strong>School Zone: </strong>{{ property.schoolZone }}
                </p>
              </div>
              <div class="rows">
                <p class="clientText rowlabel">
                  <strong>Subdivision: </strong>{{ property.subdivision }}
                </p>
                <p class="clientText rowlabel">
                  <strong>Add Value: </strong>{{ property.addValue }}
                </p>
              </div>
            </div>

            <div v-if="this.propertyInfos.other">
              <div class="rows" style="display: flex">
                <VInput
                  class="rowlabel"
                  :titleWidth="'width:120px;font-weight: normal'"
                  :textWidth="'width:200px'"
                  :labelstring="'Roof'"
                  :contextstring="this.editProperty.Roof"
                  :inputtype="'Roof'"
                  :type="'select'"
                  :selectOption="property_roof_options"
                  @fieldChanged="selectChange"
                />
                <VInput
                  class="rowlabel"
                  :titleWidth="'width:120px;font-weight: normal'"
                  :textWidth="'width:200px'"
                  :labelstring="'Exterior'"
                  :contextstring="this.editProperty.Exterior"
                  :inputtype="'Exterior'"
                  :type="'select'"
                  :selectOption="property_exterior_options"
                  @fieldChanged="selectChange"
                />
              </div>
              <div class="rows" style="display: flex">
                <VInput
                  class="rowlabel"
                  :titleWidth="'width:120px;font-weight: normal'"
                  :textWidth="'width:200px'"
                  :labelstring="'Garaging'"
                  :contextstring="this.editProperty.Garaging"
                  :inputtype="'Garaging'"
                  :type="'select'"
                  :selectOption="property_garaging_options"
                  @fieldChanged="selectChange"
                />
              </div>
              <div style="display: flex">
                <div style="width: 150px">
                  <p
                    style="
                      font-weight: normal;
                      text-align: left;
                      margin-top: 10px;
                    "
                  >
                    School Zone
                  </p>
                </div>
                <Multiselect
                  style="width: 70%"
                  v-model="editProperty.School_Zone"
                  :options="property_schoolzone_options"
                  @change="editProperty.show()"
                  multiple
                ></Multiselect>
              </div>
              <div class="rows">
                <VInput
                  class="rowlabel"
                  :titleWidth="'width:120px;font-weight: normal'"
                  :textWidth="'width:200px'"
                  :labelstring="'Subdivision'"
                  :contextstring="defaultSubdivision"
                  :inputtype="'Subdivision'"
                  :type="'select'"
                  :selectOption="selectBox"
                  @fieldChanged="selectChange"
                />
                <VInput
                  class="rowlabel"
                  :titleWidth="'width:120px;font-weight: normal'"
                  :textWidth="'width:200px'"
                  :labelstring="'Addvalue'"
                  :contextstring="defaultAddvalue"
                  :inputtype="'Add_Value'"
                  :type="'select'"
                  :selectOption="selectBox"
                  @fieldChanged="selectChange"
                />
              </div>
            </div>
          </div>

          <div>
            <div class="clientTitle" style="display: flex; margin-bottom: 10px">
              <h5 style="width: 90%; margin-top: 5px">C.V. :</h5>
              <div>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="showEdit('cv')"
                  v-if="!this.propertyInfos.cv"
                ></el-button>
                <el-button
                  type="success"
                  icon="el-icon-back"
                  circle
                  @click="showInfo('cv')"
                  v-if="this.propertyInfos.cv"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-refresh"
                  circle
                  @click="saveUpdate"
                  v-if="this.propertyInfos.cv"
                ></el-button>
              </div>
            </div>
            <div v-if="!this.propertyInfos.cv">
              <div class="rows">
                <p class="clientText rowlabel">
                  <strong>C.V: </strong
                  >{{
                    functions.moneyFormat(
                      functions.moneyFormat(property.cv),
                      true
                    )
                  }}
                </p>
                <p class="clientText rowlabel">
                  <strong>Last Update Time: </strong>{{ property.lastUpdateCV }}
                </p>
              </div>
            </div>

            <div v-if="this.propertyInfos.cv" style="display: flex">
              <div style="width: 50%; display: flex">
                <p class="clientText" style="margin-top: 15px; width: 150px">
                  CV:
                </p>
                <input
                  class="numberBox"
                  placeholder="0"
                  v-model="editProperty.CV"
                  v-on:input="getFormatCV()"
                />
              </div>
              <div style="width: 50%; display: flex">
                <p class="clientText" style="margin-top: 15px; width: 150px">
                  lastUpdateTime:
                </p>
                <el-date-picker
                  class="inputbox"
                  v-model="editProperty.LastUpdateCV"
                  type="date"
                  placeholder="select"
                  format="dd/MM/yyyy"
                >
                </el-date-picker>
              </div>
            </div>
          </div>

          <div>
            <div>
              <el-menu
                :default-active="'owner'"
                class="el-menu-demo"
                mode="horizontal"
                background-color="rgb(233, 233, 233)"
                @select="handleSelect"
              >
                <el-menu-item index="owner">Owner</el-menu-item>
                <el-menu-item index="legalOwner">Legal Owner</el-menu-item>
                <el-menu-item index="tradeHistory">Trade History</el-menu-item>
                <el-menu-item index="appraisal">Appraisal</el-menu-item>
                <el-menu-item index="viewHistory">View History</el-menu-item>
                <el-menu-item index="matchClient" style="margin-right: 5%"
                  >Match Clients</el-menu-item
                >
                <div v-if="this.propertyAttributes.owner" class="buttons">
                <div v-if="ifOwnerHave">
                  <el-button
                    type="success"
                    icon="el-icon-plus"
                    data-toggle="modal"
                    data-target="#customerAdd"
                    circle
                  ></el-button>
                </div>
                  <el-button
                   v-if="!ifOwnerHave"
                    type="danger"
                    icon="el-icon-delete"
                    @click="deleteOwner()"
                    circle
                  ></el-button>
                  <VDialogueAdd
                    :propertyAdd="true"
                    :idstring="'customerAdd'"
                    :titlestring="'Client Add'"
                    @sendSuccessId="addNewOwner"
                  />
                </div>
                <div v-if="this.propertyAttributes.legalOwner" class="buttons">
                  <div v-if="!this.propertyAttributes.editOwner">
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      circle
                      @click="editLeaglOwnerFn()"
                    ></el-button>
                  </div>
                  <div v-if="this.propertyAttributes.editOwner">
                    <el-button
                      type="primary"
                      icon="el-icon-back"
                      circle
                      @click="editLeaglOwnerFn()"
                    ></el-button>
                    <el-button
                      type="danger"
                      icon="el-icon-refresh"
                      circle
                      @click="saveUpdateLegalOwner()"
                    ></el-button>
                  </div>
                </div>
                <div v-if="this.propertyAttributes.appraisal" class="buttons">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    data-toggle="modal"
                    data-target="#appraisalModal"
                  ></el-button>
                  <el-button
                    type="success"
                    icon="el-icon-plus"
                    circle
                    data-toggle="modal"
                    data-target="#appraisalAdd"
                  ></el-button>
                </div>
                <div v-if="this.propertyAttributes.viewHistory" class="buttons">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    data-toggle="modal"
                    data-target="#viewHistoryModal"
                  ></el-button>
                  <el-button
                    type="success"
                    icon="el-icon-plus"
                    circle
                    data-toggle="modal"
                    data-target="#viewHistoryAdd"
                  ></el-button>
                </div>
              </el-menu>
            </div>
            <div>
              <div v-if="this.propertyAttributes.owner">
                <VTable
                  :items="[owner]"
                  :fields="customerfield"
                  :rows="rows"
                  :perPage="10"
                  @passValue="chooseCustomer"
                  :pagination="false"
                />
              </div>

              <div v-if="this.propertyAttributes.legalOwner">
                <div v-if="!this.propertyAttributes.editOwner">
                  <div class="childBoxTitle">
                    <div style="width: 20%">
                      <p class="childBoxPleft">Owner Name:</p>
                    </div>
                    <div style="width: 20%">
                      <p class="childBoxPleft">Mail Name:</p>
                    </div>
                    <div style="width: 20%">
                      <p class="childBoxPleft">Dear Name:</p>
                    </div>
                    <div style="width: 20%">
                      <p class="childBoxPleft">Postal Address:</p>
                    </div>
                    <div style="width: 20%">
                      <p class="childBoxPleft">Postal Suburb:</p>
                    </div>
                  </div>

                  <div class="scrollboxless">
                    <b-card style="margin-top: 10px">
                      <div style="display: flex">
                        <div style="width: 20%">
                          <p class="childBoxPleft">
                            {{ legalOwner.ownerName }}
                          </p>
                        </div>
                        <div style="width: 20%">
                          <p class="childBoxPleft">{{ legalOwner.mailName }}</p>
                        </div>
                        <div style="width: 20%">
                          <p class="childBoxPleft">{{ legalOwner.dearName }}</p>
                        </div>
                        <div style="width: 20%">
                          <p class="childBoxPleft">
                            {{ legalOwner.postalAddress }}
                          </p>
                        </div>
                        <div style="width: 20%">
                          <p class="childBoxPleft">
                            {{ legalOwner.postalSuburb }}
                          </p>
                        </div>
                      </div>
                    </b-card>
                  </div>
                </div>

                <div v-if="this.propertyAttributes.editOwner">
                  <div style="display: flex; margin-top: 1rem">
                    <VInput
                      class="rowlabel"
                      :titleWidth="'width:150px;font-weight: normal'"
                      :textWidth="'width:250px'"
                      :labelstring="'Owner Name'"
                      :inputtype="'OwnerName'"
                      :type="'input'"
                      :contextstring="this.editProperty.OwnerName"
                      @fieldChanged="selectChange"
                    />
                    <VInput
                      class="rowlabel"
                      :titleWidth="'width:150px;font-weight: normal'"
                      :textWidth="'width:250px'"
                      :labelstring="'Mail Name'"
                      :inputtype="'MailName'"
                      :type="'input'"
                      :contextstring="this.editProperty.MailName"
                      @fieldChanged="selectChange"
                    />
                  </div>
                  <div style="display: flex; margin-top: 1rem">
                    <VInput
                      class="rowlabel"
                      :titleWidth="'width:150px;font-weight: normal'"
                      :textWidth="'width:250px'"
                      :labelstring="'Dear Name'"
                      :inputtype="'DearName'"
                      :type="'input'"
                      :contextstring="this.editProperty.DearName"
                      @fieldChanged="selectChange"
                    />
                    <VInput
                      class="rowlabel"
                      :titleWidth="'width:150px;font-weight: normal'"
                      :textWidth="'width:250px'"
                      :labelstring="'Postal Address'"
                      :inputtype="'PostalAddress'"
                      :type="'input'"
                      :contextstring="this.editProperty.PostalAddress"
                      @fieldChanged="selectChange"
                    />
                  </div>
                  <div style="display: flex; margin-top: 1rem">
                    <VInput
                      class="rowlabel"
                      :titleWidth="'width:150px;font-weight: normal'"
                      :textWidth="'width:250px'"
                      :labelstring="'Postal Suburb'"
                      :inputtype="'PostalSuburb'"
                      :type="'input'"
                      :contextstring="this.editProperty.PostalSuburb"
                      @fieldChanged="selectChange"
                    />
                  </div>
                </div>
              </div>

              <div v-if="this.propertyAttributes.tradeHistory">
                <div class="childBoxTitle">
                  <div style="width: 25%">
                    <h6 class="childBoxPleft">Buyer:</h6>
                  </div>
                  <div style="width: 25%">
                    <h6 class="childBoxPleft">Seller:</h6>
                  </div>
                  <div style="width: 25%">
                    <h6 class="childBoxPleft">Trade Time:</h6>
                  </div>
                  <div style="width: 25%">
                    <h6 class="childBoxPleft">Value:</h6>
                  </div>
                </div>

                <div class="scrollboxless">
                  <div v-for="member in trade" :key="member.index">
                    <b-card>
                      <div style="display: flex">
                        <div style="width: 25%">
                          <h6
                            class="childBoxPleft"
                            @click="toCustomerId(member.buyerId)"
                          >
                            <a href="#">{{ member.buyerName }}</a>
                          </h6>
                        </div>
                        <div style="width: 25%">
                          <h6
                            class="childBoxPleft"
                            @click="toCustomerId(member.sellId)"
                          >
                            <a href="#">{{ member.sellName }}</a>
                          </h6>
                        </div>
                        <div style="width: 25%">
                          <h6 class="childBoxPleft">
                            {{ functions.getFormatData(member.time) }}
                          </h6>
                        </div>
                        <div style="width: 25%">
                          <h6 class="childBoxPleft">{{ member.value }}</h6>
                        </div>
                      </div>
                    </b-card>
                  </div>
                </div>
              </div>

              <div v-if="this.propertyAttributes.appraisal">
                <div>
                  <VDialogue
                    :idstring="'appraisalModal'"
                    :titlestring="'Appraisal Edit'"
                    :inputtype="'appraisal'"
                    :dialogueGroup="appraisalArr"
                    :width="'width:25%'"
                    :saveResult="saveResult"
                    @dislogueChanged="getDialogueVal"
                    @uploadFile="uploadOneFile"
                  />
                  <VAppraisalDislogue
                    :width="'width:25%'"
                    @dislogueChanged="addNewVaule"
                    @uploadFile="uploadOneFile"
                  />
                </div>
                <div class="childBoxTitle">
                  <div style="width: 25%">
                    <p class="childBoxPleft">Time:</p>
                  </div>
                  <div style="width: 25%">
                    <p class="childBoxPleft">Range:</p>
                  </div>
                  <div style="width: 25%">
                    <p class="childBoxPleft">Uer email:</p>
                  </div>
                  <div style="width: 25%">
                    <p class="childBoxP">Document:</p>
                  </div>
                </div>
                <div class="scrollboxless">
                  <div
                    v-for="member in this.property.appraisal"
                    :key="member.index"
                  >
                    <b-card style="margin-top: 10px">
                      <div style="display: flex">
                        <div style="width: 25%">
                          <p class="childBoxPleft">
                            {{ functions.getFormatData(member.apTime) }}
                          </p>
                        </div>
                        <div style="width: 25%">
                          <p class="childBoxPleft">{{ member.range }}</p>
                        </div>
                        <div style="width: 25%">
                          <p class="childBoxPleft">{{ member.uEmail }}</p>
                        </div>
                        <div style="width: 25%">
                          <button @click="download(member.document)">
                            Download
                          </button>
                        </div>
                      </div>
                    </b-card>
                  </div>
                </div>
              </div>

              <div v-if="this.propertyAttributes.viewHistory">
                <div>
                  <VDialogue
                    :idstring="'viewHistoryModal'"
                    :titlestring="'View Histories Edit'"
                    :inputtype="'viewhistory'"
                    :dialogueGroup="viewhistoryarr"
                    :width="'width:33%'"
                    :saveResult="saveResult"
                    @dislogueChanged="getDialogueVal"
                  />
                  <VDialogue
                    :idstring="'viewHistoryAdd'"
                    :titlestring="'ViewHistory Add'"
                    :inputtype="'PropertyViewHistoryadd'"
                    :dialogueGroup="propertyViewHistory"
                    :width="'width:25%'"
                    :saveText="'Add'"
                    :saveResult="saveResult"
                    @dislogueChanged="addNewVaule"
                  />
                </div>
                <div class="childBoxTitle">
                  <div style="width: 10%">
                    <h6 class="childBoxPleft">Type</h6>
                  </div>
                  <div style="width: 15%">
                    <h6 class="childBoxPleft">Time</h6>
                  </div>
                  <div style="width: 15%">
                    <h6 class="childBoxPleft">Client</h6>
                  </div>
                  <div style="width: 20%">
                    <h6 class="childBoxPleft">Email</h6>
                  </div>
                  <div style="width: 32%">
                    <h6 class="childBoxPleft">context</h6>
                  </div>
                  <div style="width: 8%">
                    <h6 class="childBoxPleft">choose</h6>
                  </div>
                </div>
                <div class="scrollboxless">
                  <div
                    v-for="member in this.emailViewHistory"
                    :key="member.index"
                  >
                    <b-card style="margin-top: 10px">
                      <div style="display: flex">
                        <div style="width: 10%">
                          <p class="childBoxPleft">{{ member.type }}</p>
                        </div>
                        <div style="width: 15%">
                          <p class="childBoxPleft">
                            {{ functions.getFormatData(member.VhTime) }}
                          </p>
                        </div>
                        <div style="width: 15%">
                          <p
                            class="childBoxPleft"
                            v-if="!ifcustomerExist(member.customerId)"
                            @click="toCustomerId(member.customerId)"
                          >
                            <a a href="#">{{ member.name }}</a>
                          </p>
                          <p
                            class="childBoxPleft"
                            v-if="ifcustomerExist(member.customerId)"
                          >
                            {{ member.name }}
                          </p>
                        </div>
                        <div style="width: 20%">
                          <p class="childBoxPleft">{{ member.email }}</p>
                        </div>
                        <div style="width: 32%">
                          <p class="childBoxPleft">{{ member.context }}</p>
                        </div>
                        <div style="width: 5%">
                          <div>
                            <b-form-checkbox
                              :id="member.VHId"
                              v-model="member.ifChoose"
                              :name="member.VHId"
                              value="accepted"
                              unchecked-value="not_accepted"
                            />
                          </div>
                        </div>
                      </div>
                    </b-card>
                  </div>
                </div>

                <el-button
                  style="float: right; margin: 1rem"
                  type="primary"
                  icon="el-icon-message"
                  data-toggle="modal"
                  data-target="#mailboxVh"
                  @click="openMailBox"
                  >Send</el-button
                >
              </div>

              <div v-if="this.propertyAttributes.matchClient">
                <VTable
                  :items="customers"
                  :fields="customerfield"
                  :rows="allrows"
                  :perPage="localPerPage"
                  :pagination="true"
                  :currentPage="cPage"
                  @passValue="chooseCustomer"
                  @passPage="getMatchedCustomer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MailBox
      :idstring="'mailboxVh'"
      :titlestring="'Mail'"
      :template="mailtemplate"
      :mailto="mailToString"
      :nameString="mailNameString"
      :mailresult="mailResult"
      :tableName="'customer'"
      :ifloading="ifloadingMail"
      @passValue="sendmail"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import store from "@/store";
import VTable from "../VTable.vue";
import VLabel from "../VLabel.vue";
import customerApi from "@/api/customerApi";
import filesApi from "@/api/filesApi";
import { customerfield, tradefield } from "../../../data/options_data";
import { getViewHistoryByProperty } from "@/api/viewHistoryApi";
import otherFunctions from "../../../functions/otherFunctions";
import AlertModel from "../../../db-models/alertModel";
import VAlert from "../../components/VAlert.vue";
import googleApi from "../../api/googleAPI";
import propertyLabelapi from "@/api/propertyLabelApi";
import MailBox from "@/components/MailComponents/MailBox.vue";
import { Customer, getUpdatedClient } from "../../../db-models/db-customer";
import { Property } from "../../../db-models/db-property";
import {
  EmailViewHistory,
  getVhEmail,
  ViewHistory,
} from "../../../db-models/db-viewhistory";
import {
  allFalse,
  defaultPropertyAttributes,
} from "../../../functions/publicFn";
import { toClient } from "../../../functions/toPageFunction";
import {
  EditProperty,
  getEditProperty,
} from "../../../db-models/edit-property";
import VInput from "../../components/VInput.vue";
import DialogueArr from "../../../functions/DialogueArr";
import { Models } from "../../../data/newAttribute_model";
import Multiselect from "vue-multiselect";
import VLoadding from "@/components/VLoadding.vue";
import VAppraisalDislogue from "@/components/VAppraisalDislogue.vue";
import VDialogue from "@/components/VDialogue.vue";
import propertyApi from "@/api/propertyApi";
import { dialogueType } from "@/type/enum";
import LoadModel from "../../../db-models/loaddingModel";
import modelCreate from "../../../db-models/modelCreate";
import { insertRightPage } from "../../../functions/publicFn";
import {
  propertyTypeOptions,
  titleOptions,
  statusOptions,
  propertyExteriorOptions,
  propertyRoofOptions,
  propertyGaragingOptions,
  propertySchoolZoneOptions,
  selectBox,
} from "../../../data/options_data";
import { getStoreUser, User } from "../../../db-models/db-userManagement";
import VDialogueAdd from "@/components/VDialogueAdd.vue";
import { getEditCustomer } from "../../../db-models/edit-customer";
import { getStoreTeam, Team } from "../../../db-models/db-team";

@Component({
  components: {
    VTable,
    VLabel,
    VAlert,
    MailBox,
    VInput,
    Multiselect,
    VLoadding,
    VAppraisalDislogue,
    VDialogue,
    VDialogueAdd,
  },
})
export default class PropertyInfo extends Vue {
  private cPage = 1;
  private allrows = 0;
  private localPerPage = 10;

  private loading = new LoadModel();

  private rows = 0;
  private customers: Customer[] = [];
  private owner: any;
  private trade: any[];
  private customerfield = customerfield;

  private tradefield = tradefield;
  private viewhistory: ViewHistory[];
  private emailViewHistory: EmailViewHistory[] = [];

  private propertyAttributes = defaultPropertyAttributes;

  private functions = otherFunctions;
  private alert = new AlertModel();

  private property: Property =
    store.state.searcherProperties[store.state.showProperty];
  private legalOwner: any = this.property.legalOwner
    ? this.property.legalOwner[0]
    : {
        ownerName: "",
        mailName: "",
        dearName: "",
        postalSuburb: "",
      };
  private editProperty: EditProperty = getEditProperty(
    this.property,
    this.legalOwner
  );

  private propertyInfos = {
    basic: false,
    other: false,
    cv: false,
  };

  private defaultSubdivision = this.editProperty.getSubdivision();
  private defaultAddvalue = this.editProperty.getAddValue();

  //mail
  private ifloadingMail = "false";
  private mailResult = "ini";
  private mailtemplate = "";
  private mailToString = "";
  private mailNameString = "";

  //update

  private appraisalArr: any = [];
  private viewhistoryarr: any = [];

  private appraisal: any = null;

  private newAppraisal: any = [];
  private propertyViewHistory: any = [];

  private saveResult: dialogueType = dialogueType.TRUE;

  property_type_options: any[];
  title_options: any[];
  status_options: any[];
  property_exterior_options: any[];
  property_roof_options: any[];
  property_garaging_options: any[];
  property_schoolzone_options: any[];
  selectBox = selectBox;

  private ifOwnerHave = false;

  async created() {
    this.title_options = otherFunctions.addValuetoOption(await titleOptions());
    this.property_type_options = otherFunctions.addValuetoOption(
      await propertyTypeOptions()
    );
    this.status_options = otherFunctions.addValuetoOption(
      await statusOptions()
    );
    this.property_exterior_options = otherFunctions.addValuetoOption(
      await propertyExteriorOptions()
    );
    this.property_roof_options = otherFunctions.addValuetoOption(
      await propertyRoofOptions()
    );
    this.property_garaging_options = otherFunctions.addValuetoOption(
      await propertyGaragingOptions()
    );
    this.property_schoolzone_options = await propertySchoolZoneOptions();
    //set property land
    this.property.land = parseInt(
      otherFunctions.moneyRemoveFormat(this.property.land.toString())
    );
    // set match
    await this.getMatchedCustomer(1, 10);

    this.rows = this.customers.length;
    //set view history
    this.viewhistory = await getViewHistoryByProperty(this.property.propertyId);
    this.emailViewHistory = await getVhEmail(this.viewhistory);

    if (this.property.customerId == "empty") {
      this.owner = "empty";
      this.ifOwnerHave = true;
    } else {
      this.owner = await customerApi.getCustomer(this.property.customerId);
    }
    // set trade
    this.trade = this.getTradeJson(this.property.trade);

    //dialogue

    this.appraisalArr = DialogueArr.getAppraisalArr(this.property.appraisal);
    this.viewhistoryarr = DialogueArr.getViewHistoryArr(this.viewhistory);

    this.newAppraisal = Models.getNewAppraisal();
    this.propertyViewHistory = Models.getPropertyViewHistory();
    await this.addIdsToViewHistory();
  }

  async getMatchedCustomer(PageNum: number, PageSize: number) {
    this.localPerPage = PageSize;
    this.cPage = PageNum;
    const urlValue = `${this.getMatchString()}&PageNum=${PageNum}&PageSize=${PageSize}`;
    const apiResult = await customerApi.getCustomersByProperty(urlValue);
    this.customers = insertRightPage(
      PageNum,
      PageSize,
      modelCreate.getCustomers(apiResult.data.customers)
    );
    console.log(this.customers);
    this.setTable(apiResult.data.paginationMetadata);
  }

  @Watch("customers")
  updateCustomers(new_val: any) {
    this.customers = new_val;
  }

  setTable(pageApi: any) {
    const pagination = JSON.parse(pageApi);
    this.allrows = pagination.totalCount;
  }

  getFormatCV = () =>
    (this.editProperty.CV = otherFunctions.moneyFormat(
      otherFunctions.moneyRemoveFormat(this.editProperty.CV),
      true
    ));

  getFormatLand = () =>
    (this.editProperty.Land = otherFunctions.moneyFormat(
      otherFunctions.moneyRemoveFormat(this.editProperty.Land),
      false
    ));

  showInfo = (attribute: string) => (this.propertyInfos[attribute] = false);

  showEdit = (attribute: string) => (this.propertyInfos[attribute] = true);

  setProperty() {
    this.property = store.state.searcherProperties[store.state.showProperty];
    this.legalOwner = this.property.legalOwner
      ? this.property.legalOwner[0]
      : {
          ownerName: "",
          mailName: "",
          dearName: "",
          postalSuburb: "",
        };
    //this.editProperty = getEditProperty(this.property, this.legalOwner);
    this.defaultSubdivision = otherFunctions.getYesAndNofromDB(
      this.property.subdivision
    );
    this.defaultAddvalue = otherFunctions.getYesAndNofromDB(
      this.property.addValue
    );
  }

  async addIdsToViewHistory() {
    let iddata = await customerApi.getCustomerIds("...");
    for (let i = 0; i < iddata.data.length; i++) {
      this.propertyViewHistory[0][1][2].push(iddata.data[i]);
    }
  }

  ifcustomerExist(customerId: string) {
    return customerId == "empty";
  }

  handleSelect(event: any) {
    this.propertyAttributes = allFalse(this.propertyAttributes);
    this.propertyAttributes[event] = true;
  }

  selectChange = (obj: any) => this.editProperty.propertyChange(obj);

  editLeaglOwnerFn = () =>
    (this.propertyAttributes.editOwner = !this.propertyAttributes.editOwner);

  async uploadOneFile(obj: any) {
    this.appraisal = obj;
    let result = await filesApi.uploadFile(obj);
  }

  async getDialogueVal(obj: any) {
    this.saveResult = dialogueType.TRUE;
    this.saveResult = dialogueType.LOADDING;
    const result: boolean = await this.editProperty.updateValue(
      this.property.customerId,
      this.property.propertyId,
      obj
    );
    if (result) {
      this.saveResult = dialogueType.SUCCESS;
      await this.success();
    } else {
      this.saveResult = dialogueType.FAIL;
    }
  }

  async addNewVaule(obj: any) {
    this.saveResult = dialogueType.TRUE;
    this.saveResult = dialogueType.LOADDING;
    const result: any = await this.editProperty.addValue(
      this.property.customerId,
      this.property.propertyId,
      obj,
      this.appraisal
    );

    if (result.propertyVH) {
      let customer = await customerApi.getCustomer(result.customerId);
      customer = await getUpdatedClient(customer);

      let labelValue = await propertyLabelapi.getLabelByPropertyId(
        result.propertyId
      );
      if (!customer.propertyLabels.includes(labelValue.labelNumber)) {
        customer.propertyLabels += "," + labelValue.labelNumber;
        let editCustomer = getEditCustomer(customer);
        const loginUser: User = getStoreUser();
        editCustomer.update(loginUser.email);
      }
    }

    if (result.status == 201) {
      this.saveResult = dialogueType.SUCCESS;
      await this.success();
    } else {
      this.saveResult = dialogueType.FAIL;
    }
  }

  async success() {
    let property = await propertyApi.getProperty(this.property.propertyId);
    this.viewhistory = await getViewHistoryByProperty(this.property.propertyId);
    this.emailViewHistory = await getVhEmail(this.viewhistory);
    this.appraisalArr = DialogueArr.getAppraisalArr(this.property.appraisal);
    let index = store.state.showProperty;
    store.state.searcherProperties[index] = property;

    this.newAppraisal = Models.getNewAppraisal();
    this.propertyViewHistory = Models.getPropertyViewHistory();

    this.propertyInfos = allFalse(this.propertyInfos);

    this.setProperty();
  }

  saveUpdate = async () => {
    this.loading.show();

    const propertyResult = await this.editProperty.updateProperty();
    await this.success();
    this.alert.showSuccess("success", this.alert);
    this.loading.disappear();
  };

  saveUpdateLegalOwner = async () => {
    this.loading.show();
    const haveLegalOwner = this.editProperty.haveLegalOwner(this.property);
    let legalOnwerResult: any;

    if (haveLegalOwner) {
      legalOnwerResult = await this.editProperty.addLegalOwners();
    } else {
      legalOnwerResult = await this.editProperty.updateLegalOwner();
    }

    await this.success();
    this.alert.showSuccess("success", this.alert);
    this.loading.disappear();
    console.log(this.editProperty);
  };

  // mail
  async openMailBox() {
    let idArray = [];
    /*for(let vh of this.viewhistory){
      if(vh.ifChoose == "accepted"&&idArray.indexOf(vh.customerId) ==-1){
        idArray.push(vh.customerId)
      }
    }
    let customers = await customerApi.getCHcustomeres(idArray)
    */
    let tostring = "";
    let namestring = "";
    for (let vh of this.emailViewHistory) {
      if (vh.ifChoose == "accepted") {
        tostring += `${vh.email};`;
        namestring += `${vh.name};`;
      }
    }
    this.mailToString = tostring;
    this.mailNameString = namestring;
    this.$bvModal.show("mailbox");
  }

  async sendmail(obj: any) {
    const team: Team = getStoreTeam();
    this.mailResult = "ini";
    let emailbodys = {
      fromname: team.teamName,
      fromemail: team.teamId,
      tonamearr: obj.nameArray,
      toemailarr: obj.toarr,
      subject: obj.subject,
      context: obj.context,
      attachment: obj.attachment,
    };
    this.ifloadingMail = "true";
    let result = await googleApi.sendEmails(emailbodys);
    this.ifloadingMail = "false";
    this.mailResult = result == 200 ? "true" : "false";
  }

  //trade

  getTradeJson(trades: any) {
    let tradeArr: any[] = [];
    trades.forEach((value: any) => {
      let buyerarr = value.buyer.split("%");
      let sellarr = value.seller.split("%");
      let newtrade = {
        tradeId: value.tradeId,
        buyerName: buyerarr[0],
        buyerId: buyerarr[1],
        sellName: sellarr[0],
        sellId: sellarr[1],
        time: value.Time,
        value: value.value,
        propertyId: value.propertyId,
      };
      tradeArr.push(newtrade);
    });
    return tradeArr;
  }

  getMatchString() {
    return `?addValue=${this.property.addValue.toString()}&bathroom=${this.property.bathroom.toString()}&bedroom=${
      this.property.bedroom
    }
            &city=${this.property.city.toString()}&exterior=${this.property.exterior.toString()}&garaging=${this.property.garaging.toString()}
            &land=${this.property.land.toString()}&property_Type=${this.property.propertyType.toString()}&roof=${this.property.roof.toString()}
            &school_Zone=${this.property.schoolZone.toString()}&streetName=${this.property.streetName.toString()}&subdivision=${this.property.subdivision.toString()}
            &suburb=${this.property.suburb.toString()}&title=${this.property.title.toString()}&budgetRange=${
      this.property.budgetRange
    }`;
  }

  async chooseCustomer(customer: any) {
    if (customer != "empty") {
      const store_clients = store.state.searcherCustomers;
      store_clients[0] = this.owner;
      store.commit("saveCustomerSearchResult", store_clients);
      store.commit("saveCustomer", 0);
      this.$router
        .push({
          path: "customershow",
          query: {
            id: Math.ceil(Math.random() * 100).toString(),
          },
        })
        .catch((err: any) => {
          err;
        });
    }
  }

  chooseTrade(trade: any) {
    //console.log(trade);
  }

  download(document: string) {
    let url = `https://raincrmstorage.blob.core.windows.net/appraisals/${document}`;
    window.open(url, "_blank");
  }

  async addNewOwner(id: string) {
    let righttime = new Date().toISOString();
    await propertyApi.updatePropertyTrade(
      id,
      "All",
      righttime,
      this.property.propertyId
    );
    this.owner = await customerApi.getCustomer(id);
  }

  async deleteOwner() {
    this.loading.show();
    let righttime = new Date().toISOString();
    await propertyApi.updatePropertyTrade(
      "empty",
      "All",
      righttime,
      this.property.propertyId
    );
    this.ifOwnerHave = true;
    this.owner = [];
    store.state.searcherProperties[store.state.showProperty].customerId = "empty"
    this.loading.disappear();
    // update in properties
  }

  toCustomerId = async (CustomerId: string) => {
    await toClient(CustomerId, this);
  };
}
</script>

<style scoped>
.propertyBack {
  background-color: #f7f7f7;
  width: 90%;
  position: absolute;
}

.leftPart {
  width: 20%;
  margin-right: 5%;
}

.propertyInfo {
  margin: 1rem 1rem 2rem 1rem;
  display: flex;
}

.rows {
  display: flex;
}

.rowlabel {
  width: 50%;
}

.titlename {
  font-weight: bold;
}

#matchTitle {
  font-weight: bold;
  text-align: left;
}

.otherbox {
  margin-bottom: 1.5rem;
}

a:hover {
  background-color: yellow;
  cursor: pointer;
}

.title {
  font-weight: bold;
  text-align: left;
}

.divisionfivbox {
  display: flex;
  width: 20%;
}

.elementtitle {
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

a:hover {
  background-color: yellow;
  cursor: pointer;
}

h6 {
  font-size: large;
  word-wrap: break-word;
  text-align: left;
}

.appraisalbox {
  display: flex;
  width: 25%;
}

.clientTitle {
  font-size: large;
  font-weight: bold;
  border-bottom: 1px solid #6b6a6a;
  text-align: left;
  font-family: Didot;
  background-color: rgb(233, 233, 233);
}

.clientText {
  text-align: left;
}

.el-menu-demo {
  height: 40px;
  width: 100%;
}

.el-menu--horizontal > .el-menu-item {
  height: 40px;
  line-height: 40px;
}

.card-body {
  padding: 5px;
}

.childBoxP {
  text-align: center;
  margin-bottom: 10px;
}

.childBoxPleft {
  text-align: left;
  margin-bottom: 10px;
  margin-left: 1px;
}

.childBoxTitle {
  margin-top: 10px;
  border-bottom: 1px solid #6b6a6a;
  display: flex;
}

.numberBox {
  width: 200px;
  height: 35px;
  margin-top: 10px;
}

.buttons {
  margin-left: 20%;
}

.rightPart {
  width: 75%;
}
.land {
  margin-top: 15px;
  width: 150px;
}

.bedRoom {
  margin-top: 15px;
  width: 150px;
}

.bathRoom {
  margin-top: 15px;
  width: 150px;
}
/* ipad */
@media screen and (max-width: 1200px) {
  .el-menu--horizontal > .el-menu-item {
    height: 40px;
    line-height: 40px;
    width: 90px;
    font-size: small;
    padding: 0;
  }

  .propertyInfo {
    margin: 1rem 1rem 2rem 1rem;
    display: inline;
  }

  .leftPart {
    width: 100%;
    margin-right: 0;
  }
  .basicPart {
    display: flex;
  }
  .rightPart {
    width: 100%;
  }

  .bedRoom {
    margin-top: 15px;
    width: 70px;
  }

  .land {
    margin-top: 15px;
    width: 40px;
  }

  .bathRoom {
    margin-top: 15px;
    width: 70px;
  }
}
</style>
