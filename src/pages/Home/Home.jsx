import React, {useEffect} from 'react'
// import React from 'react'
import './Home.css'; 
// import { Route, Routes } from "react-router-dom";
// import AuthContext from '../../context/AuthContext'
import Greet from '../../components/greet/Greet';
import Nav from '../../components/nav/Nav';
import SideBar from '../../components/sideBar/SideBar';
import { Route, Routes } from "react-router-dom";
import MyBooksDiv from '../../components/mybooks/MyBooksDiv';
// import useEffect  from 'react';
import AddBook from '../../components/addbook/AddBook';
import Profile from '../../components/profile/Profile';
import SearchResDiv from '../../components/searchresultdiv/SearchResDiv';
import ViewBook from '../../components/viewbook/ViewBook';
import MyBookWishList from '../../components/mybooks/MyBookWishList';
import MyCurrentReads from '../../components/mybooks/MyCurrentReads';
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

    useEffect(() => {
      document.querySelector("#Loading-stop-btn-home").click()
    });
 
  return (
          <>
          <Nav/>
          <Routes>
          
          <Route path="/dashboard"  element={<SideBar/>} ></Route>
          <Route path="/addbook"  element={<AddBook/>} ></Route>
          <Route path="/profile"  element={<Profile/>} ></Route>
          <Route path="/search"  element={<SearchResDiv/>} ></Route>
          <Route path="/book/:slug"  element={<ViewBook/>} ></Route>

          </Routes>
          <Greet/>
          <MyCurrentReads/>

          <MyBooksDiv/>
          <MyBookWishList/>
          {/* <MyBooksDiv/> */}
          </>
        )
}

export default Home;