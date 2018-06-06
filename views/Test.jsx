const React = require('react');
const { findDOMNode } = require('react-dom');
const TransitionGroup = require('react-addons-transition-group');

// Modules
const Dashboard      = require('./components/Dashboard/Dashboard.jsx');
const SellerAddForm  = require('./components/Seller/SellerAddForm.jsx');
const AccountAddForm = require('./components/Account/AccountAddForm.jsx');
const MessageFlash   = require('./components/MessageFlash.jsx');
const SellerTable    = require('./components/Seller/SellerTable.jsx');

class Test extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            messageFlash     : props.messageFlash || '',
            typeAccount      : props.typeAccount,
            optionsAccount   : '',
            allSellers       : '',
            visibleAccount   : false,
            visibleSeller    : false,
            visibleDash      : false
         }

        this.handleWatchSellers = this.handleWatchSellers.bind(this);
        this.handleWatchAccounts   = this.handleWatchAccounts.bind(this);
        this.handleAddSeller  = this.handleAddSeller.bind(this);
        this.handleAddAccount    = this.handleAddAccount.bind(this); 
        this.handleGetSellersWithoutAccount = this.handleGetSellersWithoutAccount.bind(this);
        this.handleGetAllSellers = this.handleGetAllSellers.bind(this);

        this.handleDeleteSeller = this.handleDeleteSeller.bind(this);
    }

    handleWatchSellers(e){
        e.preventDefault();
        if(this.state.allSellers === '')
        {
            this.handleGetAllSellers( (sellers) => {
                this.setState({
                    allSellers : sellers 
                });
            });
        }
    }

    
    handleWatchAccounts(e){
        e.preventDefault();
        console.log('---------------------------------------')    
        console.log('Handle all AccountS')
        console.log('---------------------------------------')    
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
                    'value' :formulario.elements[i].selectedOptions[0].attributes['value'].nodeValue 
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

    
    handleAddAccount(e) {
        e.preventDefault();

        // let formulario = document.querySelector('#accountAddForm'); 

        // this.onGetForm(formulario, ( dataForm ) => {
        
        //     let ajax = new XMLHttpRequest(); // Creo el objeto XMLHttpRequest y lo guardo en ajax
    

        //     ajax.onload = () => {
        //         if(ajax.status != 200) {
        //             // console.log('ALGO SALIO MAL');
    
        //             this.setState({
        //                 visibleAccount : !this.state.visibleAccount,
        //                 messageFlash : JSON.parse(ajax.responseText).messageFlash
        //             });
    
        //             setTimeout(() => {
        //                 this.setState({
        //                     visibleAccount : !this.state.visibleAccount
        //                 });
        //             }, 4000)
    
        //         } else {    
                    
        //             document.querySelector('#closeAddForm').click();
    
        //             this.setState({
        //                 visibleDash : !this.state.visibleDash,
        //                 messageFlash : JSON.parse(ajax.responseText).messageFlash
        //             });
    
        //             setTimeout(() => {
        //                 this.setState({
        //                     visibleDash : !this.state.visibleDash
        //                 });
        //             }, 4000)
        //         }
        //     }
        //     ajax.open('POST', '/account/addAccount', true); // Preparando la peticion al servidor
        //     ajax.setRequestHeader('Content-Type', 'application/Json');
        //     ajax.send(JSON.stringify(dataForm)); // Enviando la peticion
        // });
    }

    handleAddSeller(e) {
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

    handleGetSellersWithoutAccount(callback){
        let ajax = new XMLHttpRequest(); 

        ajax.onload = () => {
            if(ajax.status != 200)
                alert('Todo MAL SELLER WITHOUT ACCOUNT')
            else 
                return callback(ajax.responseText);
        }
        ajax.open('GET', '/seller/SellersWithoutAccount', true); 
        ajax.send(); 
    }

    handleGetAllSellers(callback){
        let ajax = new XMLHttpRequest(); 
    
            ajax.onload = () => {
                
                if(ajax.status != 200)
                    alert('Todo MAL ')
                else 
                    return callback(ajax.responseText);
            }
            ajax.open('GET', '/seller/allSellers', true); 
            ajax.send(); 
    }

    handleDeleteSeller(sellersUpdated, idRemoved)
    {
        console.log('Algo', sellersUpdated);
        let options = JSON.parse(this.state.optionsAccount);

        if ( idRemoved != null ){
            
            if(!options)
                this.handleGetSellersWithoutAccount( (res) => options = JSON.parse(res) );

            console.log('options: ', options);      
            let resultsOptions = options.filter( (obj) =>  obj.id_seller != idRemoved );

            this.setState({
                optionsAccount : JSON.stringify(resultsOptions)
            });
        }

        this.setState({
            allSellers : sellersUpdated
        });
    }

  render() {
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
                    
                    <SellerTable 
                        allSellers = { this.state.allSellers }
                        onDeleteSeller = { this.handleDeleteSeller }
                    />
            
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