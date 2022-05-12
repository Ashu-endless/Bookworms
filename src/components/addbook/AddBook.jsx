import "./AddBook.css";
import { api_url } from "../..";
import React, {  useEffect,useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import $ from "jquery";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// import { useNavigate } from 'react-router';

export function textareaElemUI(){
  $('textarea').on('click', function(){
    $(this).height(1);
    var totalHeight = $(this).prop('scrollHeight') - parseInt($(this).css('padding-top')) - parseInt($(this).css('padding-bottom'));
    $(this).height(totalHeight);
})
    $('textarea').on('keydown', function(e){
      if(e.which === 13) {e.preventDefault();}
  }).on('input', function(){
      $(this).height(1);
      var totalHeight = $(this).prop('scrollHeight') - parseInt($(this).css('padding-top')) - parseInt($(this).css('padding-bottom'));
      $(this).height(totalHeight);
  })

  $('textarea').click();
}

function AddBook() {
  let {authTokens} = useContext(AuthContext)
  // let navigate = useNavigate();
  const  AddBookApi = async(e)=>{
      e.preventDefault()
        let response = await fetch(`${api_url}api/addbook/`, {
            method:'POST',
            headers:{ 
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            
            body:JSON.stringify({
              "name":e.target.name.value,
              "author":e.target.author.value,
              "about":e.target.about.value,
              "total_pages":e.target.total_pages.value,
              "pages_read":e.target.pages_read.value,
              "cover_page_url":e.target.coverpage_url.value
            })
        })
        let data = await response.json()
        console.log(data)
        if(data.success === 'true'){
          // window.location.href('/')
          const MySwal = withReactContent(Swal)
    
          await MySwal.fire({
              title: <strong>Book Added to your Library</strong>,
              // html: <i>Click Login Button to Login</i>,
              icon: 'success',
              confirmButtonText: <a href="/" className='boldwhitep'  > Great </a>
            })
        }
    }
     

  const load_image=(e)=>{
    var btn = document.querySelector("#load-img-btn")
    function setImage(url,result){
      var btn = document.querySelector("#load-img-btn")
      
      if(result === "success"){
        document.querySelector("#AB-book-cover-preview").style.backgroundImage = `url(${url})`
        btn.style.backgroundColor = `lightgreen`
        btn.innerHTML = 'Image Loaded Succesfully'
        setInterval(() => {
          btn.style.backgroundColor = `#6495ed`
          btn.innerHTML = 'Load Image'
        }, 3000);
      }
      else{
        console.log("error")
        btn.style.backgroundColor = `red`
        btn.innerHTML = 'Error Loading Image'
        setInterval(() => {
          btn.style.backgroundColor = `#6495ed`
          btn.innerHTML = 'Load Image'
        }, 3000);
      }
    }    
    
    testImage(btn.previousElementSibling.value,setImage)
    

  }    

  function testImage(url, callback, timeout) {
    timeout = timeout || 5000;
    var timedOut = false, timer;
    var img = new Image();
    img.onerror = img.onabort = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "error");
            // return "error"
        }
    };
    img.onload = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "success");
            // return "success"
        }
    };
    img.src = url;
    timer = setTimeout(function() {
        timedOut = true;
        callback(url, "timeout");
    }, timeout); 
}


  
    useEffect(() => {
      textareaElemUI()
    });

  return (
    


    <>
      <form id="Addbook-div" onSubmit={AddBookApi}>
        <div id="AB-cover-fields" >
        <div id="AB-book-cover-preview" ></div>
        <label className="inp-text">Book Cover Image url</label>
        <textarea style={{minHeigh:'40px'}} addbookinp="" type="text" name="coverpage_url" placeholder="example - https://static.vecteezy.com/system/resources/previews/000/216/149/large_2x/vector-simple-and-effective-motivational-book-cover-design-template.jpg"  id="" />
        <span id="load-img-btn" onClick={load_image}  >Load Image</span>
        </div>

        <div id="AB-inp-fields" >
          <label className="inp-text">Book Name</label>
            <textarea addbookinp="" required type="text" name="name" placeholder="Book name" id="" />
             <label className="inp-text">Author</label>
             <textarea addbookinp="" type="text" name="author" placeholder="Author name" id="" />
            <label className="inp-text">About</label>
            <textarea addbookinp="" type="text" name="about" placeholder="description" id="" />
            <label className="inp-text">Total Pages</label>
            <textarea addbookinp="" maxLength="500" type="number" name="total_pages" placeholder="total pages" id="" />
            <label className="inp-text">Pages read</label>
            <textarea addbookinp="" type="number" name="pages_read" placeholder="pages read" id="" />
        </div>
      <button type="submit" id="AddBook-btn" >Add Book</button>
      </form>
    </>
  );
}

export default AddBook;
