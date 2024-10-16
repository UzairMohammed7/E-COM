import {Component} from 'react'
import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'
import { Mail, Lock } from "lucide-react";
import Input from "../../mailComponents/Input";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30,})
    this.setState({ showSubmitError: false });
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        {/* <label className="input-label" htmlFor="username">
          USERNAME
        </label> */}
        <Input
					id="email"
					name="email"
          required={true}
					icon={Mail}
					type='text'
					placeholder='email address'
					value={username}
					onChange={this.onChangeUsername}
					/>
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        {/* <label className="input-label" htmlFor="password">
          PASSWORD
        </label> */}
        <Input
					id="password"
					name="password"
          required={true}
					icon={Lock}
					type='password'
					placeholder='Password'
					value={password}
					onChange={this.onChangePassword}
					/>
      </>
    )
  }


  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Navigate to="/" />
    }

    return (
      <div className="login-form-container">
        <h2 className='login-website-logo-mobile-img text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
				    Welcome Back
			  </h2>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form className="form-container" onSubmit={this.submitForm}>
              <h2 className='login-website-logo-desktop-img text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
				        Welcome Back
			        </h2>
              <div className="input-container">{this.renderUsernameField()}</div>
              <div className="input-container">{this.renderPasswordField()}</div>
              <motion.button
              whileHover={{scale:1.02}}
              whileTap={{scale:0.98}}
              type="submit" 
              className="login-button bg-gradient-to-r from-blue-400 to-emerald-500">
                Login
              </motion.button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
            <div className='text-center'>
              <p className='text-sm text-black mt-3'>
				    	Don't have an account? 
				    	<Link to='/signup' className='text-green-400 font-bold hover:underline ml-1'>
				    		Sign up
				    	</Link>
              </p>
            </div>
          </motion.div>
      </div>
    )
  }
}

export default LoginForm
