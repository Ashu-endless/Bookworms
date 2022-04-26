import React, {useContext} from 'react'
// import './Login.css'; 
// class Login extends React.Component {
// import AuthContext from '../../../context/AuthContext'
import AuthContext from '../../../context/AuthContext'


const ProfileMore = (props) =>  {

  
  // console.log(useContext(AuthContext))

  // let {logoutUser} = useContext(AuthContext)



    return (
    <>
    <div> User </div> 
    <div>More</div> 
    <button onClick={props.logout} >logout</button> 
    </>
    )
  
}
 

export default ProfileMore;