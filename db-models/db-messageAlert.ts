export class MessageAlert {
  alertId: string;
  time: Date;
  context: string;
  type: string;
  ifRead: boolean;
  userId: string;
  customerId: string;
  constructor(
    $alertId = "",
    $time: Date,
    $context = "",
    $type = "",
    $ifRead = "false",
    $userId = "",
    $customerId = ""
  ) {
    this.alertId = $alertId;
    this.time = $time;
    this.context = $context;
    this.type = $type;
    this.ifRead = this.ifReadMessage($ifRead);
    this.userId = $userId;
    this.customerId = $customerId;
  }

  ifReadMessage = (ifRead: string) => (ifRead == "false" ? false : true);
}
