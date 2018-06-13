import React, { Component } from 'react';
import Icon from '../Icon.jsx';

class AccountTable extends Component {

    constructor(props){
        super(props);

        this.state = {
            allAccounts    : props.allAccounts,
            onDeleteAccount : props.onDeleteAccount
         }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.allAccounts !==  prevState.allAccounts){
            return{
                allAccounts   : nextProps.allAccounts
            }
        }
        else
        return false;
    }

    // componentDidMount() {
    //     let ajax = new XMLHttpRequest(); // Creo el objeto XMLHttpRequest y lo guardo en ajax

    //     ajax.onload = () => {
    //         if(ajax.status != 200) {
    //             alert('Todo MAL ')
    //         } else {                
    //             this.setState({
    //                 allAccounts : ajax.responseText
    //             })
    //             // this.state.onDeleteParent(ajax.responseText, undefined);
    //         }
    //     }
    //     ajax.open('GET', '/account/allAccounts', true); 
    //     ajax.send(); 
    // }

    // handleclickDelete(e){
    //     e.preventDefault();
    
    //     console.log(e.target);
        
    //     let id  = e.target.attributes['id'].nodeValue;
    //     let typeAccount = e.target.attributes['typeAccount'].nodeValue;
        
    //     let ajax = new XMLHttpRequest();
        
    //     ajax.onload = () => {
    //         if(ajax.status != 200)
    //         {
    //             alert('ALGO SALIO MAL Account TABLE');
    //         } 
    //         else 
    //         {
    //             let tr = JSON.parse(this.state.allAccounts);
    //             let results     = tr.filter( (obj) =>  obj.id_account != id );                
                
    //             this.setState({
    //                 allAccounts : JSON.stringify(results)
    //             });
    //             this.state.onDeleteParent(JSON.parse(ajax.responseText).itemRemoved);
    //         }
    //     }
    //     ajax.open('DELETE', `/account/deleteAccount/${id}/${typeAccount}`, true); 
    //     ajax.send(); 
    // }

    // handleClickEdit(e){
    //     alert('Click Edit');
        // let ajax = new XMLHttpRequest(); // Creo el objeto XMLHttpRequest y lo guardo en ajax
    
        //     ajax.onload = () => {
        //         if(ajax.status != 200) {
        //             alert('Todo MAL ')
        //         } else {
        //             // console.log('Res: ', ajax.responseText);
                    
        //             this.setState({
        //                 allAccounts : ajax.responseText
        //             })
        //         }
        //     }
        //     ajax.open('UPDATE', '/account/', true); 
        //     ajax.send(); 
    // }
    render() {

        let itemlist = <tr><td colSpan='5' style={{textAlign : 'center'}}>Sin registros</td></tr>;
        if(this.state.allAccounts != '' && this.state.allAccounts != [])
        {
            let list = this.state.allAccounts;
            itemlist = 	list.map((i, index) => {
                let id = 0;

                return (
                    <tr key={ i.id_account }>
                        <th key={`${i.id_account}00${++id}`} scope='row'> { i.id_account }</th>
                        <td key={`${i.id_account}00${++id}`}>      { i.username }</td>
                        <td key={`${i.id_account}00${++id}`}>      { i.email }</td>
                        <td key={`${i.id_account}00${++id}`}>      { i.typeAccount }</td>
                        <td key={`${i.id_account}00${++id}`}>
                            <Icon 
                                key  = {`edit${i.id_account}`}
                                id   = { i.id_account }
                                first = 'icon'
                                icon  = 'edit-3'
                                clase = 'icon-table'
                                typeAccount = { i.typeAccount }
                                // someClick = { this.handleClickEdit }

                                tipTitle   =  'Edit'
                                dataToggle = 'tooltip'
                                position   = 'bottom'
                            />    

                            <Icon
                                key  = {`delete${i.id_account}`}
                                id   = { i.id_account } 
                                first = 'icon'
                                icon  = 'trash-2'
                                clase = 'icon-table'
                                typeAccount = { i.typeAccount }
                                someClick = { this.state.onDeleteAccount }

                                tipTitle   =  'Delete'
                                dataToggle = 'tooltip'
                                position   = 'bottom'
                            />
                        </td>
                    </tr>)
                });
                // console.log('ITEM LIST: ', itemlist);
            }
        
        return (
            <table 
                className = { this.props.clase }
                role      = { this.props.role }
                id        = { this.props.id}
                aria-labelledby = { this.props.ariaLab }
            >
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#id</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Type of user</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>{ itemlist }</tbody>
            </table>
        );
    }
}

module.exports = AccountTable;