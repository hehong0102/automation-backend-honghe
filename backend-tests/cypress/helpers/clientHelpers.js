
const faker = require('faker')

const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_POST_CLIENT = 'http://localhost:3000/api/client/new'
const ENDPOINT_GET_CLIENT = 'http://localhost:3000/api/client/'
const fakeName = faker.name.firstName()
const fakeEmail = faker.internet.email()
const fakePhone = faker.phone.phoneNumber()
const name = faker.name.firstName()
const email = faker.internet.email()
const phone = faker.phone.phoneNumber()


function createRandomClientPayload(){
    
    const payload = {
        "name":fakeName,
        "email":fakeEmail,
        "telephone":fakePhone
    }

    return payload
}

function getRequestAllClientsWithAssertion(cy,name, email, telephone){
    // GET request to fetch all clients
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(name)
        expect(responseAsString).to.have.string(email)
        expect(responseAsString).to.have.string(telephone)
    }))
}

function getAllClientsRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
           
        }))
    }))
}

function deleteRequestsAfterGet(cy){
    // GET request to fetch all clients
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        let lastId=response.body[response.body.length -1].id
        cy.request({
            method:"DELETE",
            url:ENDPOINT_GET_CLIENT+lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },

        })
    }))
}

function editClientRequestAfterget(cy){
    
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        let lastIdForEdit=response.body[response.body.length -1].id
        cy.request({
            method:"put",
            url:ENDPOINT_GET_CLIENT+lastIdForEdit,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:{
                "id":lastIdForEdit,
                "name":fakeName,
                "email":fakeEmail,
                "telephone":fakePhone
                
            }

        }).then((response =>{               
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(fakeName)
         }))
 
         
     }))
    }


function createClientRequestAfterget(cy){
    cy.authenticateSession().then(response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
        let lastIdForCreate=response.body[response.body.length -1].id + 1
        
        
        // post request to create a client
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:{
                "id":lastIdForCreate,
                "name":name,
                "email":email,
                "telephone":phone

            }
        }).then((response =>{               
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(name)
        }))

        getRequestAllClientsWithAssertion(cy,name, email,phone)
    }))
   }
)}


function createClientRequestAndDelete(cy){
    cy.authenticateSession().then((response =>{
        let fakeClientPayload = createRandomClientPayload() 
        
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
               'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeClientPayload 
        }).then((response =>{               
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(fakeClientPayload.name)
        }))
        
        deleteRequestsAfterGet(cy)
    }))
}
function createClientRequestAndEdit(cy){
    cy.authenticateSession().then((response =>{
        let fakeClientPayload = createRandomClientPayload() 
        
        
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeClientPayload 
        }).then((response =>{               
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(fakeClientPayload.name)
        }))

        editClientRequestAfterget(cy)
    }))
}



module.exports = {
    createRandomClientPayload, 
    createClientRequestAfterget, 
    getAllClientsRequest,
    createClientRequestAndDelete,
    editClientRequestAfterget,
    createClientRequestAndEdit,
}