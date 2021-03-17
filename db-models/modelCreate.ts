import {BuyRequirement, Family, Note, Phone, Label, Customer, Appointment} from "./db-customer";
import {Property, Appraisal, Trade} from "./db-property";
import {MessageAlert} from "./db-messageAlert";
import {ViewHistory} from "./db-viewhistory";
import otherFunctions from "../functions/otherFunctions";
import {Lead} from "./db-lead";
import {EventInput} from '@fullcalendar/vue'

export default {
    getCustomers(data: any) {
        let Customers: Customer[] = [];
        for (let customer of data) {
            let name: string[] = [];
            name.push(customer.first_Name);
            name.push(customer.middle_Name);
            name.push(customer.last_Name);
            let newphone = new Phone("0", "0", "0", "0");
            if (customer.phone != null) {
                newphone = new Phone(customer.phone.phone_ID, customer.phone.home, customer.phone.mobile, customer.phone.work);
            }
            let newLabel = new Label(customer.u_Label.buyer, customer.u_Label.potential_Vender, customer.u_Label.vender,
                customer.u_Label.solicitors, customer.u_Label.label_ID);

            let newCustomer: Customer = new Customer(
                customer.customer_ID,
                this.getAppointment(customer.appointments),
                this.getBuyrequirements(customer.buyRequirement),
                customer.email,
                this.getFamilies(customer.family),
                name,
                this.getNotes(customer.notes),
                newphone,
                customer.post_Address,
                this.getPropperties(customer.properties),
                customer.source,
                customer.team_ID,
                customer.user_ID,
                newLabel,
                newLabel.getstring(),
                newphone.getstring(),
                this.getnamestring(name),
                customer.brithDay,
                customer.customer_ID,
                customer.resourceName,
                customer.etag
            )
            Customers.push(newCustomer);
        }
        return Customers;
    },
    getcustomer(customer: any) {
        let name: string[] = [];
        name.push(customer.first_Name);
        name.push(customer.middle_Name);
        name.push(customer.last_Name);
        let newphone = new Phone("0", "0", "0", "0");
        if (customer.phone != null) {
            newphone = new Phone(customer.phone.phone_ID, customer.phone.home, customer.phone.mobile, customer.phone.work);
        }
        let newLabel = new Label(customer.u_Label.buyer, customer.u_Label.potential_Vender, customer.u_Label.vender,
            customer.u_Label.solicitors, customer.u_Label.label_ID);
        let newCustomer: Customer = new Customer(
            customer.customer_ID,
            this.getAppointment(customer.appointments),
            this.getBuyrequirements(customer.buyRequirement),
            customer.email,
            this.getFamilies(customer.family),
            name,
            this.getNotes(customer.notes),
            newphone,
            customer.post_Address,
            this.getPropperties(customer.properties),
            customer.source,
            customer.team_ID,
            customer.user_ID,
            newLabel,
            newLabel.getstring(),
            newphone.getstring(),
            this.getnamestring(name),
            customer.brithDay,
            customer.customer_ID,
            customer.resourceName,
            customer.etag
        )
        return newCustomer;
    },
    getnamestring(namestring: string[]) {
        if (namestring[1] == "null" || namestring[1] == null) {
            return `${namestring[0]} ${namestring[2]}`;
        } else {
            return `${namestring[0]} ${namestring[1]} ${namestring[2]}`;
        }
    },
    getBuyrequirements(data: any) {
        let Buyrequirements: BuyRequirement[] = [];
        if (data != null) {
            for (let buyRequirement of data) {
                let newBuyrequirement = new BuyRequirement(
                    buyRequirement.buyRequirement_ID,
                    buyRequirement.add_Value,
                    buyRequirement.bathroom,
                    buyRequirement.bedroom,
                    buyRequirement.city,
                    buyRequirement.exterior,
                    buyRequirement.garaging,
                    `${buyRequirement.landMin},${buyRequirement.landMax}`,
                    buyRequirement.property_Type,
                    buyRequirement.roof,
                    buyRequirement.school_Zone,
                    buyRequirement.streetName,
                    buyRequirement.subdivision,
                    buyRequirement.suburb,
                    buyRequirement.title,
                    `${buyRequirement.budgetRangeMin},${buyRequirement.budgetRangeMax}`,
                    buyRequirement.customer_ID
                )
                Buyrequirements.push(newBuyrequirement);
            }
        }
        return Buyrequirements;
    },
    getFamilies(data: any) {
        let Familes: Family[] = [];
        if (data != null) {
            for (let family of data) {
                let newfamily = new Family(
                    family.brithDay,
                    family.name,
                    family.phone,
                    family.relationship,
                    family.family_ID,
                    family.email
                )
                Familes.push(newfamily);
            }
        }
        return Familes;

    },
    getAppointment(data: any) {
        let Appointments: Appointment[] = [];
        if (data != null) {
            for (let appointment of data) {
                let newappointment = new Appointment(
                    appointment.a_Time,
                    appointment.appointment_ID,
                    appointment.task
                )
                Appointments.push(newappointment);
            }
        }
        return Appointments;

    },
    getNotes(data: any) {
        let Notes: Note[] = [];
        if (data != null) {
            for (let note of data) {
                let newNote = new Note(
                    note.context,
                    note.n_Time,
                    note.type,
                    note.note_index,
                    note.note_ID
                )
                Notes.push(newNote);
            }
        }
        return Notes;
    },
    getPropperties(data: any) {
        let Properties: Property[] = [];
        if (data != null) {
            for (let property of data) {
                let newProperty = new Property(
                    property.add_Value,
                    property.bathroom,
                    property.bedroom,
                    property.customer_ID,
                    property.city,
                    property.exterior,
                    property.garaging,
                    property.land,
                    this.getAppraisals(property.p_Apprasial),
                    property.property_Type,
                    property.roof,
                    property.school_Zone,
                    property.streetName,
                    property.subdivision,
                    property.suburb,
                    property.title,
                    property.property_ID,
                    property.status,
                    property.houseNumber,
                    property.cv,
                    property.lastUpdateCV,
                    property.formerOwner,
                    this.getTrades(property.p_Trade),
                    property.lastTrade,
                    `${property.budgetMin}-${property.budgetMax}`,
                    `${otherFunctions.moneyFormat(property.budgetMin, true)} to ${otherFunctions.moneyFormat(property.budgetMax, true)}`,
                    property.p_LegalOwners
                )
                Properties.push(newProperty);
            }
        }
        return Properties;
    },
    getPropperty(property: any) {
        let newProperty = new Property(
            property.add_Value,
            property.bathroom,
            property.bedroom,
            property.customer_ID,
            property.city,
            property.exterior,
            property.garaging,
            property.land,
            this.getAppraisals(property.p_Apprasial),
            property.property_Type,
            property.roof,
            property.school_Zone,
            property.streetName,
            property.subdivision,
            property.suburb,
            property.title,
            property.property_ID,
            property.status,
            property.houseNumber,
            property.cv,
            property.lastUpdateCV,
            property.formerOwner,
            this.getTrades(property.p_Trade),
            property.lastTrade,
            `${property.budgetMin}-${property.budgetMax}`,
            `${property.budgetMin} to ${property.budgetMax}`,
            property.p_LegalOwners
        )
        return newProperty;
    },
    getAppraisals(data: any) {
        let Appraisals: Appraisal[] = [];
        if (data == null) {
            return Appraisals;
        }
        for (let appraisal of data) {
            let newAppraisal = new Appraisal(
                appraisal.ap_Time,
                appraisal.appraisal_ID,
                appraisal.document,
                appraisal.range,
                appraisal.u_email,
                appraisal.property_ID
            )
            Appraisals.push(newAppraisal);
        }
        return Appraisals;
    },
    getTrades(data: any) {
        let Trades: Trade[] = [];
        if (data == null) {
            return Trades;
        }
        for (let trade of data) {
            let newTrade = new Trade(
                trade.trade_ID,
                trade.time,
                trade.buyer,
                trade.seller,
                trade.value,
                trade.property_ID
            )
            Trades.push(newTrade);
        }
        return Trades;
    },
    getlead(lead: any) {
        let newLead: Lead = new Lead(
            lead.team_ID,
            lead.user_ID,
            lead.leadname,
            lead.phone,
            lead.email,
            lead.note,
            lead.uploadDate,
            lead.archive,
            lead.Lead_Id,
            lead.Address
        )
        return newLead;
    },
    getleads(leads: any) {
        let Leads: Lead[] = [];
        for (let lead of leads) {
            let newLead: Lead = new Lead(
                lead.team_ID,
                lead.user_ID,
                lead.leadName,
                lead.phone,
                lead.email,
                lead.note,
                lead.uploadDate,
                lead.archive,
                lead.lead_ID,
                lead.address,
                lead.resourceName,
                lead.labels
            )
            Leads.push(newLead);
        }
        return Leads;
    },
    getTasks(datas: any) {
        let Tasks: EventInput[] = [];
        for (let task of datas) {
            let time = new Date(task.time);
            if (task.type == "Brithday") {
                time.setFullYear(new Date().getFullYear());
            }
            let newtask = {
                id: task.id,
                title: 'Timed event',
                extendedProps: task,
                start: time
            }
            Tasks.push(newtask);
        }
        return Tasks;
    },
    getMessageAlert(messageAlert: any) {
        let newMessageAlert: MessageAlert = new MessageAlert(
            messageAlert.alert_ID,
            messageAlert.time,
            messageAlert.context,
            messageAlert.type,
            messageAlert.ifRead,
            messageAlert.user_ID,
            messageAlert.customer_ID
        )
        return newMessageAlert;
    },
    getMessageAlerts(messageAlerts: any) {
        let newMessageAlerts: MessageAlert[] = [];
        for (let messageAlert of messageAlerts) {
            let newMessageAlert: MessageAlert = new MessageAlert(
                messageAlert.alert_ID,
                messageAlert.time,
                messageAlert.context,
                messageAlert.type,
                messageAlert.ifRead,
                messageAlert.user_ID,
                messageAlert.customer_ID
            )
            newMessageAlerts.push(newMessageAlert);
        }
        return newMessageAlerts;
    }
}

export const getViewHistories = (data: any): ViewHistory[]  => {
    const ViewHistories: ViewHistory[] = [];
    if (data != null) {
        for (let viewHistory of data) {
            const newViewHistory = new ViewHistory(
                viewHistory.customer_ID,
                viewHistory.property_ID,
                viewHistory.vH_Time,
                viewHistory.context,
                viewHistory.viewHistory_ID,
                "not_accepted"
            )
            ViewHistories.push(newViewHistory);
        }
    }
    return ViewHistories;
}