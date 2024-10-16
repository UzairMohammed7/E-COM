import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
// import { useAuthStore } from "../store/authStore";
import cartLogo from '../../cartlogo.png';
// import { House } from "lucide-react";
import { MdHome, MdShoppingCart, MdLogout } from "react-icons/md";
import { RiHandCoinFill } from "react-icons/ri";

import CartContext from '../../context/CartContext'

import './index.css'

const Header = () => {
  // const {logout } = useAuthStore();
  
  const onClickLogout = () => {
      // const {history} = props
      Cookies.remove('jwt_token')
      // logout();
      // history.replace('/login')
      window.location.replace('/login');
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              src={cartLogo}
              className="website-logo"
              alt="website logo"
            />
          </Link>

          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickLogout}
          >
            <MdLogout size={25} color='green'/>
          </button>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              src={cartLogo}
              className="website-logo"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/cart" className="nav-link">
                Cart
                {renderCartItemsCount()}
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn bg-gradient-to-r from-blue-400 to-emerald-500"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="nav-menu-mobile bg-gradient-to-r from-blue-200 to-emerald-200">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
            <MdHome size={30} />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/products" className="nav-link">
            <RiHandCoinFill size={30} />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/cart" className="nav-link">
            <MdShoppingCart size={30} />
              {renderCartItemsCount()}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
