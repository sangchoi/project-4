import React, {Component} from 'react';


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
        <h1>{ailment.name}</h1>
        <ul>
            <li>{herbsList}</li>
            
        </ul>
      
        </div>
        
    )
}

export default AilmentShowPage;