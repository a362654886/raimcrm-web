
export class Property {
    addValue: string;
    bathroom: number;
    bedroom: number;
    customerId: string;
    city: string;
    exterior: string;
    garaging: string;
    land: number;
    appraisal: Appraisal[];
    propertyType: string;
    roof: string;
    schoolZone: string;
    streetName: string;
    subdivision: string;
    suburb: string;
    title: string;
    titlestring: string;
    propertyId: string;
    status: string;
    housenumer: string;
    fullAddress: string;
    cv: string;
    lastUpdateCV: Date;
    formerOwner: string;
    lastTrade: Date;
    trade: Trade[];
    budgetRange: string;
    budgetstring: string;
    legalOwner: LegalOwner[];
    constructor($addValue = "", $bathroom = 0, $bedroom = 0,$customerId= "",$city= "",$exterior = "",
                $garaging = "",$land = 0,$appraisal: Appraisal[] = [],$propertyType = "",$roof = "", $schoolZone = "",
                $streetName = "",$subdivision="",$suburb  = "",$title = "",$propertyId = "", $status = "",
                $housenumber = "",$cv = "",$lastUpdateCV: Date, $formerOwner = "",$trade: Trade[] = [], $lastTrade: Date,
                $budgetRange = "",$budgetstring = "",$legalOwner: LegalOwner[] = []) {
        this.addValue = this.getYesAndNo($addValue);
        this.bathroom = $bathroom;
        this.bedroom = $bedroom;
        this.customerId = $customerId;
        this.city = $city;
        this.exterior = $exterior;
        this.garaging = $garaging;
        this.land = $land;
        this.appraisal = $appraisal;
        this.propertyType = $propertyType;
        this.roof = $roof;
        this.schoolZone = $schoolZone;
        this.streetName = $streetName;
        this.subdivision = this.getYesAndNo($subdivision);
        this.suburb = $suburb;
        this.title = $title;
        this.propertyId = $propertyId;
        this.status = $status;
        this.housenumer = $housenumber;
        this.fullAddress = this.getAddress();
        this.titlestring = this.getTitle();
        this.cv = $cv;
        this.lastUpdateCV = $lastUpdateCV;
        this.formerOwner = $formerOwner;
        this.trade = $trade;
        this.lastTrade = $lastTrade;
        this.budgetRange = $budgetRange;
        this.budgetstring = $budgetstring;
        this.legalOwner = $legalOwner;
    }

    getAddress(){
        return `${this.housenumer}, ${this.streetName}, ${this.suburb}, ${this.city}`
    }

    getTitle(){
        let titlearr = this.title.split(",");
        let result = ""
        titlearr.forEach(value =>{
            switch(value){
                case "CrossLease(F)":
                    result += "CrossLease(Freehold)" + ",";
                    break;
                case "CrossLease(L)":
                    result += "CrossLease(Leasehold)" + ",";
                    break;
                default:
                    result += value + ",";
            }
        })
        return result.substring(0, result.length - 1);
    }

    getYesAndNo(value: string){
        let result = "";
        switch(value){
            case "true":
                result = "Yes";
                break;
            case "false":
                result = "No";
                break;
            case "N/A":
                result = "N/A";
                break;
        }
        return result;
    }
}

export class Appraisal {
    apTime: Date;
    appraisalId: string;
    document: string;
    range: string;
    uEmail: string;
    propertyId: string;
    constructor($apTime: Date, $appraisalId = "", $document = "",$range= "",$uEmail= "",$propertyId = "") {
        this.apTime = $apTime;
        this.appraisalId = $appraisalId;
        this.document = $document;
        this.range = $range;
        this.uEmail = $uEmail;
        this.propertyId = $propertyId;
    }
}

export class Trade {
    tradeId: string;
    Time: Date;
    buyer: string;
    seller: string;
    value: string;
    propertyId: string;
    constructor($tradeId = "", $Time: Date,$buyer = "",$seller= "",$value= "",$propertyId = "") {
        this.tradeId = $tradeId;
        this.Time = $Time;
        this.buyer = $buyer;
        this.seller = $seller;
        this.value = $value;
        this.propertyId = $propertyId;
    }
}

export class LegalOwner {
    legalId: string;
    ownerName: string;
    mailName: string;
    dearName: string;
    postalAddress: string;
    postalSuburb: string;
    constructor($legalId = "", $ownerName: string,$mailName = "",$dearName= "",$postalAddress = "",$postalSuburb= "") {
        this.legalId = $legalId;
        this.ownerName = $ownerName;
        this.mailName = $mailName;
        this.dearName = $dearName;
        this.postalAddress = $postalAddress;
        this.postalSuburb = $postalSuburb;
    }
}