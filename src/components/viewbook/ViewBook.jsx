import React,{useEffect,useContext,useState} from 'react'
import './ViewBook.css'
import { api_url } from '../..'
import {
  useParams
} from 'react-router-dom'
import Loading from '../Loading'
import { textareaElemUI } from '../addbook/AddBook'
import AuthContext from '../../context/AuthContext'
import Swal from 'sweetalert2'
import { Routes,Route,NavLink } from 'react-router-dom'
import BookNotes from './BookNotes'
import BookDetails from './BookDetails'

// import withReactContent from 'sweetalert2-react-content'



function ViewBook(props){
  let { authTokens } = useContext(AuthContext);
    let { slug } = useParams()
    let [fetchedData,setFetchedData] = useState("")


    const DeleteBookreq= async (e)=> {
      // console.log(e.target);
      // const MySwal = withReactContent(Swal)
      // await MySwal.fire({
      //   title: <strong>Book Read Pages Updated</strong>,
      //   // html: <i>Click Login Button to Login</i>,
      //   icon: 'success',
      //   denyButtonText: <p className='boldwhitep'  > Great </p>
      // })
      Swal.fire({
        title: 'Are you sure! you are about to delete this book?',
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes,Delete it',
        denyButtonText: 'No',
        icon:'warning',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`${api_url}api/delete_book/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },body:JSON.stringify({
              "book_id":slug
            })
          }).then(resp => resp.json())
          .then(data => {
            Swal.fire({
              title: `Book deleted`,
              confirmButtonText: 'ok',
              icon:'success',
              
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/Bookworms";
      
      
              } 
            })
            })


        } 
      })

      // let response = await fetch(`${api_url}api/usernameavailibility/`, {
      //     method:'POST',
      //     headers:{ 
      //         'Content-Type':'application/json',
      //         // 'Authorization':'Bearer ' + String(authTokens.access)
      //     },
          
      //     body:JSON.stringify({username:e.target.value})
      // })
      // let data = await response.json()
      // console.log(data)
      // console.log(data.available)
  
      
      
      
    }
    const UpdateBookNotesreq= async (e)=> {
      e.preventDefault()
      Swal.fire({
        title: 'Are you sure to make changes to this book?',
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        icon:'warning',
        
      }).then((result) => {
        if (result.isConfirmed) {
          // console.log(e.target.name.value)
          fetch(`${api_url}api/update_book/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },body:JSON.stringify({
              "book_ID":slug,
              "notes":document.querySelector("#Viewbook-notes").querySelector("[name=notes]").value,
            })
          }).then(resp => resp.json())
          .then(data => {
            if(data.success === 'true'){
            Swal.fire({
              title: 'Book Updated',
              confirmButtonText: 'Great',
              icon:'success',
              
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/Bookworms";
      
      
              } 
            })} else{
              Swal.fire({
                title: 'Problem Updating Book',
                confirmButtonText: 'ok',
                icon:'error',
                
              })
            }
            })

        } 
      })

      
      
      
      
    }
    const UpdateBookreq= async (e)=> {
      e.preventDefault()
      Swal.fire({
        title: 'Are you sure to make changes to this book?',
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        icon:'warning',
        
      }).then((result) => {
        if (result.isConfirmed) {
          // console.log(e.target.name.value)
          fetch(`${api_url}api/update_book/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },body:JSON.stringify({
              "book_ID":slug,
              "name":document.querySelector("#Viewbook-details").querySelector("[name=name]").value,
              "author":document.querySelector("#Viewbook-details").querySelector("[name=author]").value,
              "about":document.querySelector("#Viewbook-details").querySelector("[name=about]").value,
              "total_pages":document.querySelector("#Viewbook-details").querySelector("[name=total_pages]").value,
              "pages_read":document.querySelector("#Viewbook-details").querySelector("[name=pages_read]").value,
              "cover_page_url":document.querySelector("#Viewbook-details").querySelector("[name=coverpage_url]").value,
              "online_read_url":document.querySelector("#Viewbook-details").querySelector("[name=online_read_url]").value,
              "read_completed_times":document.querySelector("#Viewbook-details").querySelector("[name=read_completed_times]").value
            })
          }).then(resp => resp.json())
          .then(data => {
            if(data.success === 'true'){
            Swal.fire({
              title: 'Book Updated',
              confirmButtonText: 'Great',
              icon:'success',
              
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/Bookworms";
      
      
              } 
            })} else{
              Swal.fire({
                title: 'Problem Updating Book',
                confirmButtonText: 'ok',
                icon:'error',
                
              })
            }
            })

        } 
      })

      
      
      
      
    }
  
    

    useEffect(() => {
      fetch(`${api_url}api/viewbook/${slug}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }).then(resp => resp.json())
      .then(data => {setFetchedData(data.data);
        document.querySelector("#Loading-stop-btn-Viewbook").click()
        document.querySelectorAll("#ViewBook-div")[0].style.display = "none"
        document.querySelectorAll("#ViewBook-div")[1].style.display = "block"
        textareaElemUI()
        
      });
     
    // console.log(fetcheddata)
      

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[] )

    

    return (
    


        <>
        <div id="ViewBook-div" >
        <Loading id="Loading-stop-btn-Viewbook"  />
        </div>
          <form id="ViewBook-div"  style={{display:'none'}} >
            <div className='nlrdr' >

             <NavLink className={(navData) => (navData.isActive ? "active rdr" : 'rdr')} to={`details`}  > Details </NavLink>
            <NavLink className={(navData) => (navData.isActive ? "active rdr" : 'rdr')} to={`bookmarks`} > Notes </NavLink>
            </div>

          <Routes>

          <Route path={`/details`}  element={<BookDetails fetchedData={fetchedData} />} ></Route>
          <Route path={`/bookmarks`} element={<BookNotes fetchedData={fetchedData} />}  ></Route>

          </Routes>
          {/* <BookDetails fetchedData={fetchedData} /> */}

          <div id='viewbook-btns' >
          <Routes>

          <Route path={`/details`}  element={<button type='button'  onClick={UpdateBookreq} id="updateBook-btn" >Update Details</button>} ></Route>
          <Route path={`/bookmarks`} element={<button type='button' onClick={UpdateBookNotesreq}    id="updateBook-btn" >Update Notes</button>} ></Route>

          </Routes>
          {/* <button type='submit'    id="AddBook-btn" >Update Book</button> */}
          <button type='button' onClick={DeleteBookreq}   id="DeleteBook-btn" >Delete Book</button>
          </div>
          </form>
        </>
      );    

}

export default ViewBook;