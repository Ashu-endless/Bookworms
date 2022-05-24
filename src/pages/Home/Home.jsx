import React, {useEffect} from 'react'
import './Home.css'; 
// import AuthContext from '../../context/AuthContext'
import Greet from '../../components/greet/Greet';
import Nav from '../../components/nav/Nav';
import SideBar from '../../components/sideBar/SideBar';
import { Route, Routes } from "react-router-dom";
import AddBook from '../../components/addbook/AddBook';
import Profile from '../../components/profile/Profile';
import SearchResDiv from '../../components/searchresultdiv/SearchResDiv';
import ViewBook from '../../components/viewbook/ViewBook';
import MinAllBooksDiv from '../../components/mybooks/MinAllBooksDiv';




function Home() {
  
    

    useEffect(() => {
      document.querySelector("#Loading-stop-btn-home").click()
    });
 
  return (
          <>
          <Nav/>
          <Routes>
          
          <Route path="dashboard"  element={<SideBar/>} ></Route>
          <Route path="/addbook/library"  element={<AddBook brs="L" where="library" />} ></Route>
          <Route path="/addbook/wishlist"  element={<AddBook brs="W" where="wishlist" />} ></Route>
          <Route path="/profile"  element={<Profile/>} ></Route>
          <Route path="/search"  element={<SearchResDiv/>} ></Route>
          <Route path="/book/:slug/*"  element={<ViewBook/>} ></Route>

          </Routes>
          <Greet/>
          <MinAllBooksDiv/>
          {/* <MyBooksDiv/> */}
          {/* </DndProvider> */}
          </>
        )
}

export default Home;