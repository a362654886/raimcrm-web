import { ifClientExist } from "../functions/publicFn";

export class ViewHistory {
  customerId: string;
  propertyId: string;
  VhTime: Date;
  context: string;
  VHId: string;
  ifChoose: string;
  constructor(
    $customerId = "",
    $propertyId = "",
    $VhTime: Date,
    $context = "",
    $VHId = "",
    $ifChoose = "not_accepted"
  ) {
    this.customerId = $customerId;
    this.propertyId = $propertyId;
    this.VhTime = $VhTime;
    this.context = $context;
    this.VHId = $VHId;
    this.ifChoose = $ifChoose;
  }
}

export class EmailViewHistory {
  customerId: string;
  propertyId: string;
  VhTime: Date;
  context: string;
  VHId: string;
  ifChoose: string;
  email: string;
  name: string;
  type: string;
  constructor(
    $customerId = "",
    $propertyId = "",
    $VhTime: Date,
    $context = "",
    $VHId = "",
    $ifChoose = "not_accepted",
    $email = "",
    $name = "",
    $type = ""
  ) {
    this.customerId = $customerId;
    this.propertyId = $propertyId;
    this.VhTime = $VhTime;
    this.context = $context;
    this.VHId = $VHId;
    this.ifChoose = $ifChoose;
    this.email = $email;
    this.name = $name;
    this.type = $type;
  }
}

export const getEmailViewHistory = (viwHistory: ViewHistory) =>
  new EmailViewHistory(
    viwHistory.customerId,
    viwHistory.propertyId,
    viwHistory.VhTime,
    viwHistory.context,
    viwHistory.VHId,
    viwHistory.ifChoose,
    "",
    "",
    ""
  );

export const getVhEmail = async (viewHistories: ViewHistory[]) => {
  const emailViewHistory: EmailViewHistory[] = [];
  if (viewHistories) {
    for (let c of viewHistories) {
      const newEmailViewHistory = getEmailViewHistory(c);
      if (c.customerId == "empty") {
        let nameEmail = c.context.split(",")[1];
        let email = nameEmail.split(":")[1];
        let nameName = c.context.split(",")[0];
        let name = nameName.split(":")[1];

        newEmailViewHistory.email = email;
        newEmailViewHistory.name = name;

        let client = await ifClientExist("0", newEmailViewHistory.email.trim());

        if (client != null) {
          newEmailViewHistory.customerId = client.customerID;
          newEmailViewHistory.type = "client";
        } else {
          newEmailViewHistory.type = "lead";
        }
      } else {
        newEmailViewHistory.email = c.customerId.split(",")[1];
        newEmailViewHistory.name = c.customerId.split(",")[0];
        newEmailViewHistory.type = "client";
      }
      emailViewHistory.push(newEmailViewHistory);
    }
  }
  return emailViewHistory;
};
