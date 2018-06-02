const React = require('react');
const { findDOMNode } = require('react-dom');
// Modules
// const Input  from '../InputText.jsx';
// const Buttom from '../Buttom.jsx';
// const Select from '../Select.jsx';
const Dashboard      =  require('./components/Dashboard/Dashboard.jsx');
const SellerAddForm  =  require('./components/Seller/SellerAddForm.jsx');
const UserAddForm    = require('./components/User/UserAddForm.jsx');

class Test extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            sellerOptions : props.sellerOptions || [],
            messageFlash  : props.messageFlash || '',
            visible : false 
         }

        this.handleGetSellers = this.handleGetSellers.bind(this);
        this.handleAddSeller  = this.handleAddSeller.bind(this);
        this.handleAddUser    = this.handleAddUser.bind(this); 

        console.log('---------------------------------')
        console.log('Select opcion ')
        console.log(this.state)
        console.log('---------------------------------')

    }


    // componentDidMount(e){
    //     e.preventDefault();
    //     alert('Primer Render')
    // }

    handleGetSellers(e){
        e.preventDefault();
        console.log('---------------------------------------')    
        console.log('Handle all sellers')
        console.log('---------------------------------------')    
        // this.alert('Ver ewtodos los selleres');
        alert('Get Sellers');
    }

    handleAddUser(e) {
        // e.preventDefault();
        // alert('AddUser');
    }

    handleAddSeller(e) {
        e.preventDefault();

        let formulario = document.querySelector('#sellerAddForm'); 

        const dataForm = {};
        let key   = '';
        let value = '';

        for (let i = 0; i < formulario.elements.length; i++)
        {

            if (formulario.elements[i].tagName == 'SELECT')
            { 
                key = 'selected';
                value = { 
                    'id_office_manager'  : formulario.elements[i].selectedOptions[0].attributes['id'].nodeValue,
                    'value' :formulario.elements[i].selectedOptions[0].attributes['value'].nodeValue 
                };
            }
            else if(formulario.elements[i].tagName == 'INPUT')
            {
                key   = formulario.elements[i].attributes['name'].nodeValue;
                value = formulario.elements[i].attributes['value'].nodeValue;
            }
            dataForm[key] = value;
        }

        let ajax = new XMLHttpRequest(); // Creo el objeto XMLHttpRequest y lo guardo en ajax

        ajax.onload = () => {
            if(ajax.status != 200) {
                console.log('algo salio mal')
                this.setState({
                    visible : !this.state.visible,
                    messageFlash : JSON.parse(ajax.responseText).messageFlash
                });

                setTimeout(() => {
                    this.setState({
                        visible : !this.state.visible
                    });
                }, 4000)

            } else {
                alert('Algo salió BIEN');
                console.log(ajax.responseText);
            }
        }
        ajax.open('POST', '/seller/addSeller', true); // Preparando la peticion al servidor
        ajax.setRequestHeader('Content-Type', 'application/Json');
        ajax.send(JSON.stringify(dataForm)); // Enviando la peticion
    }

  render() {
    console.log('---------------------------------------')    
    console.log('Test')
    console.log(this.props);
    console.log('---------------------------------------')    
        
    return (
            <div>

                <Dashboard 

                />

                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 main-content">
                   
                {// Gets
                // Hacer diferentes tables class y cada una con su logica
                // metodo didmout para cargar los datos
                }
                <div id="addSeller" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add new seller</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                            <SellerAddForm
                                options      = { this.props.sellerOptions   }
                                messageFlash = { this.state.messageFlash }
                                onPostData   = { this.handleAddSeller }
                                visible      = { this.state.visible }
                            />

                        </div>
                    </div>
                </div>

                <div id="addUser" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add new user</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <UserAddForm
                            onPostData = { this.handleAddUser }
                        />
                        </div>
                    </div>
                </div>
                </main>            
            </div>
    );
  }
}
 
module.exports = Test;


    //     text-align: right;
    // padding-top: 8px;
    // padding-right: 14px;