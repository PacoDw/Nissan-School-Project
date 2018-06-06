import React from 'react';

const Buttom = props => {
    let color = {
        backgroundColor: props.color
    };
    return (
        <button 
            className ='btn btn-primary' 
            style= { color }
            id      = { props.name } 
            name    = { props.name } 
            onClick = { props.someClick  }
        >
        {props.text}
        </button>
    );
};

module.exports = Buttom;