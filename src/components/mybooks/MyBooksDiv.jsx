import { Link } from 'react-router-dom';

import './MyBooksDiv.css'
function MyBooksDiv() {
    return (
        <div id="MyBooksDiv" > <p id="MyBooksDiv-head" >Your Books</p> <div id="MyBooksDiv-body"> <Link to="/addbook"> Add </Link>  </div>  </div>
    );
  }
  
  export default MyBooksDiv;
