import React from 'react';

const ListHeader = props => {

    const list = props.auth ? (
            <ul className='nav nav-pills float-right'>
                <li className='nav-item'>
                    <a className='nav-link' href='/logout'>Logout</a>
                </li>
            </ul>
            ) : (
                <ul className='nav nav-pills float-right'>

                </ul>
            )
    return list;
};

module.exports = ListHeader;