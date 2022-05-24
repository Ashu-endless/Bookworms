import React, { useEffect, useState } from "react";
import "./MyBooksDiv.css";
import Book from "../book/Book";
import { Droppable,Draggable  } from "react-beautiful-dnd";


function MyCurrentReads(props) {
  let [bookelements, Setbookelements] = useState(props.booksdata);



 
  useEffect(() => {
    Setbookelements(props.booksdata)
  
    
  }, [props])
  
  
  

return (

<div  mybooksdiv="Reading"  >
         <p className="MyBooksDiv-head">Currently Reading</p>
  <div mybooksdiv-body="Reading">
  <Droppable droppableId='R' type="r" direction="horizontal" >
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}  bookcontainer="" >
          {bookelements.map((book, index) =>
               <Draggable key={book.pk} draggableId={`R${book.pk}`} index={index}>
                 {(provided) => (
                  <div key={book.pk} index={index} ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}     >
                     <Book  place="R" notes={book.notes} book_read_status={book.book_read_status} online_read_url={book.online_read_url} read_completed_times={book.read_completed_times} cover_page_url={book.book_cover_url} bookId={book.pk} name={book.name} about={book.about} author={book.author} total_pages={book.total_pages} pages_read={book.pages_read || 0} />                   </div>)}
             
              </Draggable>)}
             
  { bookelements.length === 0 ? <div id="My-current-reading-books-text" > Drag and Drop your currently reading book from your library </div> : ""  }
           
        </div>
      
      )}
</Droppable>


  </div>
</div>

)



  
}

export default MyCurrentReads;
