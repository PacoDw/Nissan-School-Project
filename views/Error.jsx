import React from 'react';

const Err = props => {
    console.log('---------------------------------------')    
    console.log('Error')
    console.log('---------------------------------------')    
    return (
        <div>
            <h1> { props.message }</h1>
            <h2> { props.error.status }</h2>
            <pre>{ props.error.stack }</pre>
        </div>
    );
};

module.exports = Err;