import React, { Component } from 'react';

import Api from '../../../utils/Api' 


const Input = require('../InputText.jsx');
const Card  = require('../Card.jsx');

class SaleForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            allCars   : '',
            id_user   : props.id_user 
         }

         this.handleSelectedCar = this.handleSelectedCar.bind(this);
    }

    componentDidMount(){
        Api
            .get(`/car/allCarsFromSeller/${this.state.id_user}`)
            
            .then( response => {
                if (response.ok)
                    return response.json();
                else 
                    Promise.reject({error : 'Algo salio mal en All Cars Of'}) 
            })

            .then( data => {
                this.setState( { allCars  : data } );
            })

            .catch( error => console.log('ERROR GET All Cars Of: ', error));
    }


    handleSelectedCar(e){
        e.preventDefault();

        // HAcer algo con la selecfcion 
        console.log(e.target.id);

        let currentNav = document.getElementById('nav-home-tab');
        currentNav.style.backgroundColor = '#5ded5d99';
        
        let nextNav = document.getElementById('nav-profile-tab');
        nextNav.click();

    }
    render() {

        let imagesLis = this.state.allCars || [];
        
        let images = imagesLis.map( ( item, i ) => {

            return (
                <Card 
                    key    = { i }
                    item   = { item }
                    someClick = { this.handleSelectedCar }
                />
            )
        } );
            
        return (
            <div className='sale-form'>
                <nav style={{backgroundColor: '#d8d8d8'}}>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist" style={{ borderBottom : 'none' }}>

                            <a className="nav-item nav-link active nav-sale-form" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                                Choose a car
                            </a>
                            <a className="nav-item nav-link  nav-sale-form" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">
                                Algo
                            </a>

                            <a className="nav-item nav-link nav-sale-form" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">
                                Details of the sale
                            </a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent" style={{padding : '15px'}}>
                    
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"> 

                        { images }
                    
                        </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">      
                        <Input
                            type='text'
                            name='name'
                            text='Name'
                        />
                        <Input
                            type='text'
                            name='lastname'
                            text='Lastname'
                        />
                    <hr/>

                    </div>

                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatibus ad tenetur ipsum dicta numquam placeat enim aut corrupti nulla temporibus repellat est ab sapiente velit obcaecati, quo ducimus. Quo.</div>
                </div>
            </div>
        );
    }
}

module.exports = SaleForm;