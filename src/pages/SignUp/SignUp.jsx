import React, {useContext} from 'react'
// import './Login.css'; 
import AuthContext from '../../context/AuthContext'

function SignUp() {
  let {authTokens, logoutUser} = useContext(AuthContext)




  let SignUpProc= async (e )=> {
    e.preventDefault()
    let response = await fetch('http://127.0.0.1:8000/test', {
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







    return (<form>
      <button type="button" onClick={SignUpProc} >Tst</button>
    <label>
      name
      <input type="text" name="name" />
    </label>
    <label>
      Username
      <input type="text" name="name" />
    </label>
    <label>
      Password:
      <input type="text" name="password" onSubmit={()=>{console.log('submit')}} />
    </label>
    <input type="submit" value="Submit"  />
  </form>
  )
}
 

export default SignUp;