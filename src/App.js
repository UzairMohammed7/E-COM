import {Component} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import SignUpPage from './components/SignUpPage'

import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
// import { useAuthStore } from './store/authStore'

import './App.css'

// // redirect authenticated users to the home page
// const RedirectAuthenticatedUser = ({ children }) => {
// 	const { isAuthenticated, user } = useAuthStore();
// 	if (isAuthenticated && user.isVerified) {
// 		return <Navigate to='/' replace />;
// 	}
// 	return children;
// };

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (eachCartItem.id === id) {
          return {...eachCartItem, quantity: eachCartItem.quantity + 1}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productQuantity = cartList.find(
      eachCartItem => eachCartItem.id === id,
    )
    if (productQuantity.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === id) {
            return {...eachCartItem, quantity: eachCartItem.quantity - 1}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updateCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updateCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const findProduct = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    if (findProduct) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === findProduct.id) {
            return {
              ...eachCartItem,
              quantity: eachCartItem.quantity + product.quantity,
            }
          }
          return eachCartItem
        }),
      }))
    } else {
      this.setState({cartList: [...cartList, product]})
      //   this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm/>} />
          {/* <Route path="/signup" element={<RedirectAuthenticatedUser><SignUpPage/></RedirectAuthenticatedUser>} /> */}
          <Route path="/signup" element={<SignUpPage/> } />
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute> } />
          <Route path="/products" element={ <ProtectedRoute><Products/></ProtectedRoute>  } />
          <Route path="/products/:id" element={ <ProtectedRoute><ProductItemDetails/></ProtectedRoute> }/>
          <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
          <Route path="/not-found" element={<NotFound/>} />
          <Route path='*' element={<Navigate to='not-found'/>} />
        </Routes>
      </CartContext.Provider>
    )
  }
}

export default App