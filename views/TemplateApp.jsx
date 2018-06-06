import React          from'react';
import ReactDOMServer from'react-dom/server';

// Modules---------------------------------------------

import Head    from './components/Head.jsx';
import Header  from './components/Header/Header.jsx';
import Scripts from './components/Scripts.jsx';

import Test    from './Test.jsx'


class Template extends React.Component {

    constructor(...props){
        super(...props);

        this.state = this.props;

    }
    render() {       
        let someData = this.props;

        console.log('ServerStart---------------------------------------')
        let contentHtml = ReactDOMServer.renderToString(<Someting { ...someData } />);
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
                        data = { someData }
                        view = { "Some view" }
                    />
            </body>
        </html>    
        )
    }
}

module.exports = Template;