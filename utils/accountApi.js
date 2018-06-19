const Api = require('./Api');

function AccountApi(){}


AccountApi.getAccounts = function(callback){

    return Promise.resolve (
        Api
            .get('/account/AllAccounts')
            
            .then( response => {
                if (response.ok){
                    return response.json() 
                }
                else 
                    Promise.reject({error : 'Algo salio mal en Get all accounts'}) 
            })

            .then( data =>  callback(data) )
        );
}

AccountApi.getAccountsOf = function( id, callback ){

return Promise.resolve (
    Api
        .get(`/account/AllAccountsOf/${id}`)
        
        .then( response => {
            if (response.ok){
                return response.json() 
            }
            else 
                Promise.reject({error : 'Algo salio mal en Get all accounts'}) 
        })

        .then( data =>  callback(data) )
    );
}

AccountApi.addAccount = function(dataForm) {

    return Promise.resolve (
        Api
            .post('/account/addAccount', dataForm)

            .then( Api.parseJSON )

            .then( response => {
                if (response.ok)
                    return response.json;
                else
                    return Promise.reject(response.json);
            })
    )
}


AccountApi.deleteAccount = function( id, typeAccount ) {

    return Promise.resolve( 
        Api
            .delete(`/account/deleteAccount/${id}/${typeAccount}`)
        )
}

module.exports = AccountApi;