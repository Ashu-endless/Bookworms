import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./pages/Home/Home";
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import PrivateRoute from "./utils/PrivateRoute";

import { AuthProvider } from './context/AuthContext'

// import { useContext } from "react";
function App() {
  // let {name} = useContext(AuthContext)
  // console.log(useContext(AuthContext))
  return (
    <>
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
