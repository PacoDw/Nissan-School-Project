import React, { Component } from 'react';
import PropTypes            from 'prop-types'; 
// import ReactDOMServer       from ('react-dom/server');

// Components
import Head    from './components/Head.jsx';
import Header  from './components/Header/Header.jsx';
import Scripts from './components/Scripts.jsx';

class Home extends Component {

    constructor(...props){
        super(...props);

        this.state = { 
            users     : this.props.users || Home.defaultsProps.users, 
            auth      : this.props.auth || Home.defaultsProps.auth,
            titlePage : this.props.titlePage || Home.defaultsProps.titlePage  
            }
    }
    
    render() {
        // const initScript = 'main(' + this.state + ')';
        console.log('---------------------------------------')    
        console.log('Home')
        console.log('---------------------------------------')    
        return (
            <html lang="en">
                <Head 
                    titlePage = { this.state.titlePage }
                /> 
                <body>
                    <Header 
                        user      = { this.state.users } 
                        auth      = { this.state.auth } 
                        titlePage = { this.state.titlePage }
                    />

                    <Scripts />
                </body>
            </html>          
        );
    }
}

Home.defaultsProps = {
    users     : undefined,
    auth      : false,
    titlePage : 'Nissan'
}

Home.propsTypes = {
    users     : PropTypes.object,
    auth      : PropTypes.bool,
    titlePage : PropTypes.string
}

module.exports = Home;