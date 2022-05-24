import React, { useEffect, useState } from "react";
import "./MyBooksDiv.css";
import Book from "../book/Book";
import { Droppable,Draggable  } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import Addbooksvg from "../Addbooksvg";
function MyBookWishList(props) {
  const [bookelements, Setbookelements] = useState([]);
  


  useEffect(() => {
    Setbookelements(props.booksdata)
  
    
  }, [props])
 
  return (
    <div  mybooksdiv="Wishlist"  >
         <p className="MyBooksDiv-head">Wishlist <Link to="/addbook/wishlist" className="Addbookicon" ><Addbooksvg/></Link></p>
  <div mybooksdiv-body="Wishlist">
  <Droppable droppableId='W' type="r" direction="horizontal" >
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}  bookcontainer="" >
          {bookelements.map((book, index) =>
               <Draggable key={book.pk} draggableId={book.pk} index={index}>
                 {(provided) => (
                  <div key={book.pk} index={index} ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}     >
                     <Book place="W" notes={book.notes} book_read_status={book.book_read_status} online_read_url={book.online_read_url} read_completed_times={book.read_completed_times} cover_page_url={book.book_cover_url} bookId={book.pk} name={book.name} about={book.about} author={book.author} total_pages={book.total_pages} pages_read={book.pages_read || 0} />                   </div>)}
              </Draggable>)}
  { bookelements.length === 0 ? <Link className="bd" to="/addbook/wishlist"> <div icon="add-book"></div> <div  className="cwmdbold"> A Book on your mind! but can't get it now? Add that book here so you don't forget about it </div></Link> : ""  }
             
           
        </div>
      
      )}
</Droppable>


  {/* { bookelements.length === 0 ? <Link className="bd" to="/addbook/library"> <div icon="add-book"></div> <div  className="cwmdbold"> Your Library looks empty! start adding your fav books</div></Link> : <Link className="bd" to="/addbook/library"> <div icon="add-book"></div> <div  className="cwmdbold"> Add Book</div></Link>  } */}
  </div>
</div>
    
  );
}

export default MyBookWishList;
