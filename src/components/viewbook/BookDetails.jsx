import React,{useEffect} from 'react'
import { textareaElemUI } from '../addbook/AddBook'
function BookDetails(props){
        const fetchedData = props.fetchedData

    useEffect(()=>{ 
        textareaElemUI()
    })

    return(
        <>
        <div id="Viewbook-details" >
        <div id="AB-cover-fields" >
            <div id="AB-book-cover-preview" style={{backgroundImage:`url(${fetchedData.book_cover_url})`}} ></div>
            <label className="inp-text">Book Cover Image url</label>
            <textarea defaultValue={fetchedData.book_cover_url} style={{minHeigh:'40px'}} addbookinp="" type="text" name="coverpage_url" placeholder="example - https://static.vecteezy.com/system/resources/previews/000/216/149/large_2x/vector-simple-and-effective-motivational-book-cover-design-template.jpg"  id="" />
            <span id="load-img-btn"  >Load Image</span>
            </div>
    
            <div id="AB-inp-fields" >
              <div>
              <label className="inp-text">Book Name</label>
                <textarea addbookinp=""  defaultValue={fetchedData.name} required type="text" name="name" placeholder="Book name" id="" />
                </div>
                
                <div>
                 <label className="inp-text">Author</label>
                 <textarea addbookinp="" defaultValue={fetchedData.author}  type="text" name="author" placeholder="Author name" id="" />
                 </div>
                 <div>
                <label className="inp-text">About</label>
                <textarea addbookinp="" defaultValue={fetchedData.about} type="text" name="about" placeholder="description" id=""  />
                </div>
                
                <div>
                <label className="inp-text">Total Pages</label>
                <textarea addbookinp="" defaultValue={fetchedData.total_pages} maxLength="500" type="number" name="total_pages" placeholder="total pages" id="" />
                </div>

                <div>
                <label className="inp-text">Pages read</label>
                <textarea addbookinp="" defaultValue={fetchedData.pages_read} type="number" name="pages_read" placeholder="pages read" id="" />
                </div>
               
               
                <div>
                <label className="inp-text">Read Completed Times</label>
                <textarea addbookinp="" defaultValue={fetchedData.read_completed_times} type="number" name="read_completed_times" placeholder="read Completed times" id="" />
                </div>
               
                <div>
                <label className="inp-text">Online Book url</label>
                <textarea addbookinp="" defaultValue={fetchedData.online_read_url} type="number" name="online_read_url" placeholder="Online Book url" id="" />
                </div>



            </div>
            </div>
        </>
    )
}

export default BookDetails;