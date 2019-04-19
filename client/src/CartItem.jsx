import React, {Component} from 'react';

class CartItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 0,
            name: '',
            id: ''
        }
    }
    
    componentDidMount() {
        this.setState({
            quantity: this.props.quantity,
            name: this.props.herb.name,
            id: this.props.id
        })
    }

    handleChange = (e) => {
        this.setState({
            quantity: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.props.handleQuantity(e,this.state)}>
                    <label for="herb">{this.state.name}</label>
                    <input id="herb" onChange={this.handleChange} value={this.state.quantity} type="number" /><br />
                    <input type="submit" value="UPDATE" />
                </form>
                <button onClick={(e) => this.props.deleteItem(e, this.state.id)}>DELETE</button>
            </div>
        )
    }
}

export default CartItem;