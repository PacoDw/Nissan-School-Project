const Api = require('./Api');

function officeManagerApi(){}

officeManagerApi.addOfficeManager = function(dataForm) {

    return Promise.resolve (
        Api
            .post('/officeManager/addOfficeManager', dataForm)

            .then( Api.parseJSON )
            .then( response => {
                if (response.ok)
                    return response.json;
                else
                    return Promise.reject(response.json);
            })
    )
}

officeManagerApi.deleteOfficeManager = function( id ) {

    return Promise.resolve( 
        Api
            .delete(`/officeManager/deleteOfficeManager/${id}`)            
        )
}

officeManagerApi.getOfficeManagers = function(callback){

    return Promise.resolve (
        Api
            .get('/officeManager/AllOfficeManagers')
            
            .then( response => {
                if (response.ok){
                    return response.json() 
                }
                else 
                    Promise.reject({error : 'Algo salio mal en Get all officeManagers'}) 
            })

            .then( data =>  callback(data) )
        );
}

officeManagerApi.getOfficeManagersWithoutAccount = function(callback){

    return Promise.resolve (
        Api
            .get('/officeManager/officeManagersWithoutAccount')
            
            .then( response => {
                if (response.ok){
                    if (response.bodyUsed)
                        return response.json() 
                    else 
                        return undefined;
                }
                else 
                    Promise.reject({error : 'Algo salio mal en Get Without Account'}) 
            })

            .then( data =>  callback(data) )
        );
}



module.exports = officeManagerApi;