import React, { Component } from 'react';
import Icon from '../Icon.jsx';

class SellerTable extends Component {

    constructor(props){
        super(props);

        this.state = {
            allSellers : props.allSellers,
            onDeleteParent : props.onDeleteSeller
         }

         this.handleclickDelete = this.handleclickDelete.bind(this);
         this.handleClickEdit   = this.handleClickEdit.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.allSellers !==  prevState.allSellers){
            return{
                allSellers   : nextProps.allSellers
            }
        }
        else
        return false;
    }

    componentDidMount() {
        let ajax = new XMLHttpRequest(); // Creo el objeto XMLHttpRequest y lo guardo en ajax

        ajax.onload = () => {
            if(ajax.status != 200) {
                alert('Todo MAL ')
            } else {                
                this.setState({
                    allSellers : ajax.responseText
                })
                this.state.onDeleteParent(ajax.responseText, undefined);
            }
        }
        ajax.open('GET', '/seller/allSellers', true); 
        ajax.send(); 
    }

    handleclickDelete(e){
        e.preventDefault();
    
        console.log(e.target);
        
        let id  = e.target.attributes['id'].nodeValue || e.target.attributes['id'].nodeValue;
        
        let ajax = new XMLHttpRequest();
        
        ajax.onload = () => {
            if(ajax.status != 200)
            {
                alert('ALGO SALIO MAL SELLER TABLE');
            } 
            else 
            {
                let tr = JSON.parse(this.state.allSellers);
                let results = tr.filter( (obj) =>  obj.id_seller != id );
                
                this.setState({
                    allSellers : JSON.stringify(results)
                });
                
                this.state.onDeleteParent(JSON.stringify(results), id);
            }
        }
        ajax.open('DELETE', `/seller/deleteSeller/${id}`, true); 
        ajax.send(); 
    }

    handleClickEdit(e){
        alert('Click Edit');
        // let ajax = new XMLHttpRequest(); // Creo el objeto XMLHttpRequest y lo guardo en ajax
    
        //     ajax.onload = () => {
        //         if(ajax.status != 200) {
        //             alert('Todo MAL ')
        //         } else {
        //             // console.log('Res: ', ajax.responseText);
                    
        //             this.setState({
        //                 allSellers : ajax.responseText
        //             })
        //         }
        //     }
        //     ajax.open('UPDATE', '/seller/', true); 
        //     ajax.send(); 
    }
    render() {

        let itemlist = '';
        if(this.state.allSellers)
        {
            let list = JSON.parse(this.state.allSellers);
            itemlist = 	list.map((i, index) => {
                let id = 0;

                return (
                    <tr key={ i.id_seller }>
                        <th key={`${i.id_seller}00${++id}`} scope='row'> { i.id_seller }</th>
                        <td key={`${i.id_seller}00${++id}`}>       { i.name }</td>
                        <td key={`${i.id_seller}00${++id}`}>   { i.lastname }</td>
                        <td key={`${i.id_seller}00${++id}`}>      { i.phone }</td>
                        <td key={`${i.id_seller}00${++id}`}>    { i.address }</td>
                        <td key={`${i.id_seller}00${++id}`}>       { i.city }</td>
                        <td key={`${i.id_seller}00${++id}`}>      { i.state }</td>
                        <td key={`${i.id_seller}00${++id}`}>{ i.postal_code }</td>
                        <td key={`${i.id_seller}00${++id}`}>    { i.country }</td>
                        <td key={`${i.id_seller}00${++id}`}>
                            <Icon 
                                key  = {`edit${i.id_seller}`}
                                id   = { i.id_seller }
                                first = 'icon'
                                icon  = 'edit-3'
                                clase = 'icon-table'
                                someClick = { this.handleClickEdit }

                                tipTitle   =  'Edit'
                                dataToggle = 'tooltip'
                                position   = 'bottom'
                            />    

                            <Icon
                                key  = {`delelete${i.id_seller}`}
                                id   = { i.id_seller } 
                                first = 'icon'
                                icon  = 'trash-2'
                                clase = 'icon-table'
                                someClick = { this.handleclickDelete }

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
            <table className="table table-hover customTable">
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
                <tbody>{itemlist}</tbody>
            </table>
        );
    }
}

module.exports = SellerTable;