import React from 'react';
import './Background.css';
import backgroundGif from './imgs/background/badbadbeans1.gif'


const Background = props => {
    return (
        <React.Fragment>
        {/* <h1 className="Petrichor">PETRICHOR</h1> */}
        <img className="BackgroundGif" src={backgroundGif} alt="backgroundGif" />
        </React.Fragment>
    )

}

export default Background;