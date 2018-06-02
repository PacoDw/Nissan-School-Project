import React from 'react';

const InputText = props => {
    console.log('---------------------------------------')    
    console.log('Input Text')
    console.log('---------------------------------------')  
    return (
        <div className='form-label-group'>
            <input 
                className   = 'form-control' 
                type        = { props.type || 'text' } 
                id          = { props.name } 
                name        = { props.name }
                placeholder = { props.text } 
                required  
                value='4'
            />
            <label htmlFor={props.name}>{props.text}</label>
        </div>
    );
};

module.exports = InputText;