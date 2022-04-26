import React, {useState, useEffect, useContext} from 'react'
import './Home.css'; 
// import { Route, Routes } from "react-router-dom";
// import AuthContext from '../../context/AuthContext'
import Greet from '../../components/greet/Greet';
import Nav from '../../components/nav/Nav';
import SideBar from '../../components/sideBar/SideBar';
import { Route, Routes } from "react-router-dom";

function Home() {
  // let [notes, setNotes] = useState([])
  
  // let {authTokens, logoutUser,user} = useContext(AuthContext)

    // useEffect(()=> {
    //     getNotes()
    // }, [])


    // let getNotes = async() =>{
    //     let response = await fetch('http://127.0.0.1:8000/getUserdetails/data', {
    //         method:'GET',
    //         headers:{
    //             'Content-Type':'application/json',
    //             'Authorization':'Bearer ' + String(authTokens.access)
    //         }
    //     })
    //     let data = await response.json()

    //     if(response.status === 200){
    //         setNotes(data)
    //         console.log(data)
    //     }else if(response.statusText === 'Unauthorized'){
    //         logoutUser()
    //     }
        
    // }
 
  return (
          <>
          <Nav/>
          <Routes>
          
          <Route path="/dashboard"  element={<SideBar/>} ></Route>

          </Routes>
          <Greet/>
          </>
        )
}

export default Home;