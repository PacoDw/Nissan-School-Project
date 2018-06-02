import React, { Component } from 'react';

const ListHeader = require('./ListHeader.jsx');

const Header = (props) => {
    console.log('---------------------------------------')    
    console.log('Header')
    console.log('---------------------------------------')  
    return (
            <nav className='fixed-top flex-md-nowrap shadow nav justify-content-end dashboard-nav'>
                <h4 className='title-dashboard' >{ props.titlePage }</h4>
                <ListHeader auth = { props.auth } />
            </nav>
    );
}

module.exports = Header;