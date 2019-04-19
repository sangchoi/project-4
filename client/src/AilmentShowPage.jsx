import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Background from './Background';
import './AilmentShowPage.css';
import NavBar from './NavBar';


const AilmentShowPage = (props) => {

    let ailment = props.ailments.find((ailment) => {
        return ailment._id === props.match.params.aid
    })
    console.log("THIS IS THE CONSOLE LOG FOR AILMENT" + ailment)
    console.dir(ailment)
    console.log(ailment.herbs[0].name)

    let herbsList = ailment.herbs.map((herb, index) => {
        return <p key={index} onClick={() => props.addItem(herb._id)} >{herb.name}</p>
                
    })
   

    
    return(
        <div className="AilmentShowPage">
            {/* <div className="AilmentShowPageNav">
            <NavBar logout={this.props.logout} />
            </div> */}
            <div className="BackgroundDiv">
                <Background />
                </div>
            <div className="AilmentShowNav">
            <Link to='/ailments'>
                <button className="NavButton">AILMENTS</button>
            </Link>
            <Link to='/cart'>
                <button className="NavButton">SHOPPING CART</button>
            </Link>
            </div>
        <h1 className="AilmentName">{ailment.name}</h1>
        <ul className="HerbsList">
            <li>{herbsList}</li>
            
        </ul>
      
        </div>
        
    )
}

export default AilmentShowPage;