import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

import Payment from '../Payment'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.price * eachCartItem.quantity
      })
      return (
        <>
          <div className="cart-summary-container">
            <h1 className="rupees">
              <span className="rupees-text">Order Total: </span>
              Rs {total} /-
            </h1>
            <p className="cart-list-count">{cartList.length} Items in cart</p>

            <Popup
              modal
              trigger={
                <button className="checkout-btn" type="button">
                  Checkout
                </button>
              }
              position="top left"
            >
              {close => <Payment close={close} />}
            </Popup>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
