const React           = require('react');
const TransitionGroup = require('react-addons-transition-group');

// Modules
const Input        = require('../InputText.jsx');
const Buttom       = require('../Buttom.jsx');
const Select       = require('../Select.jsx');
const MessageFlash = require('../MessageFlash.jsx');

class OfficeManagerAddForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible      : props.visible,
            onPostData   : props.onPostData,
            options      : props.options,
            messageFlash : ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.visible !== prevState.visible) {
            return {
                visible: nextProps.visible,
                messageFlash: nextProps.messageFlash
            }
        }
        else
            return null;

    }

    render() {
        return (
            <div id="AddGlobalManager" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add new GlobalManager</h5>
                            <button id='closeSellerForm' type="button"  className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <TransitionGroup>
                            {this.state.visible ? <MessageFlash messageFlash = { this.state.messageFlash }
                                clase="alert alert-danger messageFlash"
                            /> : null}
                        </TransitionGroup>

                        <form id='GlobalManagerAddForm' className='my-3 p-3 bg-white rounded box-shadow' action='/GlobalManager/AddGlobalManager' method='POST'>

                            <Input
                                type='text'
                                name='name'
                                text='Name'
                            />

                            <Input
                                type='text'
                                name='lastname'
                                text='Lastname'
                            />
                            <Input
                                type='number'
                                name='phone'
                                text='Phone'
                            />
                            <Input
                                type='text'
                                name='address'
                                text='Address'
                            />
                            <Input
                                type='text'
                                name='city'
                                text='City'
                            />
                            <Input
                                type='text'
                                name='state'
                                text='State'
                            />
                            <Input
                                type='text'
                                name='postal_code'
                                text='Postal code'
                            />
                            <Input
                                type='text'
                                name='country'
                                text='Country'
                            />

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <Buttom
                                    type='reset'
                                    color = 'orange'
                                    name='buttom-save-GlobalManager'
                                    text='Save Changes'
                                    someClick={this.state.onPostData}
                                />
                            </div>                            
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = OfficeManagerAddForm;