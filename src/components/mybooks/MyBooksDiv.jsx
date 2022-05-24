import React, { useEffect, useState } from "react";
import "./MyBooksDiv.css";
import Book from "../book/Book";
import { Droppable,Draggable  } from "react-beautiful-dnd";
import Addbooksvg from "../Addbooksvg";
import { Link } from "react-router-dom";
function MyBooksDiv(props) {
  let [bookelements, Setbookelements] = useState(props.booksdata);
  // console.warn(bookelements)


  
  
  useEffect(() => {
    Setbookelements(props.booksdata)
  
    
  }, [props])
  // useEffect(() => {
  //   fetch(`${api_url}api/getuserbooks/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + String(authTokens.access),
  //     }, body: JSON.stringify({
  //       "book_read_status": "L"

  //     })
  //   }).then(resp => resp.json())
  //     .then(data => {
  //       var arr = [];
  //       // console.log(data.data)
  //       for (const [key, value] of Object.entries(data.data)) {
  //         arr.push(value)
  //       }
  //       console.warn(arr)
  //       Setbookelements(arr)
  //       // console.warn(bookelements)
  //       // !!!
  //       // const listItems = arr.map((book, index) => (
  //       //             // console.log(a)
  //       //             // <Draggable key={book.pk} draggableId={book.pk} index={index} >  
  //       //             // {(provided) => (
  //       //               // <Book ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} notes={book.notes} key={book.pk} book_read_status={book.book_read_status} online_read_url={book.online_read_url} read_completed_times={book.read_completed_times} cover_page_url={book.book_cover_url} bookId={book.pk}  name={book.name} about={book.about} author={book.author} total_pages={book.total_pages} pages_read={book.pages_read || 0}  />
  //       //               <Book index={index} notes={book.notes} key={book.pk} book_read_status={book.book_read_status} online_read_url={book.online_read_url} read_completed_times={book.read_completed_times} cover_page_url={book.book_cover_url} bookId={book.pk}  name={book.name} about={book.about} author={book.author} total_pages={book.total_pages} pages_read={book.pages_read || 0}  />
  //       //             // )}
  //       //             //   </Draggable>
  //       //             ));
  //       //             // console.log(arr)
  //       //             Setbookelements(listItems)
  //     })
  //   // !!!!!!!
  //   // console.log(bookelements)            

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])


return (

<div  id="MyBooksDiv" mybooksdiv="Library"  >
         <p className="MyBooksDiv-head">My Library <Link to="/addbook/library" className="Addbookicon" ><Addbooksvg/></Link>  </p>
  <div mybooksdiv-body="Library">
  <Droppable droppableId='L' direction="horizontal" type="r" >
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}  bookcontainer="">
          {bookelements && bookelements.map((book, index) =>
               <Draggable key={book.pk} draggableId={`L${book.pk}`} index={index}>
                 {(provided) => (
                  <div key={book.pk} index={index} ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}     >
                     <Book place="L" notes={book.notes} book_read_status={book.book_read_status} online_read_url={book.online_read_url} read_completed_times={book.read_completed_times} cover_page_url={book.book_cover_url} bookId={book.pk} name={book.name} about={book.about} author={book.author} total_pages={book.total_pages} pages_read={book.pages_read || 0} />                   </div>)}
              
              </Draggable>)}
  { bookelements.length === 0 ? <Link className="bd" to="/addbook/library"> <div icon="add-book"></div> <div  className="cwmdbold"> Your Library looks empty! start adding your fav books</div></Link> : ""  }
           
        </div>
      
      )}
</Droppable>


  {/* { bookelements.length === 0 ? <Link className="bd" to="/addbook/library"> <div icon="add-book"></div> <div  className="cwmdbold"> Your Library looks empty! start adding your fav books</div></Link> : <Link className="bd" to="/addbook/library"> <div icon="add-book"></div> <div  className="cwmdbold"> Add Book</div></Link>  } */}
  </div>
</div>

)



  
}

export default MyBooksDiv;
