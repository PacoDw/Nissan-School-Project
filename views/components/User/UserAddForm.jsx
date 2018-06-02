const React = require( 'react');
const PropTypes = require( 'prop-types');

// Modules
const Input  = require( '../InputText.jsx');
const Buttom = require( '../Buttom.jsx');
const Select = require( '../Select.jsx');
// const Scripts = require( './components/Scripts.jsx'
// const Header = require( './components/Header/Header.jsx'
// const Head   = require( './components/Head.jsx'

const UserAddForm = ( props ) => {
    console.log('-------------------------');
    console.log('User Add Form   ')
    console.log('---------------------------------------')  
    // console.log(props.messageFlash)
    return (
    <div className="container">
        <form className='my-3 p-3 bg-white rounded box-shadow' action='/seller/addUser' method='POST'>
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

            <Buttom 
                type=''
                name='buttom-submit'
                text='Sign in'
                someClick = { props.onPostData }
            />

            <p className='mt-5 mb-3 text-muted text-center'>&copy; 2018-Currently</p>
        </form>
    </div>

)}

module.exports = UserAddForm;