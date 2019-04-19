import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = props => {
    return (
        <div className="NavBar">
        
            <Link to='/ailments'>
                <button className="NavButton">AILMENTS</button>
            </Link>
            <Link to='/cart'>
                <button className="NavButton">SHOPPING CART</button>
            </Link>
            <Link to='/'>
                <button className="NavButton" onClick={ props.logout }>LOG OUT</button>
            </Link>
        </div>
    )
}

export default NavBar;