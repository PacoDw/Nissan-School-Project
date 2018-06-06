const React = require('react');
const PropTypes = require('prop-types');
const TransitionGroup = require('react-addons-transition-group');

// Modules
const Input = require('../InputText.jsx');
const Buttom = require('../Buttom.jsx');
const Select = require('../Select.jsx');
const MessageFlash = require('../MessageFlash.jsx');


class AccountAddForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible       : props.visible,
            onPostData    : props.onPostData,
            options       : props.options,
            messageFlash  : ''
            }
    }

     static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.visible !== prevState.visible) {
            
            return {
                visible: nextProps.visible,
                messageFlash: nextProps.messageFlash
            }
        }
        if (nextProps.options !==  prevState.options){
            return{
                options  : nextProps.options
            }
        }
        else
            return null;
    }

    componentDidMount() {
        let ajax = new XMLHttpRequest();

        ajax.onload = () => {
            if(ajax.status == 200) {
                this.setState({
                    options : ajax.responseText
                })
            }
        }
        ajax.open('GET', '/seller/SellersWithoutAccount', true); 
        ajax.send(); 
    }

    render() {
        return (
            <div id="addAccount" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add new Account</h5>
                            <button id='closeAddForm' type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <TransitionGroup>
                            {this.state.visible ? <MessageFlash messageFlash = { this.state.messageFlash }
                                clase="alert alert-danger messageFlash"
                            /> : null}
                        </TransitionGroup>

                        <form id='accountAddForm' className='my-3 p-3 bg-white rounded box-shadow' action='/account/addAccount' method='POST'>
                            <Input
                                type='text'
                                name='username'
                                text='Username'
                            />
                            <Input
                                type='password'
                                name='password'
                                text='Password'
                            />
                            <Input
                                type='email'
                                name='email'
                                text='Email'
                            />
                            <Select
                                options = { this.state.options }
                                text    = { 'You have sellers without an Account! Select a seller to add one...' }
                                id      = 'select-account-add-form'
                            />

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <Buttom
                                type=''
                                name='buttom-save-account'
                                text='Save Changes'
                                someClick = { this.state.onPostData }
                            />
                            </div>                         
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = AccountAddForm;