import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }
  incrementCartItemQuantity = id => {
    this.setState(previous => ({
      cartList: previous.cartList.map(each => {
        if (id === each.id) {
          const update = each.quantity + 1
          return {...each, quantity: update}
        }
        return each
      }),
    }))
  }
  decrementCartItemQuantity = id => {
    this.setState(previous => ({
      cartList: previous.cartList.map(each => {
        if (id === each.id) {
          const update = each.quantity - 1
          return {...each, quantity: update}
        }
        return each
      }),
    }))
  }
  removeCartItem=(id)=>{
    const {cartList}=this.state 
    const update=cartList.filter((each)=>(
      each.id!==id
    ))
    this.setState({cartList:update})
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeCartItem:this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
