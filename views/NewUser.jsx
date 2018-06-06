import React from 'react';
import PropTypes from 'prop-types';

// Modules
import Input  from './components/InputText.jsx';
import Buttom from './components/Buttom.jsx';
import Select from './components/Select.jsx';
import Scripts from './components/Scripts.jsx'
import Header from './components/Header/Header.jsx'
import Head   from './components/Head.jsx'

const NewUser = ( props ) => {
    console.log('-------------------------');
    console.log('New User');
    console.log('-------------------------');

    return (

        <div className="container">
            <form className='my-3 p-3 bg-white rounded box-shadow' action='/user/newUser' method='POST'>
                <div className='text-center mb-4'>
                    <h1 className='h3 mb-3 font-weight-normal'>New Seller</h1>
                </div>
                <Input 
                    type='text'
                    name='Username'
                    text='Username'
                />

                <Select 
                    options = { 
                        {
                            seller        : 'Seller',
                            officeManager : 'Office Manager',
                            globalManager : 'Global Manager'
                        }
                     }
                />

                <Input 
                    type='text'
                    name='email'
                    text='Email'
                />
                <Input 
                    type='text'
                    name='pasword'
                    text='Pasword'
                />
                <Input 
                    type='text'
                    name='rePassword'
                    text='Repeat Password'
                />

                <Select 
                    options = { props.options }
                />

                <Buttom 
                    type='submit'
                    name='buttom-submit'
                    text='Submit'
                />
            </form>
        </div>

)}

module.exports = NewUser;