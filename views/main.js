// Dependencies
const React = require('react');
const ReactDOM = require('react-dom');
require('babel-polyfill');
import registerServiceWorker from './registerServiceWorker';

// Module
const Login 		= require('./components/Login/Login.jsx');
const Seller 		= require('./Seller.jsx');
const OfficeManager = require('./OfficeManager.jsx');
const GlobalManager = require('./GlobalManager.jsx');
const Test 			= require('./Test.jsx');
const Err 			= require('./Error.jsx');

let main = function (data, view, containerId) {
	const container = document.getElementById(containerId || 'content-body');


	switch (view) {
		case 'Login':
			console.log('Case Login')
			ReactDOM.render(<Login {...data} />, container);
			break

		case 'Seller':
			console.log('Case Seller')
			ReactDOM.render(<Seller {...data} />, container);
			break

		case 'OfficeManager':
			console.log('Case OfficeManager')
			ReactDOM.render(<OfficeManager {...data} />, container);
			break

		case 'GlobalManager':
			console.log('Case GlobalManager')
			ReactDOM.render(<GlobalManager {...data} />, container);
			break
			
		case 'Test':
			console.log('Case Test')
			ReactDOM.render(<Test {...data} />, container);
			break

		case 'Error':
			console.log('Case Error')
			ReactDOM.render(<Err {...data} />, container);
			break
	}
};
registerServiceWorker();

module.exports = main;