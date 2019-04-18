import React, {Component} from 'react';


class CartPage extends Component {

    render () {
        let cartList = this.props.cart.cartItems.map((item, index) => {
            return <li key={index}>{item.herb.name} {item.quantity}</li> 
        })
        
        console.log("THIS IS THE CART" + this.props.cart)

    return (
        <div className="CartPage">
        <h1>CART PAGE</h1>
        <h1>{cartList}</h1>
        </div>
    )}
}

export default CartPage;