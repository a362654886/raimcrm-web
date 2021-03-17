import apiFunctions from "../functions/apiFunctions";
import otherFunctions from "../functions/otherFunctions";
import { LegalOwner, Property } from "./db-property";
import legalOwnerApi from "../src/api/legalOwner";
import propertyApi from "../src/api/propertyApi";

export class EditProperty {
  Property_ID: string;
  HouseNumber: string;
  Status: string;
  StreetName: string;
  Suburb: string;
  City: string;
  Visable: string;
  Title: string;
  Property_Type: string;
  Exterior: string;
  Roof: string;
  Garaging: string;
  Land: string;
  Bedroom: number;
  Bathroom: number;
  School_Zone: any[];
  CV: string;
  FormerOwner: string;
  LastUpdateCV: Date;
  Subdivision: string;
  Add_Value: string;
  Customer_ID: string;
  OwnerName: string;
  MailName: string;
  DearName: string;
  PostalSuburb: string;
  PostalAddress: string;

  constructor(
    $Property_ID = "",
    $HouseNumber = "",
    $Status = "",
    $StreetName = "",
    $Suburb = "",
    $City = "",
    $Visable = "Owner",
    $Title = "",
    $Property_Type = "",
    $Exterior = "",
    $Roof = "",
    $Garaging = "",
    $Land = "0",
    $Bedroom = 0,
    $Bathroom = 0,
    $School_Zone = [""],
    $CV = "",
    $FormerOwner = "",
    $LastUpdateCV = new Date(),
    $Subdivision = "",
    $Add_Value = "",
    $Customer_ID = "",
    $OwnerName = "",
    $MailName = "",
    $DearName = "",
    $PostalSuburb = "",
    $PostalAddress = ""
  ) {
    (this.Property_ID = $Property_ID),
      (this.HouseNumber = $HouseNumber),
      (this.Status = $Status),
      (this.StreetName = $StreetName),
      (this.Suburb = $Suburb),
      (this.City = $City),
      (this.Visable = $Visable),
      (this.Title = $Title),
      (this.Property_Type = $Property_Type),
      (this.Exterior = $Exterior),
      (this.Roof = $Roof),
      (this.Garaging = $Garaging),
      (this.Land = $Land),
      (this.Bedroom = $Bedroom),
      (this.Bathroom = $Bathroom),
      (this.School_Zone = $School_Zone),
      (this.CV = $CV),
      (this.FormerOwner = $FormerOwner),
      (this.LastUpdateCV = $LastUpdateCV),
      (this.Subdivision = $Subdivision),
      (this.Add_Value = $Add_Value),
      (this.Customer_ID = $Customer_ID),
      (this.OwnerName = $OwnerName),
      (this.DearName = $DearName),
      (this.MailName = $MailName),
      (this.PostalSuburb = $PostalSuburb),
      (this.PostalAddress = $PostalAddress);
  }

  propertyChange = (data: any) => this[data.type] = data.text

  getSubdivision = () => otherFunctions.getYesAndNofromDB(this.Subdivision)

  getAddValue = () => otherFunctions.getYesAndNofromDB(this.Add_Value)
  

  getTitle = () => {
    if(this.Title == "CrossLease(L)")
    {
      return "CrossLease(Leasehold)"
    }

    if(this.Title == "CrossLease(F)")
    {
      return "CrossLease(Freehold)"
    }
    return this.Title
  }

  getSaveTitle = () => {
    if(this.Title == "CrossLease(Leasehold)")
    {
      return "CrossLease(L)"
    }

    if(this.Title == "CrossLease(Freehold)")
    {
      return "CrossLease(F)"
    }
    return this.Title
  }

  show(){
    console.log(this)
  }

  addValue = async (
    customerId: string,
    propertyId: string,
    obj: any,
    appraisal: any
  ) => {
    const body: any = await apiFunctions.addNewValue(
      obj,
      {
        customerID: customerId,
        propertyID: propertyId,
      },
      appraisal
    );
    return body;
  };

  updateValue = async (customerId: string, propertyId: string, obj: any) => {
    obj.type = "viewhistoryP";
    const body: any = await apiFunctions.UpdateArrValue(obj, {
      customerID: customerId,
      propertyID: propertyId,
    });
    return body.status == 204 ? true : false;
  };

  haveLegalOwner = (property: Property) => property.legalOwner == null;

  getProperty = (editProperty: EditProperty) => {
    const property = {
      Property_ID: editProperty.Property_ID,
      HouseNumber: editProperty.HouseNumber,
      Status: editProperty.Status,
      StreetName: editProperty.StreetName,
      Suburb: editProperty.Suburb,
      City: editProperty.City,
      Visable: "Owner",
      Title: editProperty.getSaveTitle(),
      Property_Type: editProperty.Property_Type,
      Exterior: editProperty.Exterior,
      Roof: editProperty.Roof,
      Garaging: editProperty.Garaging,
      Land: otherFunctions.moneyRemoveFormat(editProperty.Land.toString()),
      Bedroom: editProperty.Bedroom,
      Bathroom: editProperty.Bathroom,
      School_Zone: otherFunctions.ArrToArrstring(editProperty.School_Zone),
      CV: otherFunctions.moneyRemoveFormat(editProperty.CV),
      FormerOwner: "",
      LastUpdateCV: editProperty.LastUpdateCV,
      Subdivision: editProperty.Subdivision,
      Add_Value: editProperty.Add_Value,
      Customer_ID: editProperty.Customer_ID,
    };
    return property;
  };

  getLegalOwner = (editProperty: EditProperty) => {
    const legalOwner = {
      Owner_ID: editProperty.Property_ID,
      Property_ID: editProperty.Property_ID,
      OwnerName: editProperty.OwnerName,
      MailName: editProperty.MailName,
      DearName: editProperty.DearName,
      PostalSuburb: editProperty.PostalSuburb,
      PostalAddress: editProperty.PostalAddress,
    };
    return legalOwner;
  };
  
  checkYesAndNo = (value: string) =>{
    if(value == "No"){
      return "false"
    }

    if(value == "Yes"){
      return "true"
    }

    return value
  } 

  addLegalOwners = async () =>{
    const legalOwner = this.getLegalOwner(this)
    return await legalOwnerApi.addLegalOwners([legalOwner]);
  }

  updateLegalOwner = async () =>{
    const legalOwner = this.getLegalOwner(this)
    return await legalOwnerApi.updateLegalOwner(legalOwner);
  }

  updateProperty = async () =>{
    this.Subdivision = this.checkYesAndNo(this.Subdivision)
    this.Add_Value = this.checkYesAndNo(this.Add_Value)
    const property = this.getProperty(this)
    return await propertyApi.updateProperty(property);
  }

  saveUpdate = (editProperty: EditProperty) => {
    //
  };

  
}

export const getEditProperty = (property: Property, legalOwner: LegalOwner) => {
  const ownerName = property.legalOwner ? property?.legalOwner[0].ownerName : "";
  const mailName = property.legalOwner ? property?.legalOwner[0].mailName : "";
  const dearName = property.legalOwner ? property?.legalOwner[0].dearName : "";
  const postalSuburb = property.legalOwner
    ? property?.legalOwner[0].postalSuburb
    : "";
  const postalAddress = property.legalOwner
    ? property?.legalOwner[0].postalAddress
    : "";
  return new EditProperty(
    property.propertyId,
    property.housenumer,
    property.status,
    property.streetName,
    property.suburb,
    property.city,
    "owner",
    property.title,
    property.propertyType,
    property.exterior,
    property.roof,
    property.garaging,
    property.land.toString(),
    property.bedroom,
    property.bathroom,
    otherFunctions.stringToArr(
      property.schoolZone
    ),
    property.cv,
    property.formerOwner,
    property.lastUpdateCV,
    property.subdivision,
    property.addValue,
    property.customerId,
    ownerName,
    dearName,
    mailName,
    postalSuburb,
    postalAddress
  );
};
