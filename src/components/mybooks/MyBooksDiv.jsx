import { Link } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import "./MyBooksDiv.css";
import Book from "../book/Book";
import AuthContext from "../../context/AuthContext";
import { api_url } from "../..";

function MyBooksDiv() {
  let { authTokens } = useContext(AuthContext);
  const [bookelements, Setbookelements] = useState("");


//   useEffect(() => {
//     // GetUserBookApi()
//     // console.log("1")
//     let response = fetch(`${api_url}api/getuserbooks/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + String(authTokens.access),
//         },
  
//         //   body:JSON.stringify({
//         //     "name":e.target.name.value,
//         //     "author":e.target.author.value,
//         //     "about":e.target.about.value,
//         //     "total_pages":e.target.total_pages.value,
//         //     "pages_read":e.target.pages_read.value,
//         //     "cover_page_url":e.target.coverpage_url.value
//         //   })
//       });
//       let data = response.json();
//       console.log(data);
//       if (data.success === "true") {
//         Setuserbooks(data.data);
//         var arr = [];
//           console.log(userbooks)
//         for (var key in userbooks) {
//           if (userbooks.hasOwnProperty(key)) {
//             arr.push([key, userbooks[key]]);
//           }
//         }
//         const listItems = arr.map((a) => (
//           <Book name={a.name} about={a.about}   />
//         ));
//         console.log(arr)
//         Setbookelements(listItems);}
//   },[]);

  useEffect(() => {
    fetch(`${api_url}api/getuserbooks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }).then(resp => resp.json())
      .then(data => {var arr = [];
                  console.log(data.data)
                  // eslint-disable-next-line no-unused-vars
                  for (const [key, value] of Object.entries(data.data)) {
                    arr.push(value)
                  }
                // for (var key in data.data) {
                //   if (data.data.hasOwnProperty(key)) {
                //     arr.push([data.data[key]]);
                //   }

                // }
                console.log(arr)
                const listItems = arr.map((book) => (
                            // console.log(a)
                              <Book key={book.pk} cover_page_url={book.book_cover_url} bookId={book.pk}  name={book.name} about={book.about} author={book.author} total_pages={book.total_pages} pages_read={book.pages_read || 0}  />
                            ));
                            console.log(arr)
                            Setbookelements(listItems)})
                console.log(bookelements)            
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
 
  return (
    <div id="MyBooksDiv">
      <p id="MyBooksDiv-head">My Library</p>
      <div id="MyBooksDiv-body">
        {bookelements}
        {/* <div className='bd'>
             <div className='imgg' id='t1' ></div> <p className='pp' >Automating stuff with python</p>  
             
               </div> */}
        {/* <div className='bd'> <div className='imgg' id='t2' ></div> <p className='pp' >Name</p> 
        
        <ProgressBar 
    completed={75}
    bgColor="#ee41d6"
    height="10px"
    labelColor="#2c0339"
    baseBgColor="#31d8dc"
    labelSize="10px"
    animateOnRender
    maxCompleted={100}
    />
        
        
        
         </div> */}
        <Link className="bd" to="/addbook">
          <div icon="add-book"></div>
          { bookelements.length === 0 ? <div className="cwmdbold"> Your Library looks empty! start adding your fav books</div> : <div className="cwmdbold">Add Book</div>  }
          {/* <div className="cwmdbold">Add Book</div> */}
        </Link>
      </div>
    </div>
  );
}

export default MyBooksDiv;
