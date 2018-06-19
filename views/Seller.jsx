const React = require('react');
const TransitionGroup = require('react-addons-transition-group');

import Api from '../utils/Api' 


// Modules---------------------------------------------------------------------------------
const Dashboard      = require('./components/Seller/Dashboard.jsx');
const MessageFlash   = require('./components/MessageFlash.jsx');
const SalesTable     = require('./components/Sales/SalesTable.jsx')
const SaleForm       = require('./components/Sales/SaleForm.jsx');

class Test extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id_seller    : props.id_seller,
            messageFlash  : props.messageFlash,
            typeAccount   : props.typeAccount,
            page          : props.page || 'Sales',
            visibleDash   : false,

            allSales      : props.allSales
         }

         this.handleWatchSales    = this.handleWatchSales.bind(this);
         this.handleWatchSaleForm = this.handleWatchSaleForm.bind(this);

    }

    /**=================================================================================================== */
    /**SALES */
    /**=================================================================================================== */

    componentWillMount() {

        Api
            .get(`/sales/allSales/${this.state.id_seller}`)
            
            .then( response => {
                console.log('Response AllSales: ',  response);
                if (response.ok)
                    return response.json();
                else 
                    Promise.reject({error : 'Algo salio mal en Get all sales'}) 
            })

            .then( data => {

                this.setState( { 
                    page     : 'Sales',
                    allSales : data
                } );
            })

            .catch( error => console.log('ERROR GET ALL SALES: ', error));
    }

    handleWatchSales(e){
        e.preventDefault();

        Api
            .get(`/sales/allSales/${this.state.id_seller}`)
            
            .then( response => {
                console.log('Response AllSales: ',  response);
                if (response.ok)
                    return response.json();
                else 
                    Promise.reject({error : 'Algo salio mal en Get all sales'}) 
            })

            .then( data => {

                this.setState( { 
                    page     : 'Sales',
                    allSales : data
                } );
            })

            .catch( error => console.log('ERROR GET ALL SALES: ', error));
    }

    handleWatchSaleForm(e){
        e.preventDefault();

        this.setState( { 
            page     : 'SaleForm',
        } );
    }

    /**=================================================================================================== */
    /**RENDER */
    /**=================================================================================================== */
    render() {
        let table = '';

        if (this.state.page == 'Sales')
            table = <SalesTable 
                allSales       = { this.state.allSales }
                onDeleteSales  = { this.handleDeleteSales }
                clase          = { 'table table-hover customTable'}
                id             = { 'list-sales'}
            />
        else if ( this.state.page == 'SaleForm')
            table = <SaleForm 
                id_seller = { this.state.id_seller }
            />
            
        return (
            <div>
                <Dashboard 
                    onGetSalesData  = { this.handleWatchSales }
                    onGetSaleForm   = { this.handleWatchSaleForm }
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

                </main>            
            </div>
        );
    }
}
 
module.exports = Test;