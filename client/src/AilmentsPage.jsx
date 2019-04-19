import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NavBar from './NavBar';
import Background from './Background';
import './AilmentsPage.css';

class AilmentsPage extends Component {

    render () {
        let ailmentsList = this.props.ailments.map(( ailment, index) => {
            // return <p onClick={this.handleClick} key={index}>{ailment.name}</p>
            return <div className="AilmentsListLinks"><li  key={index}><Link to={`/ailments/${ailment._id}`}>{ailment.name}</Link></li><br /></div>
        })
        return(
            <div className="AilmentsPage">
                {/* <div className="AilmentsPageNav">
                <NavBar logout={this.props.logout} />
                </div> */}
                <div className="BackgroundDiv">
                <Background />
                </div>
                <div className="AilmentsNav">
            <Link to='/ailments'>
                <button className="NavButton">AILMENTS</button>
            </Link>
            <Link to='/cart'>
                <button className="NavButton">SHOPPING CART</button>
            </Link>
            </div>
                <h1 className="AilmentsText">AILMENTS</h1>
                <div className="AilmentsList">
                {ailmentsList}
                </div>
            </div>
        )   
    }
}

export default AilmentsPage;