import React from 'react';

const ListHeader = props => {
    console.log('---------------------------------------')    
    console.log('List Header')
    console.log(props.auth)
    console.log('---------------------------------------')  
    const list = props.auth ? (
            <ul className='nav nav-pills float-right'>
                <li className='nav-item'>
                    <a className='nav-link' href='/'>Home</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/seller/myDashboard'>Dashboard</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='#'>Profile</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/register'>Register</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/logout'>Logout</a>
                </li>
            </ul>
            ) : (
                <ul className='nav nav-pills float-right'>
                
                <li className="nav-item">
                    <a className="nav-link" href="#">Title<span className="sr-only"></span></a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/'>Home</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/login'>Login</a>
                </li>
                </ul>
            )
    return list;
};

module.exports = ListHeader;