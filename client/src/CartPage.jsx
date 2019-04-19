import React, {Component} from 'react';
import CartItem from './CartItem';
import './CartPage.css'

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
        <h1>CART PAGE</h1>
        <h1>{cartList}</h1>
        </div>
    )}
}

export default CartPage;