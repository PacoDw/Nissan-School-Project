const React = require('react');
const { findDOMNode } = require('react-dom');
const TransitionGroup = require('react-addons-transition-group');

// Modules---------------------------------------------------------------------------------
const Dashboard      = require('./components/Dashboard/Dashboard.jsx');
const MessageFlash   = require('./components/MessageFlash.jsx');

const SellerAddForm  = require('./components/Seller/SellerAddForm.jsx');
const SellerTable    = require('./components/Seller/SellerTable.jsx');

const AccountAddForm = require('./components/Account/AccountAddForm.jsx');
const AccountTable   = require('./components/Account/AccountTable.jsx')


class Test extends React.Component {

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
        this.handleWatchSellers = this.handleWatchSellers.bind(this);
        this.handleAddSeller  = this.handleAddSeller.bind(this);
        this.handleGetSellersWithoutAccount = this.handleGetSellersWithoutAccount.bind(this);
        this.handleGetAllSellers = this.handleGetAllSellers.bind(this);
        this.handleDeleteSeller = this.handleDeleteSeller.bind(this);
       
        // Accounts
        this.handleWatchAccounts   = this.handleWatchAccounts.bind(this);
        this.handleAddAccount    = this.handleAddAccount.bind(this); 
        this.handleGetAllAccounts = this.handleGetAllAccounts.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
    }
    /**=================================================================================================== */
    /**SELLER */
    /**=================================================================================================== */
    handleWatchSellers(e){                                       // HANDLE WATCH SELLERS
        e.preventDefault();
        window.location.href = '/officeManager/sellers';

        if(this.state.allSellers === '')
        {
            this.handleGetAllSellers( (sellers) => {
                this.setState({
                    allSellers : sellers 
                });
            });
        }
    }
    handleGetAllSellers(callback){                                // HANDLE GET ALL SELLERS
        let ajax = new XMLHttpRequest(); 
    
            ajax.onload = () => {
                
                if(ajax.status != 200)
                    alert('Todo MAL GET ALL SELLERS')
                else 
                    return callback(ajax.responseText);
            }
            ajax.open('GET', '/seller/allSellers', true); 
            ajax.send(); 
    }
    handleAddSeller(e) {                                            // HANDLE ADD SELLER
        e.preventDefault();
        
        let formulario = document.querySelector('#sellerAddForm'); 

        this.onGetForm(formulario, ( dataForm ) => {
            
            let ajax = new XMLHttpRequest(); 
    
            ajax.onload = () => {
                if(ajax.status != 200) {
                    this.setState({
                        visibleSeller : !this.state.visibleSeller,
                        messageFlash  : JSON.parse(ajax.responseText).messageFlash
                    });
    
                    setTimeout(() => {
                        this.setState({
                            visibleSeller : !this.state.visibleSeller,
                        });
                    }, 4000)
    
                } else {
                    document.querySelector('#closeSellerForm').click();

                    this.handleGetAllSellers( (sellers) => {
                        this.setState({
                            allSellers : sellers,
                            visibleDash : !this.state.visibleDash,
                            messageFlash : JSON.parse(ajax.responseText).messageFlash,
                        });
                    });
    
                    setTimeout(() => {
                        this.setState({
                            visibleDash : !this.state.visibleDash,
                        });
                    }, 4000);

                    this.handleGetSellersWithoutAccount( (results) => {
                        this.setState({
                            optionsAccount : results
                        });
                    });
                }
            }
            ajax.open('POST', '/seller/addSeller', true);
            ajax.setRequestHeader('Content-Type', 'application/Json');
            ajax.send(JSON.stringify(dataForm)); 
         });
    }
    handleDeleteSeller(sellersUpdated, idRemoved)                       // HANDLE DELETE SELLERS
    {
        // console.log('Algo', sellersUpdated);
        let options = JSON.parse(this.state.optionsAccount);

        if ( idRemoved != null ){
            
            if(!options)
                this.handleGetSellersWithoutAccount( (res) => options = JSON.parse(res) );

            // console.log('options: ', options);      
            let resultsOptions = options.filter( (obj) =>  obj.id_seller != idRemoved );

            this.setState({
                optionsAccount : JSON.stringify(resultsOptions)
            });
        }
            this.setState({
                allSellers : sellersUpdated
            });
    }
    handleGetSellersWithoutAccount(callback){                           // HANDLE GET SELLERS WHITHOUT ACCOUNT
        let ajax = new XMLHttpRequest(); 

        ajax.onload = () => {
            if(ajax.status != 200)
                alert('Todo MAL SELLER WITHOUT ACCOUNT')
            else {
                console.log(ajax.responseText);
                return callback(ajax.responseText);
            }
        }
        ajax.open('GET', '/seller/SellersWithoutAccount', true); 
        ajax.send(); 
    }


    /**=================================================================================================== */
    /**ACCOUNT */
    /**=================================================================================================== */
    handleWatchAccounts(e){                                           // HANDLE WATCH ACCOUNTS 
        e.preventDefault(); 
        window.location.href = '/officeManager/accounts';
        if(this.state.allAccounts == '')
        {
            this.handleGetAllAccounts( (accounts) => {
                this.setState({
                    allAccounts : accounts 
                });
            });
        }
    }
    handleGetAllAccounts(callback){                                    // HANDLE GET ALL ACCOUNTS
        let ajax = new XMLHttpRequest(); 
    
            ajax.onload = () => {
                
                if(ajax.status != 200)
                    alert('Todo MAL GET ALL ACCOUNTS')
                else 
                    return callback(ajax.responseText);
            }
            ajax.open('GET', '/account/allAccounts', true); 
            ajax.send(); 
    }
    handleAddAccount(e) {
        e.preventDefault();
                                                       // HANDLE ADD ACCOUNT          
        let formulario = document.querySelector('#accountAddForm'); 

        this.onGetForm(formulario, ( dataForm ) => {
            
            let ajax = new XMLHttpRequest(); 

            ajax.onload = () => {
                if(ajax.status != 200) {
    
                    this.setState({
                        visibleAccount : !this.state.visibleAccount,
                        messageFlash : JSON.parse(ajax.responseText).messageFlash
                    });
    
                    setTimeout(() => {
                        this.setState({
                            visibleAccount : !this.state.visibleAccount
                        });
                    }, 4000)
                } else {
                    this.handleGetSellersWithoutAccount( (results) => {
                        this.setState({
                            optionsAccount : results
                        });
                    });
                    
                    document.querySelector('#closeAddForm').click();
    
                    setTimeout(() => {
                        this.setState({
                            visibleDash : !this.state.visibleDash
                        });
                    }, 4000);

                    this.handleGetAllAccounts ( (accounts) => {
                        //     console.log('ACccounts total: ', accounts);
                            this.setState({
                                allAccounts  : accounts,
                                visibleDash  : !this.state.visibleDash,
                                messageFlash : JSON.parse(ajax.responseText).messageFlash
                            });
                        });
                }
            }
            ajax.open('POST', '/account/addAccount', true); 
            ajax.setRequestHeader('Content-Type', 'application/Json');
            ajax.send(JSON.stringify(dataForm)); 
        });
    }
    handleDeleteAccount(itemRemoved)                       // HANDLE DELETE SELLERS
    {
        let listAccounts = '';
            if (this.state.optionsAccount == '[]' || this.state.optionsAccount == '')
                    this.setState( { optionsAccount : `[${JSON.stringify(itemRemoved)}]` } );
            else
            {
                listAccounts = JSON.parse(this.state.optionsAccount);
                listAccounts.push(itemRemoved);
    
                this.setState( { optionsAccount : JSON.stringify(listAccounts) } );  
            }            
        this.handleGetAllAccounts( res => this.setState( { allAccounts : res } ));
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
 
module.exports = Test;