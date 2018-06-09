import React          from'react';
import ReactDOMServer from'react-dom/server';

// Modules
import Head    from './components/Head.jsx';
import Header  from './components/Header/Header.jsx';
import Scripts from './components/Scripts.jsx';

import OfficeManager from './OfficeManager.jsx'

class OfficeManagerApp extends React.Component {

    constructor(...props){
        super(...props);

        this.state = this.props;

    }
    render() {       
        let data = this.props;

        console.log('ServerStart---------------------------------------')
        let contentHtml = ReactDOMServer.renderToString(<OfficeManager { ...data } />);
        console.log('ServerEND-----------------------------------------')

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

                    <div id="content-body" dangerouslySetInnerHTML={{__html: contentHtml}} />                    
                    
                    <Scripts 
                        data = { data }
                        view = { "OfficeManager" }
                    />
            </body>
        </html>    
        )
    }
}

module.exports = OfficeManagerApp;