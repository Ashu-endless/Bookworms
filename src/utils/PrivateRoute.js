// import { Route, Redirect } from 'react-router-dom'
// import { useContext } from 'react'
// import { AuthProvider,useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from 'react-router-dom';

// const PrivateRoute = ({children, ...rest}) => {
//     console.log('private')
    
//     // let {user} = useContext(AuthContext)
//     return(
//          <Route {...rest}>{children}</Route>
//         // <Route {...rest}>{!user ? <Redirect to="/login" /> :   children}</Route>
//     )
// }
// const PrivateRoute = () => {
//     const auth = true// determine if authorized, from context or however you're doing it
//     // const auth = useContext(useAuth); // determine if authorized, from context or however you're doing it
//     // console.log('working')
//     // If authorized, return an outlet that will render child elements
//     // If not, return element that will navigate to login page
//     return auth ? <Outlet /> : <Navigate to="/login" />;
// }
// export default PrivateRoute;

// import { Route } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    console.log("Checking...")
    return user ? <Outlet /> : <Navigate to="/login" />;
// }
}

export default PrivateRoute;