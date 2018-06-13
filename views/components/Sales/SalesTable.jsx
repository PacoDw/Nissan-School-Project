import React, { Component } from 'react';
import Icon from '../Icon.jsx';
import Api from '../../../utils/Api' 

class SaleTable extends Component {

    constructor(props){
        super(props);

        this.state = {
            id_user      : props.id_user, 
            allSales     : props.allSales || '',
            onDeleteSale : props.onDeleteSale
         } 
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.allSales !==  prevState.allSales){
            return{
                allSales   : nextProps.allSales
            }
        }
        else
        return false;
    }

    componentWillMount(){
        
        Api
            .get(`/sales/allSales/${this.state.id_user}`)
            
            .then( response => {
                console.log('Response TableAllSales: ',  response);
                if (response.ok){
                    console.log('Response JSON: ', response.json());

                    this.setState( { allSales : response.json() } );
                }
                else 
                    Promise.reject({error : 'Algo salio mal en table Get all sales'}) 
            })

            .catch( error => console.log('ERROR GET Table ALL SALES: ', error));
    }

    render() {

        let itemlist = <tr><td colSpan='10' style={{textAlign : 'center'}}>Sin registros</td></tr>;
        console.log('LIST Sale: ', this.state.allSales);
        if(this.state.allSales != '' && this.state.allSales != [])
        {
            let list = this.state.allSales;
            itemlist = 	list.map((i, index) => {
                let id = 0;

                return (
                    <tr key={ i.id_sale }>
                        <th key={`${i.id_sale}00${++id}`} scope='row'> { i.id_sale }</th>
                        <td key={`${i.id_sale}00${++id}`}>{ i.car_name }</td>
                        <td key={`${i.id_sale}00${++id}`}>{ i.customer_name }</td>
                        <td key={`${i.id_sale}00${++id}`}>{ i.status_sale }</td>
                        <td key={`${i.id_sale}00${++id}`}>{ i.deposit }</td>
                        <td key={`${i.id_sale}00${++id}`}>{ i.cost }</td>
                    </tr>)
                });
                console.log('ITEM LIST: ', itemlist);
            }
        
        return (
            <table 
                className = { this.props.clase }
                role      = { this.props.role }
                aria-labelledby = { this.props.ariaLab }
                id        = { this.props.id}
            >
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#id</th>
                        <th scope="col">Car name</th>
                        <th scope="col">Customer name</th>
                        <th scope="col">Status sale</th>
                        <th scope="col">Deposit</th>
                        <th scope="col">Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    { itemlist }
                </tbody>
            </table>
        );
    }
}

module.exports = SaleTable;