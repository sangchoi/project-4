import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            message: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleEmailChange(e) {
        this.setState({
        email: e.target.value
        })
    }
    handlePasswordChange(e) {
        this.setState({
        password: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post('/auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then( res => {
            if (res.data.type === 'error') {
                this.setState({
                    message: res.data.message
                })
            } else {
                localStorage.setItem('mernToken', res.data.token)//puts it into the browser's local storage
                this.props.liftToken(res.data)
                
            }
        }).catch( err => {
            this.setState({
                message: "Maximum login attempts exceeded. Please try again later."
            })
        })
    }



    render() {
        return (
            <div className="Login">
            <h3 className="LoginText">Log into your account:</h3>
                <form className="LoginForm" onSubmit={this.handleSubmit}>
                <input className="LoginInput" onChange={this.handleEmailChange} value={this.state.email} type="email" name="email" placeholder="Enter your email..." /><br />
                <input className="LoginInput" onChange={this.handlePasswordChange} value={this.state.password} type="password" name="password" placeholder="Enter your password" /><br />
                <input className="LoginButton" type="submit" value="Log In!" />
                </form>
            </div>
        )
    }
}

export default Login;