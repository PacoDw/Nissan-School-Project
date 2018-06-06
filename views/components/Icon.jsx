const React = require('react');

const Icon = props  => {
    // if (props[0] == keyOf('text'))
    //     console.log('Entro primero text')

    return (
            <a 
                className  = { props.clase || "nav-link" } 
                id         = { props.id }
                href       = { props.href  || '#' }
                onClick    = { props.someClick } 

                data-toggle    = { props.dataToggle } // modal
                title          = { props.tipTitle }
                data-placement = { props.position } 
                data-target    = { props.dataTarget }  // "#newSeller"

            >
                <svg
                    className="feather"
                    style = {{ pointerEvents : 'none'}}
                    id    = { props.id }

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
module.exports = Icon;