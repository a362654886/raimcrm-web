import { Property } from "./db-property";
import otherFunctions from "../functions/otherFunctions";
import { ViewHistory } from "./db-viewhistory";
import { getViewHistoryByCustomer } from "@/api/viewHistoryApi";
import googlePeopleApi from "@/api/googlePeopleApi";
import store from "@/store";

export class Customer {
  index: string;
  appointment: Appointment[];
  buyRequirement: BuyRequirement[];
  email: string;
  family: Family[];
  name: string[];
  note: Note[];
  customerphone: any;
  postAddress: string;
  property: object;
  source: string;
  teamId: string;
  userId: string;
  label: any;
  labelstring: string;
  phonestring: string;
  recentNote: string;
  nameString: string;
  brithday: Date;
  customerID: string;
  resourceName: string;
  eTag: string;
  propertyLabels: string;

  constructor(
    $index = "",
    $appointment: Appointment[] = [],
    $buyRequirement: BuyRequirement[] = [],
    $email = "",
    $family: Family[] = [],
    $name: string[] = [],
    $note: Note[] = [],
    $customerphone = new Object(),
    $postAddress = "",
    $property: Property[] = [],
    $source = "",
    $teamId = "",
    $userId = "",
    $label = new Object(),
    $labelstring = "",
    $phonestring = "",
    $namestring = "",
    $brithday: Date,
    $customerID = "",
    $resourceName = "",
    $eTage: string,
    $propertyLabels = ""
  ) {
    this.index = $index;
    this.appointment = $appointment;
    this.buyRequirement = $buyRequirement;
    this.email = $email;
    this.family = $family;
    this.name = $name;
    this.note = $note;
    this.customerphone = $customerphone;
    this.postAddress = $postAddress;
    this.property = $property;
    this.source = $source;
    this.teamId = $teamId;
    this.userId = $userId;
    this.label = $label;
    this.labelstring = $labelstring;
    this.phonestring = $phonestring;
    this.recentNote = this.getRecentNote();
    this.nameString = $namestring;
    this.brithday = $brithday;
    this.customerID = $customerID;
    this.resourceName = $resourceName;
    this.eTag = $eTage;
    this.propertyLabels = $propertyLabels;
  }

  getRecentNote = () => {
    if (this.note.length == 0) {
      return "";
    }
    let date = this.note[0].nTime;
    this.note.forEach((note) => {
      if (note.nTime > date) {
        date = note.nTime;
      }
    });

    return otherFunctions.getDateString(date);
  };
}

export class Appointment {
  aTime: Date;
  appointmentId: string;
  task: string;

  constructor($aTime: Date, $appointmentId: string, $task = "") {
    this.aTime = $aTime;
    this.appointmentId = $appointmentId;
    this.task = $task;
  }
}

export class BuyRequirement {
  buyRequirementId: string;
  addValue: boolean;
  bathroom: string;
  bedroom: string;
  city: string;
  exterior: string;
  garaging: string;
  land: string;
  propertyType: string;
  roof: string;
  schoolZone: string;
  streetName: string;
  subdivision: boolean;
  suburb: string;
  title: string;
  titlestring: string;
  budgetRange: string;
  customerId: string;

  constructor(
    $buyRequirementId: string,
    $addValue = false,
    $bathroom = "0,1",
    $bedroom = "0,1",
    $city = "",
    $exterior = "",
    $garaging = "",
    $land = "",
    $propertyType = "",
    $roof = "",
    $schoolZone = "",
    $streetName = "",
    $subdivision = false,
    $suburb = "",
    $title = "",
    $budgetRange = "",
    $customerId = ""
  ) {
    this.buyRequirementId = $buyRequirementId;
    this.addValue = $addValue;
    this.bathroom = $bathroom;
    this.bedroom = $bedroom;
    this.city = $city;
    this.exterior = $exterior;
    this.garaging = $garaging;
    this.land = $land;
    this.propertyType = $propertyType;
    this.roof = $roof;
    this.schoolZone = $schoolZone;
    this.streetName = $streetName;
    this.subdivision = $subdivision;
    this.suburb = $suburb;
    this.title = $title;
    this.titlestring = this.getTitle();
    this.budgetRange = $budgetRange;
    this.customerId = $customerId;
  }

  getTitle() {
    let titlearr = this.title.split(",");
    let result = "";
    titlearr.forEach((value) => {
      switch (value) {
        case "CrossLease(F)":
          result += "CrossLease(Freehold)" + ",";
          break;
        case "CrossLease(L)":
          result += "CrossLease(Leasehold)" + ",";
          break;
        default:
          result += value + ",";
      }
    });
    return result.substring(0, result.length - 1);
  }
}

export class Family {
  brithday: Date;
  name: string;
  phone: string;
  relationship: string;
  Id: string;
  email: string;
  ifclient: any;

  constructor(
    $brithday: Date,
    $name = "",
    $phone = "",
    $relationship = "",
    $Id = "",
    $email = "",
    $ifclient = false
  ) {
    this.brithday = $brithday;
    this.name = $name;
    this.phone = $phone;
    this.relationship = $relationship;
    this.Id = $Id;
    this.email = $email;
    this.ifclient = $ifclient;
  }
}

export class Note {
  context: string;
  nTime: Date;
  type: string;
  noteIndex: string;
  Id: string;

  constructor(
    $context = "",
    $nTime: Date,
    $type = "",
    $noteIndex = "",
    $Id = ""
  ) {
    this.context = $context;
    this.nTime = $nTime;
    this.type = $type;
    this.noteIndex = $noteIndex;
    this.Id = $Id;
  }
}

export class Phone {
  Id: string;
  home: string;
  mobile: string;
  work: string;

  constructor($Id = "", $home = "", $mobile = "", $work = "") {
    this.Id = $Id;
    this.home = $home;
    this.mobile = $mobile;
    this.work = $work;
  }

  getstring() {
    let result = "";
    if (this.home != "0" && this.home != "") {
      result = `${this.home} `;
      return result;
    }
    if (this.mobile != "0" && this.mobile != "") {
      result = `${this.mobile} `;
      return result;
    }
    if (this.work != "0" && this.work != "") {
      result = `${this.work} `;
      return result;
    }
  }
}

export class Label {
  buyer: string;
  potentialVender: string;
  vender: string;
  solicitors: string;
  Id: string;

  constructor(
    $buyer = "",
    $potentialVender = "",
    $vender = "",
    $solicitors = "",
    $Id = ""
  ) {
    this.buyer = $buyer;
    this.potentialVender = $potentialVender;
    this.vender = $vender;
    this.solicitors = $solicitors;
    this.Id = $Id;
  }

  getstring() {
    let result = "";
    if (this.buyer != "") {
      result = this.buyer + ",";
    }
    if (this.potentialVender != "") {
      result += this.potentialVender + ",";
    }
    if (this.solicitors != "") {
      result += this.solicitors + ",";
    }
    if (this.vender != "") {
      result += this.vender + ",";
    }
    return result.substring(0, result.length - 1);
  }
}

export const getUpdatedClient = async (customer: Customer) => {
  //1. get data from google
  //const eTag = await googlePeopleApi.getEtag(customer.resourceName);


  //TO DO if labels more than 30?
  const google_client = await googlePeopleApi.getOnePeople(
    customer.resourceName
  );
  console.log(google_client)
  //brithday
  if (google_client?.birthdays) {
    const date = `${google_client.birthdays[0].date.year}-${google_client.birthdays[0].date.month}-${google_client.birthdays[0].date.day}`;
    customer.brithday = new Date(date);
  }
  //name
  customer.name[0] = google_client.names[0].givenName
    ? google_client.names[0].givenName
    : customer.name[0];
  customer.name[2] = google_client.names[0].familyName
    ? google_client.names[0].familyName
    : customer.name[2];
  if (customer.name[1] == "null" || customer.name[1] == null) {
    customer.nameString = `${customer.name[0]} ${customer.name[2]}`;
  } else {
    customer.nameString = `${customer.name[0]} ${customer.name[1]} ${customer.name[2]}`;
  }
  //phone number
  if (google_client.phoneNumbers) {
    customer.customerphone.mobile = google_client.phoneNumbers[0]?.value
      ? google_client.phoneNumbers[0]?.value
      : customer.customerphone.mobile;
    customer.customerphone.home = google_client.phoneNumbers[1]?.value
      ? google_client.phoneNumbers[1]?.value
      : customer.customerphone.home;
  }
  //email
  if (google_client.emailAddresses) {
    customer.email = google_client.emailAddresses[0]?.value
      ? google_client.emailAddresses[0]?.value
      : customer.customerphone.home;
  }
  //addresses
  if (google_client.addresses) {
    customer.postAddress = google_client.addresses[0].formattedValue.replace(
      "NZ",
      ""
    );
  }
  //labels
  const labels: any = store.state.labelIds;
  let labelString = "";
  google_client.memberships.forEach((label: any) => {

    customer.label.buyer = "";
    customer.label.potentialVender = "";
    customer.label.solicitors = "";
    customer.label.vender = "";
    if (
      label.contactGroupMembership.contactGroupResourceName == labels.buyId
    ) {
      customer.label.buyer = "Buyer";
      labelString += "Buyer,";
    } else if (
      label.contactGroupMembership.contactGroupResourceName ==
      labels.potential_venderId
    ) {
      customer.label.potentialVender = "Potential_Vender";
      labelString += "Potential_Vender,";
    } else if (
      label.contactGroupMembership.contactGroupResourceName ==
      labels.solicitorId
    ) {
      customer.label.solicitors = "Solicitors";
      labelString += "Solicitors,";
    } else if (
      label.contactGroupMembership.contactGroupResourceName == labels.venderId
    ) {
      customer.label.vender = "Vender";
      labelString += "Vender,";
    } else {
      customer.propertyLabels +=
        label.contactGroupMembership.contactGroupResourceName + ",";
    }
  });
  customer.labelstring = labelString.substring(0, labelString.length - 1);
  return customer;
};
