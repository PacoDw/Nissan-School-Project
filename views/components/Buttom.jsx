import React from 'react';

const Buttom = props => {
    console.log('---------------------------------------')    
    console.log('Buttom')
    console.log(props)
    console.log('---------------------------------------')  
    return (
        <button 
            className='btn btn-lg btn-primary btn-block' 
            id      = { props.name } 
            name    = { props.name } 
            onClick = { props.someClick  }
        >
        {props.text}
        </button>
    );
};

module.exports = Buttom;