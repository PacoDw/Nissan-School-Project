import React from 'react';

const Option = props => {
    return (
        <option 
            className='form-control' 
            id={props.id} 
            typeaccount={ props.typeAccount } 
            value={ props.val } 
        >{ props.name }
        </option>
    );
};

module.exports = Option;