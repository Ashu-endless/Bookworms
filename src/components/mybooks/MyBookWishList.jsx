import { Link } from "react-router-dom";
// import React, { useEffect, useContext, useState } from "react";
import "./MyBooksDiv.css";

function MyBookWishList() {





  
 
  return (
    <div id="MyBooksDiv">
      <p id="MyBooksDiv-head">My WishList</p>
      <div id="MyBooksDiv-body">
        <Link className="bd" to="/addbook">
          <div icon="add-book"></div>
          {/* { bookelements.length === 0 ? <div className="cwmdbold"> Your Library looks empty! start adding your fav books</div> : <div className="cwmdbold">Add Book</div>  } */}
          <div className="cwmdbold">Add Book</div>
        </Link>
        </div>
      </div>
    
  );
}

export default MyBookWishList;
