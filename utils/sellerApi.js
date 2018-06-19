const Api = require('./Api');

function SellerApi(){}

SellerApi.getSellers = function(callback){

    return Promise.resolve (
        Api
            .get('/seller/AllSellers')
            
            .then( response => {
                if (response.ok){
                    return response.json() 
                }
                else 
                    Promise.reject({error : 'Algo salio mal en Get all sellers'}) 
            })

            .then( data =>  callback(data) )
        );
}

SellerApi.getSellersOf = function( id,callback ){

return Promise.resolve (
    Api
        .get(`/seller/AllSellersOf/${id}`)
        
        .then( response => {
            if (response.ok){
                return response.json() 
            }
            else 
                Promise.reject({error : 'Algo salio mal en Get all sellers'}) 
        })

        .then( data =>  callback(data) )
    );
}

SellerApi.getSellersWithoutAccount = function(callback){

    return Promise.resolve (
        Api
            .get('/seller/sellersWithoutAccount')
            
            .then( response => {
                if (response.ok){
                    return response.json() 
                }
                else 
                    Promise.reject({error : 'Algo salio mal en Get Without Account'}) 
            })

            .then( data =>  callback(data) )
        );
}

SellerApi.getSellersWithoutAccountOf = function( id, callback ){

return Promise.resolve (
    Api
        .get(`/seller/sellersWithoutAccountOf/${id}`)
        
        .then( response => {
            if (response.ok){
                return response.json() 
            }
            else 
                Promise.reject({error : 'Algo salio mal en Get Without Account'}) 
        })

        .then( data =>  callback(data) )
    );
}

SellerApi.addSeller = function(dataForm) {

    return Promise.resolve (
        Api
            .post('/seller/addSeller', dataForm)

            .then( response => {
                console.log('API RESPONSE: ', response);
                if (response.ok)
                    return response.json();
                else
                    return Promise.reject(response.json);
            })
    )
}


SellerApi.deleteSeller = function( id ) {

    return Promise.resolve( 
        Api
            .delete(`/seller/deleteSeller/${id}`)            
        )
}

module.exports = SellerApi;