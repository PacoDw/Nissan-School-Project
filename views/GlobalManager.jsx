const React           = require('react');
const TransitionGroup = require('react-addons-transition-group');

import Api        from '../utils';


// Modules---------------------------------------------------------------------------------
const Dashboard      = require('./components/GlobalManager/Dashboard.jsx');
const MessageFlash   = require('./components/MessageFlash.jsx');

const SellerAddForm  = require('./components/Seller/SellerAddForm.jsx');
const SellerTable    = require('./components/Seller/SellerTable.jsx');

const OfficeManagerAddForm = require('./components/OfficeManager/OfficeManagerAddForm.jsx');
const OfficeManagerTable   = require('./components/OfficeManager/OfficeManagerTable.jsx');

const AccountAddForm = require('./components/Account/AccountAddForm.jsx');
const AccountTable   = require('./components/Account/AccountTable.jsx');



class OfficeManager extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            messageFlash      : props.messageFlash || '',
            typeAccount       : props.typeAccount,
            page              : props.page,
            optionsAccount    : '',
            allSellers        : '',
            allAccounts       : '',
            allOfficeManagers : '',
            visibleSeller     : false,
            visibleOfficeManager : false,
            visibleAccount    : false,
            visibleDash       : false
         }

        // Sellers
        this.handleWatchSellers = this.handleWatchSellers.bind(this);
        this.handleAddSeller    = this.handleAddSeller.bind(this);
        this.handleDeleteSeller = this.handleDeleteSeller.bind(this);

        // OfficeManager
        this.handleWatchOfficeManagers  = this.handleWatchOfficeManagers.bind(this);
        this.handleAddOfficeManager    = this.handleAddOfficeManager.bind(this);
        this.handleDeleteOfficeManager = this.handleDeleteOfficeManager.bind(this);
       
        // Accounts
        this.handleWatchAccounts = this.handleWatchAccounts.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
        this.handleAddAccount    = this.handleAddAccount.bind(this); 
    }

    componentWillMount() {

        Api.Seller
                .getSellers( sellers => this.setState( { allSellers : sellers } ) )
                .catch( error => console.log('ERROR WATCHT SELLER: ', error));

        Api.OfficeManager
                .getOfficeManagers( officeManagers => this.setState( { allOfficeManagers : officeManagers } ) )
                .catch( error => console.log('ERROR GET ALL WATCH OFFICE MANAGERS: ', error));

        Api.GlobalManager
                .getAllTypeUserWithoutAccount( accounts => this.setState( { optionsAccount : accounts } ))
                .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT GLOBAL MANAGERS: ', error));

        Api.Account    
                .getAccounts( accounts => { this.setState( { allAccounts : accounts } ) } )
                .catch( error => console.log('ERROR GET ALL Accounts: ', error));
    }


    /**=================================================================================================== */
    /**SELLER */
    /**=================================================================================================== */
    handleWatchSellers(e){                                       // HANDLE WATCH SELLERS
        e.preventDefault();

            Api.Seller
                    .getSellers( sellers => this.setState( { allSellers : sellers, page : 'sellers' } ) )
                    .catch( error => console.log('ERROR WATCHT SELLER: ', error));

            Api.GlobalManager
                    .getAllTypeUserWithoutAccount( accounts => this.setState( { optionsAccount : accounts } ))
                    .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT GLOBAL MANAGERS: ', error));



    }

    handleAddSeller(e) {                                            // HANDLE ADD SELLER
        e.preventDefault();

        let formulario = document.querySelector('#sellerAddForm'); 

        this.onGetForm(formulario, ( dataForm ) => {
                
            console.log('ADD SELLER DATA: ', dataForm);
            Api.Seller
                .addSeller( dataForm )

                 .then( data => {
                    console.log('Data AddSeller: ', data);
                    console.log('Api.Seller :', this.state.allSellers);
                    document.querySelector('#closeSellerForm').click();

                    
                    Api.Seller
                        .getSellers( (sellers) => {
                            this.setState({
                                allSellers : sellers,
                                visibleDash : !this.state.visibleDash,
                                messageFlash : data.messageFlash,
                            });
                        })
                        .catch( error => console.log('ERROR GET ALL SELLER: ', error));


                    setTimeout( () => this.setState( { visibleDash : !this.state.visibleDash, } ), 4000);

                    Api.GlobalManager
                        .getAllTypeUserWithoutAccount( accounts => this.setState( { optionsAccount : accounts } ))
                        .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT GLOBAL MANAGERS: ', error));

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
    
    handleDeleteSeller(e) {                      // HANDLE DELETE SELLERS
        e.preventDefault();
        console.log(e);
        
        let id  = e.target.attributes['id'].nodeValue;

        Api.Seller
            .deleteSeller( id )

            .then( response => {
                if (response.ok)
                {
                    let results = this.state.allSellers.filter( (obj) =>  obj.id_seller != id );
                
                    console.log('Resulsts delete',results);

                    this.setState({
                        allSellers : results
                    });
            
                    Api.GlobalManager
                        .getAllTypeUserWithoutAccount( accounts => this.setState( { optionsAccount : accounts } ))
                        .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT GLOBAL MANAGERS: ', error));

                }
                else 
                    Promise.reject({error : 'Algo salio mal en Delete sellers'}) 
            })

            .catch( error => alert('ERROR Delete SELLER: ', error));
    }

    /**=================================================================================================== */
    /**OFFICE MANAGERS */
    /**=================================================================================================== */
    handleWatchOfficeManagers(e) {                                       // HANDLE WATCH OFFICE MANAGERS
        e.preventDefault();

            Api.OfficeManager
                    .getOfficeManagers( officeManagers => this.setState( { allOfficeManagers : officeManagers, page : 'OfficeManager' } ) )
                    .catch( error => console.log('ERROR GET ALL WATCH OFFICE MANAGERS: ', error));

            Api.GlobalManager
                    .getAllTypeUserWithoutAccount( accounts => this.setState( { optionsAccount : accounts } ))
                    .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT GLOBAL MANAGERS: ', error));

    }

    handleAddOfficeManager(e) {                                            // HANDLE ADD SELLER
        e.preventDefault();

        let formulario = document.querySelector('#OfficeManagerAddForm'); 

        this.onGetForm(formulario, ( dataForm ) => {
                
            Api.OfficeManager
                .addOfficeManager( dataForm )

                 .then( data => {
                    console.log('Data AddOfficeManager: ', data);
                    console.log('Api.OfficeManager :', this.state.allOfficeManagers);
                    document.querySelector('#closeOfficeManagerForm').click();

                    
                    Api.OfficeManager
                        .getOfficeManagers( (officeManagers) => {
                            this.setState({
                                allOfficeManagers : officeManagers,
                                visibleDash : !this.state.visibleDash,
                                messageFlash : data.messageFlash,
                            });
                        })
                        .catch( error => console.log('ERROR GET ALL officeManager: ', error));


                    setTimeout( () => this.setState( { visibleDash : !this.state.visibleDash, } ), 4000);

                    Api.GlobalManager
                        .getAllTypeUserWithoutAccount( accounts => this.setState( { optionsAccount : accounts } ))
                        .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT GLOBAL MANAGERS: ', error));
                })

                .catch( response => {
                    this.setState({
                        visibleOfficeManager : !this.state.visibleOfficeManager,
                        messageFlash  : response.messageFlash
                    });
    
                    setTimeout( () => this.setState( { visibleOfficeManager : !this.state.visibleOfficeManager, } ), 4000);
                })
         });
    }

    handleDeleteOfficeManager(e) {                      // HANDLE DELETE SELLERS
        e.preventDefault();
        console.log(e);
        
        let id  = e.target.attributes['id'].nodeValue;

        Api.OfficeManager
            .deleteOfficeManager( id )

            .then( response => {
                if (response.ok)
                {
                    let results = this.state.allOfficeManagers.filter( (obj) =>  obj.id_office_manager != id );
                
                    console.log('Resulsts delete',results);

                    this.setState({
                        allOfficeManagers : results
                    });
            
                    Api.GlobalManager
                        .getAllTypeUserWithoutAccount( accounts => this.setState( { optionsAccount : accounts } ))
                        .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT GLOBAL MANAGERS: ', error));
                }
                else 
                    Promise.reject({error : 'Algo salio mal en Delete officeManager'}) 
            })

            .catch( error => alert('ERROR Delete OFFICE MANAGER: ', error));
    }

    /**=================================================================================================== */
    /**ACCOUNT */
    /**=================================================================================================== */
    handleWatchAccounts(e) {                                           // HANDLE WATCH ACCOUNTS 
        e.preventDefault(); 
    
        Api.Account    
            .getAccounts( accounts => {
                this.setState( { 
                    allAccounts : accounts,
                    page        : 'accounts'  
                }) 
            })
            .catch( error => console.log('ERROR GET ALL Accounts: ', error));

        Api.GlobalManager
            .getAllTypeUserWithoutAccount( accounts => this.setState( { optionsAccount : accounts } ))
            .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT GLOBAL MANAGERS: ', error));
    }

    handleAddAccount(e) {
        e.preventDefault();
                                                                                      // HANDLE ADD ACCOUNT          
        let formulario = document.querySelector('#accountAddForm'); 

        this.onGetForm(formulario, ( dataForm ) => {
            
            Api.Account
                .addAccount( dataForm )

                .then( data => {
                    document.querySelector('#closeAddForm').click();

                    Api.Account                 
                        .getAccounts( accounts => {
                            this.setState({
                                allAccounts : accounts,
                                visibleDash : !this.state.visibleDash,
                                messageFlash : data.messageFlash,
                            })
                    })
                    .catch( error => console.log('ERROR GET ALL Accounts: ', error));


                    setTimeout( () => this.setState( { visibleDash : !this.state.visibleDash, } ), 4000);

                    Api.GlobalManager
                        .getAllTypeUserWithoutAccount( accounts => this.setState( { optionsAccount : accounts } ))
                        .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT GLOBAL MANAGERS: ', error));

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

    handleDeleteAccount(e) {                       // HANDLE DELETE SELLERS
        e.preventDefault();

        let id  = e.target.attributes['id'].nodeValue;
        let typeAccount = e.target.attributes['typeAccount'].nodeValue;

        Api.Account
            .deleteAccount( id, typeAccount )

            .then( response => {
                if (response.ok)
                {
                    
                    Api.Account
                        .getAccounts( accounts => this.setState( { allAccounts : accounts } ) )
                        .catch( error => console.log('ERROR GET ALL Accounts: ', error));

                    Api.GlobalManager
                        .getAllTypeUserWithoutAccount( accounts => this.setState( { optionsAccount : accounts } ))
                        .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT GLOBAL MANAGERS: ', error));
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
                    'id'          : formulario.elements[i].selectedOptions[0].attributes['id'].nodeValue,
                    'value'       : formulario.elements[i].selectedOptions[0].attributes['value'].nodeValue, 
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
                clase           = { 'table table-hover customTable'}
                id              = { 'list-account'}
            />
        else if (this.state.page == 'OfficeManager')
            table = <OfficeManagerTable 
                allOfficeManagers     = { this.state.allOfficeManagers }
                onDeleteOfficeManager = { this.handleDeleteOfficeManager }         
                clase                 = { 'table table-hover customTable' }
                id                    = { 'list-officeManager' }
            />

        return (
            <div>
                <Dashboard 
                    onGetAccountsData       = { this.handleWatchAccounts }
                    onGetSellersData        = { this.handleWatchSellers }   
                    onGetOfficeManagersData = { this.handleWatchOfficeManagers }             
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
                        typeAccount   = 'globalManager'
                    />

                    <OfficeManagerAddForm 
                        messageFlash  = { this.state.messageFlash }
                        visible       = { this.state.visibleOfficeManager }
                        onPostData    = { this.handleAddOfficeManager }
                        options       = { this.state.optionsAccount }
                    />


                </main>            
            </div>
        );
    }
}
 
module.exports = OfficeManager;