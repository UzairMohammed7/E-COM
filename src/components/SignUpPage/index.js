import {motion} from 'framer-motion'
import {useState} from 'react';
import {User, Mail, Lock} from 'lucide-react'
import {Link} from 'react-router-dom'
// import { useAuthStore } from '../../store/authStore';

import Input from '../../mailComponents/Input'
// import PasswordStrengthMeter from '../../mailComponents/PasswordStrengthMeter'

import './index.css'

const SignUpPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const {signup, error, isLoading} = useAuthStore();
    // const navigate = useNavigate();

    // const handleSignUp = async (e) => {
    //   e.preventDefault();
    //   try {
    //     await signup(email, password, name);
    //     navigate("/verify-email");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

  return (
    <div className='signup-form-container'>
        <h2 className='signup-website-logo-mobile-img text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
          create account
        </h2>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="signup-img"
          alt="website login"
        />
      <motion.div
        initial={{opacity: 0, y:20}}
        animate={{opacity: 1, y:0}}
        transition={{duration: 0.5}}
      >
        <form className="form-container">
            <h2 className='login-website-logo-desktop-img text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
                create account
			      </h2>
            <Input
             icon={User}
             type='text'
             placeholder="Full-Name"
             value={name}
             onChange={(e) => setName(e.target.value)}
            />
            <Input
             icon={Mail}
             type='text'
             placeholder="Email Address"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
            />
            <Input
             icon={Lock}
             type='password'
             placeholder="Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
            />

            {/* {error  && <p className='text-red-500 font-semibold mt-2' >{error}</p>} */}
            {/* <PasswordStrengthMeter password={password} /> */}

            <motion.button
            className="signup-button bg-gradient-to-r from-blue-400 to-emerald-500"
            whileHover={{scale:1.02}}
            whileTap={{scale:0.98}}
            type='submit'
            // disabled={isLoading}
            > Signup
              {/* {isLoading? <Loader size={24} className='animate-spin w-6 h-6 mx-auto' /> : 'Sign Up'} */}
            </motion.button>
        </form>
          <div className='text-center'>
            <p className='text-sm text-black mt-3'>
			    	    	Already have an account? 
			    	<Link to='/login' className='text-green-400 font-bold hover:underline ml-1'>Login</Link>
            </p>
          </div>
      </motion.div>
    </div>
  )
}

export default SignUpPage


