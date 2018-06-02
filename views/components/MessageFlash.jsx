import React, { Component }     from 'react';
const TransitionGroup = require('react-addons-transition-group');
import { render, findDOMNode }  from 'react-dom';
import { TweenMax }             from 'gsap'

class MessageFlash extends Component {
    constructor(props){
        super(props);

        this.state = {
            messageFlash : props.messageFlash
        }
        console.log('-----------------------------------------------')        
        console.log('Message Flash Component')
        console.log('props: ', this.state.messageFlash)
        console.log('state: ', this.props.messageFlash)   
        console.log(props);     
        console.log('-----------------------------------------------')
    }

    componentWillEnter(callback) {
        const element = this.container;
        console.log(element)
        TweenMax.fromTo(element, 0.3, {y: -100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
    }

    componentWillLeave (callback) {
        const element = this.container;
        console.log(element)

        TweenMax.fromTo(element, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
    }

      setContainer(c) {
        this.container = c;
    }

    render() {

        return (
            <div 
                ref={ this.setContainer.bind(this) } 
                id='messageFlash' 
                className="alert alert-danger messageFlash" 
                role="alert"
                style = {{margin: '5px 0 0 0'}}
            > 
                { this.state.messageFlash }
            </div>
        );
    }
}

module.exports =  MessageFlash;