export class Lead {
    teamId: string;
    userId: string;
    name: string;
    phone: string;
    email: string;
    note: string;
    uploadTime: Date;
    Archive: boolean;
    leadId: string;
    address: string;
    resourceName: string;
    labels: string;
    constructor($teamId = "", $userId = "",$name = "",$phone = "",
                $email = "", $note = "",$uploadTime: Date, $Archive = false,$leadId = "",$address = "",$resourceName = "",$labels = "") {
        this.teamId = $teamId;
        this.userId = $userId;
        this.name = $name;
        this.phone = $phone;
        this.email = $email;
        this.note = $note;
        this.uploadTime = $uploadTime;
        this.Archive = $Archive;
        this.leadId = $leadId;
        this.address = $address;
        this.resourceName = $resourceName;
        this.labels = $labels
    }
}