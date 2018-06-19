import React from 'react';

const Opt = require ('./Options.jsx');

const Select = props => {
	let itemlist = '';

	if(props.options != '' && props.options != undefined)
	{
		let opt = props.options;
		// console.log('Select Opt: ', opt)
	
		itemlist = 	opt.map(function(o) {
			return <Opt 
				key  = {  o.id || o.id_office_manager || o.id_global_manager || o.id_seller || o.id_account || o.id_sales}
				id   = {  o.id || o.id_office_manager || o.id_global_manager || o.id_seller || o.id_account || o.id_sales}
				val  = { o.name || o.username } 
				name = { o.name || o.username }
				typeAccount = { o.job  || o.typeAccount }
				/>
		});
		// console.log('options', itemlist )

	}
	return (
		<div className='form-label-group' >
			{ props.text }
			<select id={ props.id } className="custom-select" onChange={ props.someClick } required >
				<option selected disabled>{ props.defaultOption }</option>
				{ itemlist || 'Nothing yet'}
			</select>
		</div>
	);
}



module.exports = Select;
