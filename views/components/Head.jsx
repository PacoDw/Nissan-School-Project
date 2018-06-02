import React, { Component } from 'react';

const Head = (props) => {
    
    console.log('---------------------------------------')    
    console.log('Head')
    console.log('---------------------------------------')    

return   (
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <link rel="stylesheet" href="/assets/stylesheets/style.css"/>
            <link rel="stylesheet" href='/assets/stylesheets/bootstrap/dist/css/bootstrap.min.css' />
            <link rel="stylesheet" href='/assets/stylesheets/style-dashboard.css' />
            <title>{props.titlePage}</title>
        </head>           
    );
}
module.exports = Head;