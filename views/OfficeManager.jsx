const React           = require('react');
const TransitionGroup = require('react-addons-transition-group');

import Api        from '../utils';


// Modules---------------------------------------------------------------------------------
const Dashboard      = require('./components/OfficeManager/Dashboard.jsx');
const MessageFlash   = require('./components/MessageFlash.jsx');

const SellerAddForm  = require('./components/Seller/SellerAddForm.jsx');
const SellerTable    = require('./components/Seller/SellerTable.jsx');

const AccountAddForm = require('./components/Account/AccountAddForm.jsx');
const AccountTable   = require('./components/Account/AccountTable.jsx')


class OfficeManager extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id_office_manager : props.id_office_manager,
            id_account        : props.id_account,
            messageFlash      : props.messageFlash || '',
            typeAccount       : props.typeAccount,
            page              : props.page,
            optionsAccount    : '',
            allSellers        : '',
            allAccounts       : '',
            visibleAccount    : false,
            visibleSeller     : false,
            visibleDash       : false
         }

        // Sellers
        this.handleWatchSellers = this.handleWatchSellers.bind(this);
        this.handleAddSeller    = this.handleAddSeller.bind(this);
        this.handleDeleteSeller = this.handleDeleteSeller.bind(this);
       
        // Accounts
        this.handleWatchAccounts = this.handleWatchAccounts.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
        this.handleAddAccount    = this.handleAddAccount.bind(this); 
    }

    componentWillMount() {

        let id_office_manager = this.state.id_office_manager;

        Api.Seller
                .getSellersOf( id_office_manager, sellers => this.setState( { allSellers : sellers } ) )
                .catch( error => console.log('ERROR WATCHT SELLER: ', error));

        Api.Seller
                .getSellersWithoutAccountOf( id_office_manager, accounts => this.setState( { optionsAccount : accounts } ) )
                .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT SELLER: ', error));

        Api.Account    
                .getAccountsOf( id_office_manager, accounts => { this.setState( { allAccounts : accounts } ) } )
                .catch( error => console.log('ERROR GET ALL Accounts: ', error));
    }


    /**=================================================================================================== */
    /**SELLER */
    /**=================================================================================================== */
    handleWatchSellers(e){                                       // HANDLE WATCH SELLERS
        e.preventDefault();

        let id_office_manager = this.state.id_office_manager;
            Api.Seller
                    .getSellersOf( id_office_manager, sellers => this.setState( { allSellers : sellers, page : 'sellers' } ) )
                    .catch( error => console.log('ERROR WATCHT SELLER: ', error));

            Api.Seller
                    .getSellersWithoutAccountOf( id_office_manager, accounts => this.setState( { optionsAccount : accounts } ))
                    .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT SELLER: ', error));


    }

    handleAddSeller(e) {                                            // HANDLE ADD SELLER
        e.preventDefault();

        let formulario = document.querySelector('#sellerAddForm'); 

        this.onGetForm(formulario, ( dataForm ) => {
        console.log('DataFORM AddSeller: ', dataForm);
                
            Api.Seller
                .addSeller( dataForm )

                 .then( data => {
                    document.querySelector('#closeSellerForm').click();

                    let id_office_manager = this.state.id_office_manager;

                    
                    Api.Seller
                        .getSellersOf( id_office_manager, sellers => {
                            this.setState({
                                allSellers : sellers,
                                visibleDash : !this.state.visibleDash,
                                messageFlash : data.messageFlash,
                            });
                        })
                        .catch( error => console.log('ERROR GET ALL SELLER: ', error));


                    setTimeout( () => this.setState( { visibleDash : !this.state.visibleDash, } ), 4000);

                    Api.Seller
                        .getSellersWithoutAccountOf( id_office_manager, accounts => this.setState( { optionsAccount : accounts } ))
                        .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT SELLER: ', error));
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
                    let id_office_manager = this.state.id_office_manager;
               
                    console.log('Resulsts delete',results);

                    this.setState({
                        allSellers : results
                    });
            
                    Api.Seller
                        .getSellersWithoutAccountOf( id_office_manager, accounts => this.setState( { optionsAccount : accounts } ))
                        .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT SELLER: ', error));

                }
                else 
                    Promise.reject({error : 'Algo salio mal en Delete sellers'}) 
            })

            .catch( error => alert('ERROR Delete SELLER: ', error));
    }



    /**=================================================================================================== */
    /**ACCOUNT */
    /**=================================================================================================== */
    handleWatchAccounts(e) {                                           // HANDLE WATCH ACCOUNTS 
        e.preventDefault(); 

        let id_office_manager = this.state.id_office_manager;

        Api.Account    
            .getAccountsOf( id_office_manager, accounts => {
                this.setState( { 
                    allAccounts : accounts,
                    page        : 'accounts'  
                }) 
            })
            .catch( error => console.log('ERROR GET ALL Accounts: ', error));

        Api.Seller
            .getSellersWithoutAccountOf( id_office_manager, accounts => this.setState( { optionsAccount : accounts } ))
            .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT SELLER: ', error));


    }

    handleAddAccount(e) {
        e.preventDefault();
                                                                                      // HANDLE ADD ACCOUNT          
        let formulario = document.querySelector('#accountAddForm'); 

        this.onGetForm(formulario, ( dataForm ) => {
            
            console.log('dataFORM addAccount: ', dataForm);

            Api.Account
                .addAccount( dataForm )

                .then( data => {
                    document.querySelector('#closeAddForm').click();

                    let id_office_manager = this.state.id_office_manager;


                    Api.Account                 
                        .getAccountsOf( id_office_manager, accounts => {
                            this.setState({
                                allAccounts : accounts,
                                visibleDash : !this.state.visibleDash,
                                messageFlash : data.messageFlash,
                            })
                    })
                    .catch( error => console.log('ERROR GET ALL Accounts: ', error));


                    setTimeout( () => this.setState( { visibleDash : !this.state.visibleDash, } ), 4000);

                    Api.Seller
                        .getSellersWithoutAccountOf( id_office_manager, accounts => this.setState( { optionsAccount : accounts } ))
                        .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT SELLER: ', error));


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
                    let id_office_manager = this.state.id_office_manager;


                    Api.Account
                        .getAccountsOf( id_office_manager, accounts => this.setState( { allAccounts : accounts } ) )
                        .catch( error => console.log('ERROR GET ALL Accounts: ', error));

                    Api.Seller
                        .getSellersWithoutAccountOf( id_office_manager, accounts => this.setState( { optionsAccount : accounts } ))
                        .catch( error => console.log('ERROR GET ALL WHATCH WITHOUT SELLER: ', error));

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
                    'id'         : formulario.elements[i].selectedOptions[0].attributes['id'].nodeValue,
                    'id_office_manager' : this.state.id_office_manager,
                    'value'             : formulario.elements[i].selectedOptions[0].attributes['value'].nodeValue, 
                    'typeAccount'       : 'Seller'
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
                allSellers        = { this.state.allSellers }
                onDeleteSeller    = { this.handleDeleteSeller }
                clase             = { 'table table-hover customTable'}
                id                = { 'list-seller'}
            />
        else if (this.state.page == 'accounts')
            table = <AccountTable 
                allAccounts       = { this.state.allAccounts }
                onDeleteAccount   = { this.handleDeleteAccount }
                clase             = { 'table table-hover customTable'}
                id                = { 'list-account'}
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
                        typeAccount  = { this.state.typeAccount || 'OfficeManager' }
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