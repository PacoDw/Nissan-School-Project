import React, { Component } from 'react';

import Api from '../../../utils/Api'


const Input = require('../InputText.jsx');
const Card = require('../Card.jsx');
const Button = require('../Buttom.jsx');

class SaleForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allCars       : '',
            id_seller    : props.id_seller,
            car_info      : '',
            customer_info : ''
        }

        this.handleNewOrder        = this.handleNewOrder.bind(this);
        this.handleSelectedCar     = this.handleSelectedCar.bind(this);
        this.handleClickSubmitForm = this.handleClickSubmitForm.bind(this);
    }

    componentDidMount() {
        Api
            .get(`/car/allCarsFromSeller/${this.state.id_seller}`)

            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    Promise.reject({ error: 'Algo salio mal en All Cars Of' })
            })

            .then(data => {
                this.setState({ allCars: data });
            })

            .catch(error => console.log('ERROR GET All Cars Of: ', error));
    }


    handleSelectedCar(e) {
        e.preventDefault();

        // HAcer algo con la selecfcion 
        this.setState({ id_car: e.target.id });

        this.setState( { car_info : this.state.allCars.find( item => item.id = e.target.id ) } );

        let currentNav = document.getElementById('nav-chose-car-tab');
        currentNav.style.backgroundColor = '#5ded5d99';

        let nextNav = document.getElementById('nav-customer-info-tab');
        nextNav.click();


    }

    handleClickSubmitForm(e){
        e.preventDefault();

        let form = document.querySelector('#customer-form');
        
        this.onGetForm(form, ( dataForm ) => {


            dataForm['id_seller'] = this.state.id_seller;


            this.setState( { customer_info : dataForm } );
            

        Api
            .post(`/customer/addCustomer`, dataForm)

            .then( response => {
                if (response.ok)
                    return response.json();
                else
                    Promise.reject({ error: 'Algo salio mal en Customers form' })
            })

            .then( data => {

                dataForm['id_customer'] = data.id_customer;

                console.log('DATA CUST: ', dataForm);
                this.setState({  
                    customer_info : dataForm, 
                });

            let currentNav = document.getElementById('nav-customer-info-tab');
            currentNav.style.backgroundColor = '#5ded5d99';

            let nextNav = document.getElementById('nav-sale-tab');
            nextNav.click();
            })

            .catch(error => console.log('ERROR GET Customers form: ', error));
        });
    }

    handleNewOrder(){

        let data = {
            id_seller  : this.state.id_seller,
            id_car      : this.state.car_info.id,
            id_customer : this.state.customer_info.id_customer,
            deposit     : this.state.car_info.cost
        }


        console.log('DATA SALE: ', data);
        console.log('Customer: ', this.state.customer_info);


        Api
            .post(`/order/addOrder`, data )

            .then( response => {
                if (response.ok)
                    return response.json();
                else
                    Promise.reject({ error: 'Algo salio mal en Customers form' })
            })

            .then( data => {
                
                window.location('/seller');
            })

            .catch(error => console.log('ERROR GET Customers form: ', error));

    }

    onGetForm(formulario, callback){
        const dataForm = {};
        let key   = '';
        let value = '';

        console.log('formulario: ', formulario)

        for (let i = 0; i < formulario.elements.length; i++)
        {
            console.log('valor: ',formulario.elements[i].attributes['name'])
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

    render() {

        let imagesLis = this.state.allCars || [];

        let images = imagesLis.map((item, i) => {

            return (
                <Card
                    key={i}
                    item={item}
                    someClick={this.handleSelectedCar}
                />
            )
        });

        return (
            <div className='sale-form'>
                <nav style={{ backgroundColor: '#d8d8d8' }}>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist" style={{ borderBottom: 'none' }}>

                        <a className="nav-item nav-link active nav-sale-form" id="nav-chose-car-tab" data-toggle="tab" href="#nav-chose-car" role="tab" aria-controls="nav-chose-car" aria-selected="true">
                            Choose your car
                            </a>
                        <a className="nav-item nav-link  nav-sale-form" id="nav-customer-info-tab" data-toggle="tab" href="#nav-customer-info" role="tab" aria-controls="nav-customer-info" aria-selected="false">
                            Customer information
                            </a>

                        <a className="nav-item nav-link nav-sale-form" id="nav-sale-tab" data-toggle="tab" href="#nav-sale" role="tab" aria-controls="nav-sale" aria-selected="false">
                            Details of the sale
                            </a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent" style={{ padding: '15px' }}>

                    <div className="tab-pane fade show active" id="nav-chose-car" role="tabpanel" aria-labelledby="nav-chose-car-tab">
                        {images}
                    </div>

                    <div className="tab-pane fade" id="nav-customer-info" role="tabpanel" aria-labelledby="nav-customer-info-tab">
                        <div className="container">
                            <form id='customer-form'>

                                <div className="form-row">
                                        <Input 
                                            name = 'name'
                                            text = 'Name'
                                            claseDiv = "form-group col-md-4"
                                        />
                                        <Input 
                                            name = 'lastname'
                                            text = 'Lastname'
                                            claseDiv = "form-group col-md-4"
                                        />
                                        
                                        <Input 
                                            name = 'phone'
                                            text = 'Phone'
                                            claseDiv = "form-group col-md-4"
                                        />
                                </div>


                                <Input 
                                    name = 'address'
                                    text = 'Address'
                                />


                                <div className="form-row">

                                    <Input 
                                        name = 'country'
                                        text = 'Country'
                                        claseDiv = "col-3"
                                    />

                                     <Input 
                                        name = 'city'
                                        text = 'City'
                                        claseDiv = " col"
                                    />

                                    <Input 
                                        name = 'state'
                                        text = 'State'
                                        claseDiv = "col"
                                    />

                                    <Input 
                                        name = 'postal_code'
                                        text = 'Postal_code'
                                        claseDiv = "col"
                                    />

                                </div>
                            </form>
                            <br/>
                            <Button 
                                name      = 'button'
                                someClick = { this.handleClickSubmitForm }
                                text      = 'Next' 
                            />
                        </div>
                    </div>

                    <div className="tab-pane fade" id="nav-sale" role="tabpanel" aria-labelledby="nav-sale-tab">
                        <div class="jumbotron">
                            <h1 class="display-4">Resume of you sale!</h1>
                            <p class="lead">
                                CAR:     { this.state.car_info.name }
                            </p>
                            <p class="lead">
                                MODEL:   { this.state.car_info.model }                            
                            </p>
                            <p class="lead">
                                DETAILS: { this.state.car_info.details }                            
                            </p>

                            <hr class="my-4"/>
                            <p>TOTAL : { this.state.car_info.cost }</p>

                            <Button 
                                name      = 'button'
                                someClick = { this.handleNewOrder }
                                text      = 'Sale it' 
                            />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = SaleForm;