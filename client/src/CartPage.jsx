import React, {Component} from 'react';
import CartItem from './CartItem';
import NavBar from './NavBar';
import './CartPage.css'
import {Link} from 'react-router-dom';
import Background from './Background';

class CartPage extends Component {


    render () {
        // let cartList = this.props.cart.cartItems.map((item, index) => {
        //     return (
        //     <div>
        //         <form key={index} onSubmit={this.props.handleQuantity}>
        //             <label for="herb">{item.herb.name}</label>
        //             <input id="herb" onChange={this.props.handleQuantityChange} value={item.quantity} type="number" name={``} placeholder={item.quantity} /><br />
        //             <input type="submit" value="UPDATE" />
        //         </form>
        //         {/* <button onClick={(e) => this.props.deleteItem(cartItem._id, e)}>DELETE</button> */}
            
        //     </div>
        // )
        // })
        let cartList = this.props.cart.cartItems.map((item, index) => {
            return <CartItem key={index} 
                            quantity={item.quantity}
                            id={item._id} 
                            herb={item.herb} 
                            handleQuantity={this.props.handleQuantity} 
                            deleteItem={this.props.deleteItem}
                        />

        })
        
        console.log("THIS IS THE CART" + this.props.cart)

    return (
        <div className="CartPage">
            {/* <div className="CartPageNav">
            <NavBar logout={this.props.logout} />
            </div> */}
            
            <div className="BackgroundDiv">
                <Background />
                </div>
                <div className="CartPageNav">
            <Link to='/ailments'>
                <button className="NavButton">AILMENTS</button>
            </Link>
            <Link to='/cart'>
                <button className="NavButton">SHOPPING CART</button>
            </Link>
            </div>
        <h1 className="CartName">SHOPPING CART</h1>
        <h1 className="CartList">{cartList}</h1>
        </div>
    )}
}

export default CartPage;