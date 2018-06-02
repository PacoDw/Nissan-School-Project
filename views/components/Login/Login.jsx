import React from 'react';

// Modules
import Input  from '../InputText.jsx';
import Buttom from '../Buttom.jsx';
// import Head    from '../Head';
// import Header  from '../Header/Header'

class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = this.props;
    }

    render() {
        console.log('---------------------------------------')    
        console.log('Login')
        // console.log(this.state)
        console.log('---------------------------------------')        
        return (

            <div className="container" style={{ marginTop: '120px', paddingBottom: '25px'}} >
             
                {this.state.messageFlash.length > 0 &&
                <div className="alert alert-danger" role="alert" >
                    { this.state.messageFlash }
                </div>
                }

                <form className='form-signin bg-white rounded box-shadow' action='/login' method='POST'>
                    <div className='text-center mb-4'>
                        <h1 className='h3 mb-3 font-weight-normal'>Login</h1>
                    </div>

                    <Input 
                        name      = 'username'
                        text      = 'Username'
                    />

                    <Input 
                        type = 'password'
                        name = 'password'
                        text = 'Password'
                    />

                    <div className='checkbox mb-3'>
                        <label>
                        <input type='checkbox' name='checkbox' value='remember-me' /> Remember me
                        </label>
                    </div>
                    
                    <Buttom 
                        type = 'submit'
                        name = 'buttom-submit'
                        text = 'Sign in'
                    />

                    <p className='mt-5 mb-3 text-muted text-center'>&copy; 2018-Currently</p>
                </form>
            </div>
        )
    }

}

module.exports = Login;