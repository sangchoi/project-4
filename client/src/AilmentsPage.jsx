import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class AilmentsPage extends Component {

    render () {
        let ailmentsList = this.props.ailments.map(( ailment, index) => {
            // return <p onClick={this.handleClick} key={index}>{ailment.name}</p>
            return <li key={index}><Link to={`/ailments/${ailment._id}`}>{ailment.name}</Link></li>
        })
        return(
            <div className="AilmentsPage">
        <h1>AilmentsPage Component</h1>
        {ailmentsList}
        </div>
        )   
    }
}

export default AilmentsPage;