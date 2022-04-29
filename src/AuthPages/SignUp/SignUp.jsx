import React, {useContext} from 'react'
import './SignUp.css'; 
import AuthContext from '../../context/AuthContext'
import { api_url } from '../..'
function SignUp() {
  let {authTokens} = useContext(AuthContext)


function mkpwvisible(){

}

// const AuthAlert = {
//   hide : function(){

//   }
// }

const SignUpUser= async (e )=> {
    e.preventDefault()
    let response = await fetch(`${api_url}`, {
        method:'POST',
        headers:{ 
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        },
        body:JSON.stringify({'username':"e.target.username.value", 'password':"e.target.password.value"})
    })
    let data = await response.json()
    console.log(data)
    if(response.status === 200){
        // history('/')
    }else{
        alert('Something went wrong!')
    }
  }

const UNAvailibility= async (e)=> {
    // console.log(e.target);
    var info =document.querySelector("#un-avail-info");

    e.preventDefault()
    if(e.target.value === ""){
      info.style.display = "none"
    }else if(e.target.value.indexOf(' ') >= 0){
      info.style.display = "block"
      info.innerHTML = "spaces not allowed"
    }
    else{
    let response = await fetch(`${api_url}api/usernameavailibility/`, {
        method:'POST',
        headers:{ 
            'Content-Type':'application/json',
            // 'Authorization':'Bearer ' + String(authTokens.access)
        },
        
        body:JSON.stringify({username:e.target.value})
    })
    let data = await response.json()
    console.log(data)
    console.log(data.available)

    if(data.available === 'true'){
      info.style.display = "block"
      info.innerHTML = e.target.value + " is available"
    }
    else if(data.available === 'false'){
      info.style.display = "block"
      info.innerHTML = e.target.value + " is already taken"
    }}
    // if(response.status === 200){
    //     // history('/')
    // }else{
    //     alert('Something went wrong!')
    // }
  }







    return (
      <div id='SignUp-Page' >
      <form id='SignUp-form' onSubmit={SignUpUser}>
          <div className='bookworms-title ' >BookWorms</div>



          <div className='auth-inpdiv' >
            <span icon="fullname" ></span>
          <input className='auth-input' type="text" name="fullname" placeholder="Enter Fullname" />
          </div>

          <div className='auth-inpdiv' >
            <span icon="username" ></span>
          <input onInput={UNAvailibility} className='auth-input' type="text" name="username" placeholder="Choose a username" />
          <span id='un-avail-info' className='auth-info' >Name is available</span>
          </div>



        <div className='auth-inpdiv' >
        <span icon="password"  ></span> 
        <input className='auth-input' type="password" name="password" placeholder="Create Password" />
          <span icon="password-show" onClick={mkpwvisible} ></span>

        </div>

        <span  className='auth-info' >Name is available</span>


          <button type='submit' id='Login-btn' >Create Account</button>
          <div className='medfont' >Aready have an account <a id='Login-signupbtn'  href="/#/Login">Login</a> </div>
      </form>
  </div>
  )
}
 

export default SignUp;