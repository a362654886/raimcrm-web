import fileApi from "../src/api/filesApi";

const propertyTypeOptions = async () => {
    const arr = await fileApi.getFile("PropertyType");
    return arr;
  };

const titleOptions= async () => {
    const arr = await fileApi.getFile("Title");
    return arr;
  };
const statusOptions= async () => {
    const arr = await fileApi.getFile("Status");
    return arr;
  };
const propertyExteriorOptions= async () => {
    const arr = await fileApi.getFile("Exterior");
    return arr;
  };
const propertyRoofOptions= async () => {
    const arr = await fileApi.getFile("Roof");
    return arr;
  };
const propertyGaragingOptions= async () => {
    const arr = await fileApi.getFile("Garaging");
    return arr;
  };
const propertySchoolZoneOptions = async () => {
  const arr = await fileApi.getFile("SchoolZone");
  return arr;
};
const noteTypeOptions = async () => {
  const arr = await fileApi.getFile("NoteType");
  return arr;
};
const customerfield: any[] = [
  { key: "nameString", label: "Name", sortable: true },
  { key: "labelstring", label: "Label", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "phonestring", label: "Phone", sortable: true },
  { key: "source", label: "Source", sortable: true },
  { key: "recentNote", label: "Last Note", sortable: true },
];

const userfield: any[] = [
  { key: "email", label: "Email", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "role", label: "Role", sortable: true },
  { key: "teamId", label: "Team", sortable: true },
];
const teamfield: any[] = [
  { key: "team_ID", label: "Email", sortable: true },
  { key: "teamName", label: "Name", sortable: true },
  { key: "ifLogin", label: "State", sortable: true },
  { key: "Button", label: "Button", sortable: true }
];
const selectBox = [
  { value: "true", text: "Yes" },
  { value: "false", text: "No" },
  { value: "N/A", text: "N/A" },
];
const roleBox = [
  { value: "User", text: "User" },
  { value: "TeamManager", text: "TeamManager" },
  { value: "Administer", text: "Administer" },
];
const tradefield = [
  { key: "propertyId", label: "PropertyId", sortable: true },
  { key: "buyerName", label: "Buyer", sortable: true },
  { key: "sellName", label: "Seller", sortable: true },
  { key: "time", label: "Time", sortable: true },
  { key: "value", label: "Value", sortable: true },
];

const propertyfield = [
  { key: "propertyType", label: "Type", sortable: true },
  { key: "titlestring", label: "Title", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "housenumer", label: "Street Number", sortable: true },
  { key: "streetName", label: "Street", sortable: true },
  { key: "suburb", label: "Suburb", sortable: true },
  { key: "city", label: "City", sortable: true },
  { key: "bedroom", label: "Bedroom", sortable: true },
  { key: "bathroom", label: "Bathroom", sortable: true },
  { key: "land", label: "land", sortable: true },
  { key: "cv", label: "CV", sortable: true },
  { key: "exterior", label: "Exterior", sortable: true },
  { key: "roof", label: "Roof", sortable: true },
  { key: "garaging", label: "Garaging", sortable: true },
  { key: "schoolZone", label: "School Zone", sortable: true },
  { key: "schoolZone", label: "School Zone", sortable: true },
  { key: "budgetstring", label: "Budget", sortable: true },
  { key: "addValue", label: "Add Value", sortable: true },
  { key: "subdivision", label: "Subdivision", sortable: true },
];

const leadOptions = [
  { key: "teamId", label: "Team", sortable: true },
  { key: "userId", label: "User", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "phone", label: "Phone", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "address", label: "Address", sortable: true },
  { key: "note", label: "Note", sortable: true },
  { key: "labels", label: "labels", sortable: true },
  { key: "uploadTime", label: "UploadTime", sortable: true },
  { key: "Archive", label: "Archive", sortable: true },
  { key: "Button", label: "Button", sortable: true },
];

export {
  propertyTypeOptions,
  titleOptions,
  statusOptions,
  propertyExteriorOptions,
  propertyRoofOptions,
  propertyGaragingOptions,
  propertySchoolZoneOptions,
  noteTypeOptions,
  customerfield,
  selectBox,
  tradefield,
  propertyfield,
  leadOptions,
  roleBox,
  userfield,
  teamfield
};
