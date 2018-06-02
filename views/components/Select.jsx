import React from 'react';

const Opt = require ('./Options.jsx');

const Select = props => {
	console.log('---------------------------------------')    
    console.log('Login form')
	
	let opt = JSON.parse(props.options);
	
	let itemlist = 	opt.map(function(o) {
		console.log(o);
		return <Opt 
		key  = { o.id_seller }
		id   = { o.id_seller }
		val  = { o.name } 
		name = { o.name }
		/>
	});

	console.log('---------------------------------------')  
	return (
		<div className='form-label-group'>
			<select id='officeManager' className="custom-select">
				{ itemlist || 'Nothing yet'}
			</select>
		</div>
	);
}

module.exports = Select;
