import React, { useContext} from 'react'
// import Home from "./pages/Home/Home";
// import SignUp from './pages/SignUp/SignUp';
// import Login from './pages/Login/Login';
// import PrivateRoute from "./utils/PrivateRoute";
import AuthContext from '../../context/AuthContext';
// import { AuthProvider } from './context/AuthContext'
import "bootstrap-icons/font/bootstrap-icons.css";
import './SideBar.css';
import { Link } from 'react-router-dom';
// import { useContext } from "react";
function SideBar() {
  // let {name} = useContext(AuthContext)
  // console.log(useContext(AuthContext))
  let {user,logoutUser} = useContext(AuthContext)


  return (
    <div id='SideBar' >
      <Link to="/" > <span icon="close-cross" ></span> </Link>
    

        <div id='Sidebar-Profilepic' icon="default-account" ></div>
        <div className='medboldp' >{user.username}</div>
        <div className='btn-blue' >Edit Profile</div>
        <div className='btn-blue red_brder' onClick={logoutUser} >Logout</div>
    </div>
  );
}

export default SideBar;