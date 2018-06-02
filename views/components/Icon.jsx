const React = require('react');

const Icon = props  => {
    console.log('----------------------------------------');
    console.log('Icons');
    // console.log(props.someClick);
    console.log('----------------------------------------');

    // if (props[0] == keyOf('text'))
    //     console.log('Entro primero text')

    if (props.first == 'icon'){
        return (
                <a 
                    className   = { props.clase || "nav-link" } 
                    href        = { props.href  || '#' }
                    onClick     = { props.someClick } 
                    data-toggle = { props.modal || ''} // modal
                    data-target = { props.dataTarget || ''}  // "#newSeller"
                >
                    <svg
                        className="feather"
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                    <use xlinkHref={`../../../assets/feather-icons/dist/feather-sprite.svg#${props.icon}` } />
                    </svg>
                    { props.text }
                </a>
        );
    }
    else 
    {
        return (
                <a 
                    className = { props.clase || "nav-link" } 
                    href      = { props.href || '#' }
                    onClick   = { props.someClick } 
                >
                <span> { props.text }</span>

                    <svg
                        className="feather icon-right"
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                    <use xlinkHref={`../../../assets/feather-icons/dist/feather-sprite.svg#${props.icon}` } />
                    </svg>
                </a>
        );
    }
};
module.exports = Icon;