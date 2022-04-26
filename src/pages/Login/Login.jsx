
import React, {useContext} from 'react'
import './Login.css'; 
// class Login extends React.Component {
  import AuthContext from '../../context/AuthContext'


  
//   render() {
//     return <form>
//     <label>
//       Username
//       <input type="text" name="name" />
//     </label>
//     <label>
//       Password:
//       <input type="text" name="password" onSubmit={()=>{console.log('submit')}} />
//     </label>
//     <input type="submit" value="Submit"  />
//   </form>
//   }
// }
const Login = () => {
  let {loginUser} = useContext(AuthContext)
  return (
      <div id='Login-Page' >
          <form id='Login-form' onSubmit={loginUser}>
              <div id='Login-app-title' >BookWorms</div>
              <div className='auth-inpdiv' >
                <span icon="username" ></span>
              <input className='auth-input' type="text" name="username" placeholder="Enter Username" />
              </div>

            <div className='auth-inpdiv' >
            <span icon="password"  ></span> 
            <input className='auth-input' type="password" name="password" placeholder="Enter Password" />
              <span icon="password-show" ></span>
            </div>

              <button type='submit' id='Login-btn' >Login</button>
              <div className='medfont' >Don't have an account <a id='Login-signupbtn'  href="/#/SignUp">Sign Up</a> </div>
          </form>
      </div>
  )
} 

export default Login;