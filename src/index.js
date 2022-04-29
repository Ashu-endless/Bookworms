import React  from 'react'
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
// import SignUp from './components/SignUp/SignUp';
// import Login from './components/Login/Login';
import reportWebVitals from './reportWebVitals';
// import PrivateRoute from "./utils/PrivateRoute";
// export const api_url = "http://127.0.0.1:8000/"
export const api_url = "https://app-bookworms.herokuapp.com/"


ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
  {/* <Routes>
  <Route exact path='/*' element={<PrivateRoute/>}>
      <Route exact path='/*' element={<App/>}/>
</Route> */}
  {/* <PrivateRoute path='/*' element={<App/>} exact /> */}
  {/* <Route path='editor' element={<App/>} /> */}
    {/* <Route path='login' onSubmit={loginUser} element={ <Login/> } />
    <Route path='SignUp' element={ <SignUp/> } />
    </Routes> */}
    <App/>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
