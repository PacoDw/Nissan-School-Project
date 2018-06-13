
import React, { Component } from 'react';

const Scripts = props => { 
return (
    <div>
        <script src="../../assets/feather-icons/dist/feather.js" />   
        <script src="../../assets/main.js" />
        <script dangerouslySetInnerHTML={{__html: 'main(' + JSON.stringify(props.data) + ",'" + props.view + "')" }} />
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" />
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" />
       
    </div>
    );
}
module.exports = Scripts;

// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.2/css/mdb.min.css" />

// <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.2/js/mdb.min.js"></script>