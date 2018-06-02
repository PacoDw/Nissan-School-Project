const React = require( 'react');
const PropTypes = require( 'prop-types');
const TransitionGroup = require('react-addons-transition-group');
import { render, findDOMNode } from 'react-dom';



// Modules
const Input  = require( '../InputText.jsx');
const Buttom = require( '../Buttom.jsx');
const Select = require( '../Select.jsx');
const MessageFlash = require('../MessageFlash.jsx');
// const Scripts = require( './components/Scripts.jsx'
// const Header = require( './components/Header/Header.jsx'
// const Head   = require( './components/Head.jsx'

class SellerAddForm extends React.Component {
    constructor(props){
        super(props);
        console.log('----------------2323232323-2----------------------------')
        console.log(props)
        console.log('----------------2323232323-2----------------------------')

        this.state = { 
            visible : props.visible,
            options : props.options,
            onPostData : props.onPostData,
            messageFlash : ''
        }

    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        // do things with nextProps.someProp and prevState.cachedSomeProp
console.log('88888***********************************88888')
        console.log('nextProps: ' ,nextProps.visible);
        console.log('prevState: ' ,prevState.visible);
        console.log('prevState messageFlash: ' ,prevState.messageFlash);
        console.log('nextProps messageFlash: ' ,nextProps.messageFlash);

        
        if(nextProps.visible !== prevState.visible)
        {
            return {
                visible : nextProps.visible,
                messageFlash : nextProps.messageFlash
            }
        }

    }

    render() {
        console.log('88888***********************************88888')
        console.log('Seller Add Form')
        console.log('VisibleState: ', this.state.visible)
        console.log('MessageFlash: ', this.state.messageFlash)

        console.log('---------------------------------------')  
        // console.log(props.messageFlash)
        return (
            <div className="container" id='containerForm'>
            
                <TransitionGroup>
                    {this.state.visible ? <MessageFlash messageFlash = { this.state.messageFlash }/> : null}
                </TransitionGroup> 

                <form id='sellerAddForm' className='my-3 p-3 bg-white rounded box-shadow' action='/seller/addSeller' method='POST'>

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
                    <Input 
                        type='number'
                        name='phone'
                        text='Phone'
                    />
                    <Input 
                        type='text'
                        name='adress'
                        text='Address'
                    />
                    <Input 
                        type='text'
                        name='city'
                        text='City'
                    />
                    <Input 
                        type='text'
                        name='state'
                        text='State'
                    />
                    <Input 
                        type='text'
                        name='postal_code'
                        text='Postal code'
                    />
                    <Input 
                        type='text'
                        name='country'
                        text='Country'
                    />

                    <Select 
                        options = { this.state.options }
                    />

                    <Buttom 
                        type=''
                        name='buttom-submit'
                        text='Sign in'
                        someClick = { this.state.onPostData }
                    />

                    <p className='mt-5 mb-3 text-muted text-center'>&copy; 2018-Currently</p>
                </form>
            </div>
        )
    }
}

module.exports = SellerAddForm;


  // { //props.messageFlash.length > 0 &&
        //     <div className="alert alert-danger" role="alert" >
        //         { this.props.messageFlash }
        //     </div>
        // }