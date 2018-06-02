import React, { Component } from 'react';
// import PropTypes            from 'prop-types'; 

// Components
import Head      from './components/Head.jsx';
import Header    from './components/Header/Header.jsx';
import Scripts   from './components/Scripts.jsx';


class Seller extends Component {

    constructor(...props){
        super(...props);

        console.log(this.props);

        this.state = { 
            titlePage    : this.props.titlePage, //|| Seller.defaultsProps.titlePage,
            users        : this.props.username, //|| Seller.defaultsProps.users, 
            auth         : this.props.auth, //|| Seller.defaultsProps.auth,
            messageFlash : this.props.messageFlash, //|| Seller.defaultsProps.messageFlash  
            options      : this.props.options    
        }

            console.log(this.state);
    }

    render() {
        console.log('---------------------------------------')    
        console.log('Seller')
        console.log('---------------------------------------')    
        return (
            <div className="container">
            
            <Head 
                titlePage = { this.state.titlePage }
            />     

            <Header 
                user      = { this.state.users } 
                auth      = { this.state.auth } 
                titlePage = { this.state.titlePage }
            />
            
            
            
            <Scripts />
            </div>            
        );
    }
}

// Seller.defaultsProps = {
//     users        : undefined,
//     auth         : false,
//     titlePage    : 'Seller',
//     messageFlash : undefined
// }

// Seller.propsTypes = {
//     users        : PropTypes.object,
//     auth         : PropTypes.bool,
//     titlePage    : PropTypes.string,
//     messageFlash : PropTypes.string
// }

module.exports = Seller;