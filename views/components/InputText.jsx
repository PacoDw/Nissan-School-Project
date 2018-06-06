import React from 'react';

class InputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value      : '',
          type       : props.type,
          name       : props.name,
          text       : props.text  
        };
    
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      render() {
        return (
            <div className='form-label-group'>
                <input 
                    className   = 'form-control' 
                    type        = { this.state.type || 'text' } 
                    id          = { this.state.name } 
                    name        = { this.state.name }
                    placeholder = { this.state.text } 
                    value       = { this.state.value }
                    onChange    = { this.handleChange }
                />
                <label htmlFor={this.state.name}>{this.state.text}</label>
            </div>
        );
    }
};

module.exports = InputText;