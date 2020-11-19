import * as clientHelpers from '../helpers/clientHelpers'


describe('testing auth', function(){
    it('Create a new client', function(){
       clientHelpers.createClientRequestAfterget(cy)
    })

    it('Get all clients', function(){
        clientHelpers.getAllClientsRequest(cy)
     })
     it('Creat a client and delete it',function(){
      clientHelpers.createClientRequestAndDelete(cy)
     })
     it('Creat a new client then edit it',function(){
      clientHelpers.createClientRequestAndEdit(cy)
     })

})