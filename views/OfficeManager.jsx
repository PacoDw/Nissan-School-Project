const React           = require('react');
const TransitionGroup = require('react-addons-transition-group');

import Api from '../utils/Api';

// Modules---------------------------------------------------------------------------------
const Dashboard      = require('./components/Dashboard/Dashboard.jsx');
const MessageFlash   = require('./components/MessageFlash.jsx');

const SellerAddForm  = require('./components/Seller/SellerAddForm.jsx');
const SellerTable    = require('./components/Seller/SellerTable.jsx');

const AccountAddForm = require('./components/Account/AccountAddForm.jsx');
const AccountTable   = require('./components/Account/AccountTable.jsx')


class OfficeManager extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            messageFlash     : props.messageFlash || '',
            typeAccount      : props.typeAccount,
            page             : props.page,
            optionsAccount   : '',
            allSellers       : '',
            allAccounts      : '',
            visibleAccount   : false,
            visibleSeller    : false,
            visibleDash      : false
         }

        // Sellers
        this.handleDeleteSeller = this.handleDeleteSeller.bind(this);
        this.handleWatchSellers = this.handleWatchSellers.bind(this);
        this.handleAddSeller  = this.handleAddSeller.bind(this);
        this.handleGetSellersWithoutAccount = this.handleGetSellersWithoutAccount.bind(this);
        this.handleGetAllSellers = this.handleGetAllSellers.bind(this);
       
        // Accounts
        this.handleWatchAccounts   = this.handleWatchAccounts.bind(this);
        this.handleAddAccount    = this.handleAddAccount.bind(this); 
        this.handleGetAllAccounts = this.handleGetAllAccounts.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
    }

    componentWillMount() {
        this.handleGetAllSellers( sellers => this.setState( { allSellers : sellers } ) );

        this.handleGetAllAccounts( accounts => this.setState( { allAccounts : accounts } ) );

        this.handleGetSellersWithoutAccount( options => this.setState( { optionsAccount : options } ) );

    }




    /**=================================================================================================== */
    /**SELLER */
    /**=================================================================================================== */
    handleWatchSellers(e){                                       // HANDLE WATCH SELLERS
        e.preventDefault();
            this.handleGetAllSellers( (sellers) => {
                this.setState({
                    allSellers : sellers,
                    page       : 'sellers'
                });
            });
            this.handleGetSellersWithoutAccount( res => {
                this.setState({
                    optionsAccount : res    
                });
            });

    }
    handleGetAllSellers(callback){                                  // HANDLE GET ALL SELLERS
        Api
            .get('/seller/AllSellers')
            
            .then( response => {
                console.log('Response: ',  response);
                if (response.ok){
                    console.log('Response JSON: ', response);
                    return response.json() 
                }
                else 
                    Promise.reject({error : 'Algo salio mal en Get all sellers'}) 
            })

            .then( data =>  { 
                console.log('DATA :: ', data)
                return callback(data);
            })

            .catch( error => console.log('ERROR GET ALL SELLER: ', error));
    }
    handleAddSeller(e) {                                            // HANDLE ADD SELLER
        e.preventDefault();

        let formulario = document.querySelector('#sellerAddForm'); 

        this.onGetForm(formulario, ( dataForm ) => {
                
            Api
                .post('/seller/addSeller', dataForm)

                .then( Api.parseJSON )
                .then( response => {
                    if (response.ok)
                        return response.json;
                    else
                        return Promise.reject(response.json);
                })

                .then( data => {
                    console.log('Data AddSeller: ', data);
                    document.querySelector('#closeSellerForm').click();

                    this.handleGetAllSellers( (sellers) => {
                        this.setState({
                            allSellers : sellers,
                            visibleDash : !this.state.visibleDash,
                            messageFlash : data.messageFlash,
                        });
                    });
    
                    setTimeout( () => this.setState( { visibleDash : !this.state.visibleDash, } ), 4000);

                    this.handleGetSellersWithoutAccount( results => this.setState( { optionsAccount : results } ));
                })

                .catch( response => {
                    this.setState({
                        visibleSeller : !this.state.visibleSeller,
                        messageFlash  : response.messageFlash
                    });
    
                    setTimeout( () => this.setState( { visibleSeller : !this.state.visibleSeller, } ), 4000);
                })
         });
    }
    handleDeleteSeller(e)                       // HANDLE DELETE SELLERS
    {
        e.preventDefault();
        console.log(e);
        
        let id  = e.target.attributes['id'].nodeValue;

        Api
            .delete(`/seller/deleteSeller/${id}`)
            
            .then( response => {
                if (response.ok)
                {
                    let results = this.state.allSellers.filter( (obj) =>  obj.id_seller != id );
                
                    console.log('Resulsts delete',results);

                    this.setState({
                        allSellers : results
                    });
            
                        
                    this.handleGetSellersWithoutAccount( res => {
                        this.setState({
                            optionsAccount : res    
                        });
                    });
                }
                else 
                    Promise.reject({error : 'Algo salio mal en Delete sellers'}) 
            })

            .catch( error => alert('ERROR Delete SELLER: ', error));
    }
    handleGetSellersWithoutAccount(callback){    
        Api
            .get('/seller/sellersWithoutAccount')
            
            .then( response => {
                console.log('Response  without account: ',  response);
                if (response.ok){
                    console.log('Response JSON without account: ', response);
                    return response.json() 
                }
                else 
                    Promise.reject({error : 'Algo salio mal en Get all without sellers'}) 
            })

            .then( data =>  { 
                console.log('DATA :: ', data)
                return callback(data);
            })
            .catch( error => console.log('ERROR GET ALL WITHOUT SELLER: ', error));
    }


    /**=================================================================================================== */
    /**ACCOUNT */
    /**=================================================================================================== */
    handleWatchAccounts(e){                                           // HANDLE WATCH ACCOUNTS 
        e.preventDefault(); 

        this.handleGetAllAccounts( (accounts) => {
            this.setState({
                allAccounts : accounts,
                page        : 'accounts'
            });
        });
        this.handleGetSellersWithoutAccount( res => {
            this.setState({
                optionsAccount : res    
            });
        });

    }
    handleGetAllAccounts(callback){                                     // HANDLE GET ALL ACCOUNTS
        Api
        .get('/account/allAccounts')
        
        .then( response => {
            console.log('Response Accounts: ',  response);
            if (response.ok){
                console.log('Response JSON: ', response);
                return response.json() 
            }
            else 
                Promise.reject({error : 'Algo salio mal en Get all accounts'}) 
        })

        .then( data =>  { 
            console.log('DATA :: ', data)
            return callback(data);
        })

        .catch( error => console.log('ERROR GET ALL Accounts: ', error));
    }

    handleAddAccount(e) {
        e.preventDefault();
                                                                                      // HANDLE ADD ACCOUNT          
        let formulario = document.querySelector('#accountAddForm'); 

        this.onGetForm(formulario, ( dataForm ) => {
            Api
            .post('/account/addAccount', dataForm)

            .then( Api.parseJSON )
            .then( response => {
                console.log(response);
                if (response.ok)
                    return response.json;
                else
                    return Promise.reject(response.json);
            })

            .then( data => {
                document.querySelector('#closeAddForm').click();

                this.handleGetAllAccounts( accounts => {
                    this.setState({
                        allAccounts : accounts,
                        visibleDash : !this.state.visibleDash,
                        messageFlash : data.messageFlash,
                    });
                });

                setTimeout( () => this.setState( { visibleDash : !this.state.visibleDash, } ), 4000);

                this.handleGetSellersWithoutAccount( results => this.setState( { optionsAccount : results } ));
                console.log('Data AddAccounts: ', data);

            })

            .catch( response => {
                console.log('Error add account: ', response);
                this.setState({
                    visibleAccount : !this.state.visibleAccount,
                    messageFlash  : response.messageFlash
                });

                setTimeout( () => this.setState( { visibleAccount : !this.state.visibleAccount, } ), 4000);
            });
        });
    }
    handleDeleteAccount(e)                       // HANDLE DELETE SELLERS
    {
        console.log(e);
        
        let id  = e.target.attributes['id'].nodeValue;
        let typeAccount = e.target.attributes['typeAccount'].nodeValue;

        console.log('typeAccount: ', typeAccount);

        Api
            .delete(`/account/deleteAccount/${id}/${typeAccount}`)
            
            .then( response => {
                if (response.ok)
                {
                    
                    this.handleGetAllAccounts( accounts => this.setState( { allAccounts : accounts } ) );
                    
                    this.handleGetSellersWithoutAccount( res => {
                        this.setState({
                            optionsAccount : res    
                        });
                    });
                }
                else 
                    Promise.reject({error : 'Algo salio mal en Delete account'}) 
            })

            .catch( error => alert('ERROR Delete Account: ', error));
    }

    onGetForm(formulario, callback){
        const dataForm = {};
        let key   = '';
        let value = '';

        for (let i = 0; i < formulario.elements.length; i++)
        {
            if (formulario.elements[i].tagName == 'SELECT')
            { 
                key = 'selected';
                value = { 
                    'id'  : formulario.elements[i].selectedOptions[0].attributes['id'].nodeValue,
                    'value' : formulario.elements[i].selectedOptions[0].attributes['value'].nodeValue, 
                    'typeAccount' : formulario.elements[i].selectedOptions[0].attributes['typeAccount'].nodeValue
                };
            }
            else if(formulario.elements[i].tagName == 'INPUT')
            {
                key   = formulario.elements[i].attributes['name'].nodeValue;
                value = formulario.elements[i].attributes['value'].nodeValue;
            }
            dataForm[key] = value;
        }

        return callback(dataForm);
    }

    
    /**=================================================================================================== */
    /**RENDER */
    /**=================================================================================================== */
    render() {
        let table = '';

        if (this.state.page == 'sellers')
            table = <SellerTable 
                allSellers     = { this.state.allSellers }
                onDeleteSeller = { this.handleDeleteSeller }
                clase          = { 'table table-hover customTable'}
                id             = { 'list-seller'}
            />
        else if (this.state.page == 'accounts')
            table = <AccountTable 
                allAccounts     = { this.state.allAccounts }
                onDeleteAccount = { this.handleDeleteAccount }
                clase          = { 'table table-hover customTable'}
                id             = { 'list-account'}
            />
        else if (this.state.page == 'officeManager')
            table = <OfficeManager 
            
            
            />

            
        return (
            <div>
                <Dashboard 
                    onGetAccountsData    = { this.handleWatchAccounts }
                    onGetSellersData     = { this.handleWatchSellers }                
                />

                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 main-content">
                    <TransitionGroup>
                        {this.state.visibleDash ? 
                            <MessageFlash 
                                messageFlash = { this.state.messageFlash }
                                clase        = 'alert alert-success messageFlash'
                            /> : null}
                    </TransitionGroup> 
                    
                    { table }
            
                    <SellerAddForm
                        messageFlash = { this.state.messageFlash }
                        visible      = { this.state.visibleSeller }
                        onPostData   = { this.handleAddSeller }
                    />

                    <AccountAddForm
                        messageFlash  = { this.state.messageFlash }
                        visible       = { this.state.visibleAccount }
                        onPostData    = { this.handleAddAccount }
                        options       = { this.state.optionsAccount }
                    />

                </main>            
            </div>
        );
    }
}
 
module.exports = OfficeManager;