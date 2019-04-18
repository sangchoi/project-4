import React, { Component } from 'react';
import './App.css';

// NPM PACKAGES
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

// REACT COMPONENTS - AUTH
import Signup from './Signup';
import Login from './Login';
import UserProfile from './UserProfile';

// REACT COMPONENTS 
import AilmentsPage from './AilmentsPage';
import AilmentShowPage from './AilmentShowPage';
import CartPage from './CartPage';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      lockedResult: '',
      ailments: [],
      herbs: [],
      cart: null,
      userCart: []
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.checkForLocalToken = this.checkForLocalToken.bind(this)
    this.logout = this.logout.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.addItem = this.addItem.bind(this)
  }

  checkForLocalToken() {
    // Look in localStorage for the token
    let token = localStorage.getItem('mernToken')
    if (!token || token === 'undefined') {
      // There is no token
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: null
      })
    } else {
      // Found a token, send it to be verified
      axios.post('/auth/me/from/token', {token})
        .then(res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            this.setState({
              errorMessage: res.data.message
            })
          } else {
            // Put token in localStorage
            localStorage.setItem('mernToken', res.data.token)
            // Put token in state
            this.setState({
              token: res.data.token,
              user: res.data.user,
              cart: res.data.user.cart[0]
            })
          }
        })
    }
  }

  getAilments = () => {
    axios.get('/ailments')
    .then(res => {
        this.setState({
            ailments: res.data
        })
    })
  }

  addItem(herb) {
    console.log('IT IS CLICKED' + herb)
    let cart = this.state.user.cart.filter( c => c.closeDate == null )[0]
    axios.post(`/user/${this.state.user._id}/cart/${cart._id}`,{
      herbId: herb
    })
    .then(res => {
      this.setState({
        cart: res.data
      })
    })
  }

  // getCart = () => {
  //   axios.get(`/user/${this.state.user._id}/cart`)
  //   .then(res => {
  //     this.setState({
  //       cart: res.data
  //     })
  //   }).catch(err => console.log(err, "there is an error in getCart"))
  // }

  componentDidMount() {
    this.checkForLocalToken()
    this.getAilments()
  }



  liftTokenToState(data) {
    this.setState({
      token: data.token,
      user: data.user,
      cart: data.user.cart[0]
    })
  }

  logout() {
    // Remove the token from localStorage
    localStorage.removeItem('mernToken')
    // Remove the user and token from state
    this.setState({
      token: '',
      user: null
    })
  }

  handleClick(e) {
    e.preventDefault()
    //axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`//common is an object full of headers
    let config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    }
    axios.get('/locked/test', config).then( res => {
      console.log("This is the locked response:", res)
      this.setState({
        lockedResult: res.data
      })
    })
  }


  render() {
    let user = this.state.user
    let contents;
    if (user) {
      contents = (
        <Router>
          <Route exact path='/' render= {() => <Redirect to="/ailments" /> } />
          <Route exact path="/ailments" render={() => <AilmentsPage ailments={this.state.ailments} user={user} logout={this.logout}/>}/>
          <Route path="/ailments/:aid" render={(props) => <AilmentShowPage ailments={this.state.ailments} addItem={this.addItem} user={user} logout={this.logout} {...props} />}/>
          <Route path="/cart" render={() => <CartPage cart={this.state.cart} />}/>
          <UserProfile user={user} logout={this.logout} />
          {/* <p><a onClick={this.handleClick}>Test the protected route...</a></p> */}
          <p>{this.state.lockedResult}</p>
        </Router>
      )
    } else {
      contents = (
        <>
        <Signup liftToken={this.liftTokenToState} />
        <Login liftToken={this.liftTokenToState} />
        </>
      )
    }



    return (
      <div className="App">

          {contents}

      </div>
    );
  }
}

export default App;
