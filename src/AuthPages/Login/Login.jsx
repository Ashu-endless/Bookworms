
import React, {useContext,useEffect} from 'react'
import './Login.css'; 
import AuthContext from '../../context/AuthContext'

export function togglepwvisibility(e){
  if(e.target.getAttribute("icon") === "password-hide"){
      e.target.setAttribute("icon","password-show")
      e.target.previousElementSibling.type = "text" 
  }else{
     e.target.setAttribute("icon","password-hide")
     e.target.previousElementSibling.type = "password" 
  }
}
  


const Login = () => {
  let {loginUser} = useContext(AuthContext)

  function verifyLogin(e){
    e.preventDefault()
    let loginform = document.querySelector('#Login-form')
    if(loginform.querySelector("input[name=username").value !== "" && loginform.querySelector("input[name=password").value !== ""  ){
      loginUser(e)
    }else{
      console.warn("empty")
    }
  }

  useEffect(() => {
    document.querySelector("#Loading-stop-btn-home").click()
  });
  return (
      <div id='Login-Page' >
          <form id='Login-form' onSubmit={verifyLogin}>
              <div id='Login-app-title' >BookWorms</div>
              <div className='auth-inpdiv' >
                <span icon="username" ></span>
              <input className='auth-input' type="text" name="username" placeholder="Enter Username" />
              </div>
            {/* <div> Wrong username </div> */}
            <div className='auth-inpdiv' >
            <span icon="password"  ></span> 
            <input className='auth-input' type="password" name="password" placeholder="Enter Password" />
              <span icon="password-hide" onClick={togglepwvisibility} ></span>
            </div>
            <span  className='auth-info' id='Login-auth-info' >Name is available</span>
              <button type='submit' id='Login-btn' >Login</button>
              <div className='medfont' >Don't have an account <a id='Login-signupbtn'  href="#/SignUp">Sign Up</a> </div>
          </form>
      </div>
  )
} 

export default Login;