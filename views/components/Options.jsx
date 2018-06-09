import React from 'react';

const Option = props => {
    // console.log('Options---------------------');
    // console.log(props);
    console.log('---------------------------------------')    
    console.log('Option')
    console.log(props);
    console.log('---------------------------------------')  

    return (
        <option 
            className='form-control' 
            id={props.id} 
            typeAccount={ props.typeAccount } 
            value={ props.val } 
        >{ props.name }
        </option>
    );
};

module.exports = Option;