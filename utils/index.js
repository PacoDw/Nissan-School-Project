const Api              = require('./Api');
const SellerApi        = require('./sellerApi');
const AccountApi       = require('./accountApi');
const OfficeManagerApi = require('./officeManagerApi');
const GlobalManagerApi = require('./globalManagerApi');

module.exports =  {
        make    : Api,
        Seller  : SellerApi,
        Account : AccountApi,
        OfficeManager : OfficeManagerApi,
        GlobalManager : GlobalManagerApi
};

