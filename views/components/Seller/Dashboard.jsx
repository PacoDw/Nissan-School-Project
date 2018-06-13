import React from  'react';
const feather = require('feather-icons');

// Modules-----------------------------
import Icon  from '../Icon.jsx';

const Dashboard = ( props ) => {
    return (
                <nav className="col-md-2 d-none d-md-block  sidebar bg-white rounded box-shadow">
                    <div className="sidebar-sticky" style={{ position: 'relative'}}>
                        <ul className="nav flex-column">
                                 
                        <Icon
                            icon  = 'eye'
                            clase = 'nav-link icon-route'
                            text  = 'My sales'
                            clase = 'nav-link icon-route'
                            someClick = { props.onGetSalesData }

                            dataToggle = 'tooltip'
                            position   = 'bottom'
                            tipTitle   = 'Watch sales'
                        />
                        
                        <Icon
                            icon  = 'eye'
                            clase = 'nav-link icon-route'
                            text  = 'Make a sale'
                            clase = 'nav-link icon-route'
                            someClick = { props.onGetSaleForm }

                            dataToggle = 'tooltip'
                            position   = 'bottom'
                            tipTitle   = 'Make a sale'
                        /> 

                        </ul>

                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                            <a className="nav-link" href="#">
                                <span className=" align-items-center text-muted">reports</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                            </a>
                        </h6>

                        <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            Current month
                            </a>
                        </li>
                        </ul>
                    </div>                    
                </nav>
)}

module.exports = Dashboard;