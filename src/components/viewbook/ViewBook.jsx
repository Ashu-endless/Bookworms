import React,{useEffect,useContext,useState} from 'react'
import './ViewBook.css'
import { api_url } from '../..'
import {
  useParams
} from 'react-router-dom'

import { textareaElemUI } from '../addbook/AddBook'
import AuthContext from '../../context/AuthContext'




function ViewBook(props){
  let { authTokens } = useContext(AuthContext);
    let { slug } = useParams()
    let [fetchedData,setFetchedData] = useState("")



    
    

    useEffect(() => {
      fetch(`${api_url}api/viewbook/${slug}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }).then(resp => resp.json())
      .then(data => {setFetchedData(data.data);
        textareaElemUI()});
     
    // console.log(fetcheddata)
      

    },[] )

    

    return (
    


        <>
          <form id="ViewBook-div" >
            <div id="AB-cover-fields" >
            <div id="AB-book-cover-preview" style={{backgroundImage:`url(${fetchedData.book_cover_url})`}} ></div>
            <label className="inp-text">Book Cover Image url</label>
            <textarea value={fetchedData.book_cover_url} style={{minHeigh:'40px'}} addbookinp="" type="text" name="coverpage_url" placeholder="example - https://static.vecteezy.com/system/resources/previews/000/216/149/large_2x/vector-simple-and-effective-motivational-book-cover-design-template.jpg"  id="" />
            <span id="load-img-btn"  >Load Image</span>
            </div>
    
            <div id="AB-inp-fields" >
              <div>
              <label className="inp-text">Book Name</label>
                <textarea addbookinp=""  value={fetchedData.name} required type="text" name="name" placeholder="Book name" id="" />
                </div>
                
                <div>
                 <label className="inp-text">Author</label>
                 <textarea addbookinp="" value={fetchedData.author}  type="text" name="author" placeholder="Author name" id="" />
                 </div>
                 <div>
                <label className="inp-text">About</label>
                <textarea addbookinp="" value={fetchedData.about} type="text" name="about" placeholder="description" id="" />
                </div>
                
                <div>
                <label className="inp-text">Total Pages</label>
                <textarea addbookinp="" value={fetchedData.total_pages} maxLength="500" type="number" name="total_pages" placeholder="total pages" id="" />
                </div>

                <div>
                <label className="inp-text">Pages read</label>
                <textarea addbookinp="" value={fetchedData.pages_read} type="number" name="pages_read" placeholder="pages read" id="" />
                </div>
            </div>
          <button  id="AddBook-btn" >Update Book</button>
          <button  id="DeleteBook-btn" >Delete Book</button>
          </form>
        </>
      );    

}

export default ViewBook;