import React from 'react';

const Card = ({ item, someClick } ) => {
    console.log('itemmm: ', item)
    // alert('paro')
    return (
        <div className="card" style={{width: "18rem"}}>
            
            <img className="card-img-top" src="../../assets/images/NissanAltima.jpg" alt="Card image cap"/>
            
            <div className="card-body">
                <h5 className="card-title">{ item.name }</h5>
                <p className="card-text">
                    { item.details }
                </p>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    Status: { item.status }
                </li>
                <li className="list-group-item">
                    Cost: { item.cost }
                </li>
            </ul>

            <div className="card-body">
                <a 
                    className="card-link"
                    id      = { item.id }
                    href="#" 
                    onClick = { someClick } 
                    >
                    Buy
                    </a>

                <a href="#" className="card-link">Show details</a>
            </div>

        </div>
    );
};

module.exports = Card;