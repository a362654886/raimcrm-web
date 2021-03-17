import {Vue} from "vue-property-decorator";
import configfn from "@/api/config";
import { getGoogleLabel, getTeamToken } from "../../functions/publicFn";

const basicURL = "https://people.googleapis.com/v1/";
const key = `key=AIzaSyBDzFv2a_ztAgCj1788xHLkktKEScmqhj4`;

export default {
    async getPeople(attribute: string) {
        let result: any = 0;
        let token: any = await getTeamToken();
        let config = configfn.getconfig(token);
        let enpoint = basicURL + `people/me/connections?personFields=${attribute}&` + key;
        await Vue.axios.get(enpoint, config)
            .then(response => {
                let googlePersons: any[] = []
                response.data.connections.forEach((value: any) => {
                    let name = "";
                    let email = "";
                    let phone = "";
                    let address = "";
                    let labels = "";
                    value.names == undefined ? name = "" : name = value.names[0].displayName
                    value.emailAddresses == undefined ? email = "" : email = value.emailAddresses[0].value
                    value.phoneNumbers == undefined ? phone = "" : phone = value.phoneNumbers[0].value
                    value.addresses == undefined ? address = "" : address = value.addresses[0].formattedValue
                    if(value.memberships !=undefined){
                        labels = getGoogleLabel(value.memberships)
                    }
                    let googleperson = {
                        name: name,
                        email: email,
                        phone: phone,
                        address: address,
                        resourceName:value.resourceName,
                        labels: labels
                    }
                    googlePersons.push(googleperson);
                })
                result = {status: response.status, data: googlePersons};
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async getOnePeople(resourceName: string){
        const attribute = "names%2Cbirthdays%2CemailAddresses%2CphoneNumbers%2Cmemberships%2Caddresses"
        let result: any;
        let token: any = await getTeamToken();
        let config = configfn.getconfig(token);
        let enpoint = basicURL + `${resourceName.toString()}?personFields=${attribute}&` + key;
        await Vue.axios.get(enpoint, config)
            .then(response => {
                result =  response.data
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async getEtag(resourceName: string){
        let enpoint = basicURL + `${resourceName}?personFields=names&` + key;
        let token: any = await getTeamToken();
        let config = configfn.getconfig(token);
        let result: any = "";
        await Vue.axios.get(enpoint, config)
            .then(response => {
                result = {status: response.status, data: response.data};
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async getLabelsId() {
        let enpoint = basicURL + `contactGroups?` + key;
        let token: any = await getTeamToken();
        let config = configfn.getconfig(token);
        let result: any = "";
        await Vue.axios.get(enpoint, config)
            .then(response => {
                result = {
                    "buyer": "",
                    "vender": "",
                    "solicitor": "",
                    "potential_vender": ""
                }
                response.data.contactGroups.forEach((value: any) => {
                    (value.name == "buyer") ? result.buyer = value.resourceName : "";
                    (value.name == "vender") ? result.vender = value.resourceName : "";
                    (value.name == "solicitor") ? result.solicitor = value.resourceName : "";
                    (value.name == "potential vender") ? result.potential_vender = value.resourceName : "";
                })
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async postLabel(labelName: string, tokenString: string) {
        let enpoint = basicURL + `contactGroups?` + key;
        let token: any = ""
        console.log(tokenString)
        if(tokenString == "" || tokenString == null){
            token = await getTeamToken();
        }else{
            token = tokenString;
        }
        console.log(token)
        let config = configfn.getconfig(token);
        let result: any = "";
        await Vue.axios.post(enpoint, {
            "contactGroup": {
                "name": labelName
            }
        }, config)
            .then(response => {
                result = {
                    "resourceName": response.data.resourceName,
                    "name": response.data.name,
                }

            })
            .catch(error => {
                result =  429
            })
        return result;
    },
    async deleteLabel(labelRes: string) {
        let enpoint = basicURL + labelRes+`?` + key;
        let token: any = await getTeamToken();
        let config = configfn.getconfig(token);
        let result: any = "";
        await Vue.axios.delete(enpoint, config)
            .then(response => {
                result = 200

            })
            .catch(error => {
                result =  429
            })
        return result;
    },
    async postPeople(data: any) {
        let enpoint = basicURL + `people:createContact?` + key;
        let token: any = await getTeamToken();
        let config = configfn.getconfig(token);
        let body = this.getBody(data)
        let result: any = "";
        await Vue.axios.post(enpoint, body, config)
            .then(response => {
                    result = response
                }
            ).catch(error => {
                console.log(error)
            })
        return result
    },
    async updatePeople(url: string,data: any) {
        ///c70705061791656723:updateContact?updatePersonFields=names
        let enpoint = basicURL + `${data.resourceName}:updateContact?updatePersonFields=`+ url+ "&" + key;
        let token: any = await getTeamToken();
        let config = configfn.getconfig(token);
        let body = this.getUpdateBody(data)
        let result: any = "";
        await Vue.axios.patch(enpoint, body, config)
            .then(response => {
                    result = response
                }
            ).catch(

            )
        return result
    },
    async deletePeople(resourceName: string) {
        let enpoint = basicURL + `${resourceName}:deleteContact?`+ key;
        let token: any = await getTeamToken();
        let config = configfn.getconfig(token);
        let result: any = "";
        await Vue.axios.delete(enpoint,config)
            .then(response => {
                    result = response
                }
            ).catch(

            )
        return result
    },
    getBody(data: any) {
        return {
            "names": [
                {
                    "familyName": data?.lastName,
                    "givenName": data?.firstName,
                    "middleName": data?.middleName
                }
            ],
            "memberships": data?.labels,
            "birthdays": [
                {
                    "date": {
                        "year": data?.Byear,
                        "month": data?.Bmonth,
                        "day": data?.Bday
                    }
                }
            ],
            "addresses": [
                {
                    "streetAddress": data?.address
                }
            ],
            "emailAddresses": [
                {
                    "value": data?.email
                }
            ],
            "phoneNumbers": [
                {
                    "value": data?.homeNumber,
                    "type": "home",
                },
                {
                    "value": data?.workNumber,
                    "type": "work",
                },
                {
                    "value": data?.otherNumber,
                    "type": "other",
                }
            ]
        }
    },
    getUpdateBody(data: any) {
        return {
            "resourceName":data.resourceName,
            "etag":data.etag,
            "names": [
                {
                    "familyName": data?.lastName,
                    "givenName": data?.firstName,
                    "middleName": data?.middleName
                }
            ],
            "memberships": data?.labels,
            "birthdays": [
                {
                    "date": {
                        "year": data?.Byear,
                        "month": data?.Bmonth,
                        "day": data?.Bday
                    }
                }
            ],
            "addresses": [
                {
                    "streetAddress": data?.address
                }
            ],
            "emailAddresses": [
                {
                    "value": data?.email
                }
            ],
            "phoneNumbers": [
                {
                    "value": data?.homeNumber,
                    "type": "home",
                },
                {
                    "value": data?.workNumber,
                    "type": "work",
                },
                {
                    "value": data?.otherNumber,
                    "type": "other",
                }
            ]
        }
    }
}