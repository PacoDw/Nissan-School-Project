const Api = require('./Api');

function GlobalManagerApi(){}

GlobalManagerApi.getAllTypeUserWithoutAccount = function(callback){

    return Promise.resolve (
        Api
            .get('/globalManager/allTypeUserWithoutAccount')
            
            .then( response => {
                if (response.ok){
                    return response.json() 
                }
                else 
                    Promise.reject({error : 'Algo salio mal en Get Without Global Manager Accounts'}) 
            })

            .then( data =>  callback(data) )
        );
}

module.exports = GlobalManagerApi;