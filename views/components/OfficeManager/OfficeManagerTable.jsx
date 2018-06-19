import React, { Component } from 'react';
import Icon from '../Icon.jsx';
import Api from '../../../utils/Api';

class OfficeManagerTable extends Component {

    constructor(props){
        super(props);

        this.state = {
            allOfficeManagers      : props.allOfficeManagers   || '',
            onDeleteOfficeManager  : props.onDeleteOfficeManager
         } 
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.allOfficeManagers !==  prevState.allOfficeManagers){
            return{
                allOfficeManagers   : nextProps.allOfficeManagers
            }
        }
        else
        return false;
    }


    render() {

        let itemlist = <tr><td colSpan='10' style={{textAlign : 'center'}}>Sin registros</td></tr>;
        console.log('LIST Office Manager: ', this.state.allOfficeManagers);
        if(this.state.allOfficeManagers != '' && this.state.allOfficeManagers != [])
        {
            let list = this.state.allOfficeManagers;
            itemlist = 	list.map((i, index) => {
                let id = 0;

                return (
                    <tr key={ i.id_office_manager }>
                        <th key={`${i.id_office_manager}00${++id}`} scope='row'> { i.id_office_manager }</th>
                        <td key={`${i.id_office_manager}00${++id}`}>{ i.name }</td>
                        <td key={`${i.id_office_manager}00${++id}`}>{ i.lastname }</td>
                        <td key={`${i.id_office_manager}00${++id}`}>{ i.phone }</td>
                        <td key={`${i.id_office_manager}00${++id}`}>{ i.address }</td>
                        <td key={`${i.id_office_manager}00${++id}`}>{ i.city }</td>
                        <td key={`${i.id_office_manager}00${++id}`}>{ i.state }</td>
                        <td key={`${i.id_office_manager}00${++id}`}>{ i.postal_code }</td>
                        <td key={`${i.id_office_manager}00${++id}`}>{ i.country }</td>
                        <td key={`${i.id_office_manager}00${++id}`}><Icon 
                                key  = {`edit${i.id_office_manager}`}
                                id   = { i.id_office_manager }
                                first = 'icon'
                                icon  = 'edit-3'
                                clase = 'icon-table'
                                // someClick = { this.handleClickEdit }
                                tipTitle   =  'Edit'
                                dataToggle = 'tooltip'
                                position   = 'bottom'
                            />    
                            <Icon
                                key  = {`delelete${i.id_office_manager}`}
                                id   = { i.id_office_manager } 
                                first = 'icon'
                                icon  = 'trash-2'
                                clase = 'icon-table'
                                someClick = { this.state.onDeleteOfficeManager }
                                tipTitle   =  'Delete'
                                dataToggle = 'tooltip'
                                position   = 'bottom'
                            />
                        </td>
                    </tr>)
                });
                console.log('ITEM LIST: ', itemlist);
            }
        
        return (
            <table 
                className = { this.props.clase }
                role      = { this.props.role }
                aria-labelledby = { this.props.ariaLab }
                id        = { this.props.id}
            >
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Last</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">City</th>
                        <th scope="col">State</th>
                        <th scope="col">Postal Code</th>
                        <th scope="col">Country</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { itemlist }
                </tbody>
            </table>
        );
    }
}

module.exports = OfficeManagerTable;