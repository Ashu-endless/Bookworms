import './Nav.css';
import SearchBar from './searchbar/Searchbar'; 
import { Link } from 'react-router-dom';
import {Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css'; 
import ProfileMore from './userprofile/ProfileMore';
import AuthContext from '../../context/AuthContext'
import React, {useContext} from 'react'
function Nav() {
    // console.log(useContext(AuthContext))
    let {logoutUser} = useContext(AuthContext)
    return (
        <nav>
            <p className='bookworms-title' >BookWarms</p>
            <div id='Navbar-rightside' >
                <SearchBar/>
                {/* <Tooltip html={<ProfileMore logout={logoutUser} />} interactive="true" position="bottom" trigger='click' > <div id='profile-svg' ></div> </Tooltip> */}
                
                {/* <div id='profile-svg' ></div> */}
                <Link to="/dashboard" > <div id='profile-svg' ></div></Link>
                
            </div>
         {/* <SearchBar/> */}
        {/*<p className={"InteractTitle"}>Interact</p>
        <Tooltip title="Open Editor" position="bottom" > <Link to="editor" ><i class="bi bi-file-earmark-richtext"></i></Link> </Tooltip>
        <Tooltip html={<ProfileMore logout={logoutUser} />} interactive="true" position="bottom" trigger='click' > <span className={"user-profile"} id="profile-more-btn" ></span> </Tooltip> */}
        
        </nav>
    );
  }
  
  export default Nav;
