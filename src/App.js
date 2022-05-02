import { Route, Routes } from "react-router-dom";

import './App.css';
import Home from "./pages/Home/Home";
import SignUp from "./AuthPages/SignUp/SignUp";
import Login from "./AuthPages/Login/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Loading from "./components/Loading";
import { AuthProvider } from './context/AuthContext'

// import { useContext } from "react";
function App() {
  // let {name} = useContext(AuthContext)
  // console.log(useContext(AuthContext))

  

  return (
    <>
    <Loading id="Loading-stop-btn-home" />

    <AuthProvider>
      
    <Routes>
    <Route exact path='/*' element={<PrivateRoute/>}> 
      <Route exact path='*'  element={<Home  />} />
      {/* <Route exact path='editor' element={ <Editor/> } /> */}
    </Route>
 
    <Route path='login'  element={ <Login/> } />
    <Route path='/SignUp' element={ <SignUp/> } />

    </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
