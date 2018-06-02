// Dependencies
const React     = require('react');
const ReactDOM  = require('react-dom');

// Module
const Login     = require('./components/Login/Login.jsx');
const Test      = require('./Test.jsx')
const Err       = require('./Error.jsx')


let main = function(data, view,  containerId) {
  console.log('Function Main-------------------------')
  console.log(data);
  console.log('---------------------------------------')

  const container = document.getElementById(containerId || 'content-body');
  

   switch(view)
  {
    case 'Login':
      console.log('Case Login')
      ReactDOM.render(<Login {...data} />, container);

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

module.exports = main;