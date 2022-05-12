import { FlippingCard,FlippingCardBack,FlippingCardFront } from "react-ui-cards"
import "./Book.css"
import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";
import React,{useState,useContext}  from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { api_url } from "../..";
import AuthContext from "../../context/AuthContext";  
function Book(props){
    // console.log(props)
    let {authTokens} = useContext(AuthContext)
    let [interval,setInterval] = useState()
    let [pageread_progress,setPageread_progress] = useState(props.pages_read)
    // eslint-disable-next-line no-unused-vars
    let [bookId,setBookId] = useState(`o${Math.floor((Math.random() * 100) + 1)}`)
    
    function s(){
        function book(){  return document.querySelector(`#${bookId}`)}
        var dict = {"inp":() => {return book().querySelector('.ss-inp')},"decpage":() => {return book().querySelector('.ss-minus')},"incpage":() => {return book().querySelector('.ss-add')}
        ,"text":() => {return book().querySelector('.ss-text')},"btn":() => {return book().querySelector('.ss-btn')},
        "refresh":() => {return book().querySelector('#refresh')}}
        return dict
    }
    
    // let [bookbtns,setBookbtns] = useState(s)
    
    function timeoutClear(){
        try{
            clearInterval(interval)
        }catch(err){

        }
    }

    function continuosdecerment(e) {
        // var inp = e.target.parentNode.querySelector(".ss-inp")
        var inp = s().inp()

        inp.innerHTML = parseInt(inp.innerHTML) - 1
        s().btn().style.display = "block"
        s().text().style.display = "none"
        s().decpage().click()
        setInterval(setTimeout(continuosdecerment, 200))
    }


    const  UpdatePagesReadApi = async(e)=>{
        e.preventDefault()
        let response = await fetch(`${api_url}api/updatereadprogress/`, {
            method:'POST',
            headers:{ 
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            
            body:JSON.stringify({
              "book_ID":props.bookId,
              "pages_read":parseInt(s().inp().innerHTML)
            })
        })
        let data = await response.json()
        // console.log(data)
        if(data.success === 'true'){
        //   navigate('/')

        const MySwal = withReactContent(Swal)
    
          await MySwal.fire({
              title: <strong>Book Read Pages Updated</strong>,
              // html: <i>Click Login Button to Login</i>,
              icon: 'success',
              confirmButtonText: <p className='boldwhitep'  > Great </p>
            })

            s().btn().style.display = "none"
            s().refresh().click()
            s().text().style.display = "block"
        }
    }
    
    function continuosincrement(e) {
        // var inp = e.target.parentNode.querySelector(".ss-inp")
        var inp = s().inp()

        inp.innerHTML = parseInt(inp.innerHTML) + 1
        s().btn().style.display = "block"
        s().text().style.display = "none"
        
        s().incpage().click()
        setInterval(setTimeout(continuosincrement, 200))
    }
    

    // useEffect(() => {
    //     document.querySelector(`#${bookId}`).click()
    //     // console.log(book)
    //     // console.log(bookbtns)
    //     // s()
    //     // console.log(bookbtns)
    // },[]  )
    
    function ias(){
        setPageread_progress(parseInt(s().inp().innerHTML))
    }
    

    return(
        <>
        <div id={bookId} onClick={s} >
        <FlippingCard className="tune"  >
    <FlippingCardBack>
    {/* <div className="Book-front" >

<div className="Book-cover-page-url" style={{backgroundImage:`url(${props.cover_page_url})`}} ></div>
<ProgressBar 
completed={75}
bgColor="#ee41d6"
height="15px"
labelColor="white"
baseBgColor="#31d8dc"
labelSize="10px"
animateOnRender
maxCompleted={100}/>
</div> */}
<div className="Book-back" >

<div className="Book-info-div" >
    <div>
        <strong>Name : </strong> {props.name} 
    </div>
    <div>
        <strong>Author : </strong> {props.author} 
    </div>
    <div>
        <strong>Total Pages : </strong> {props.total_pages} 
    </div>


    <div className="ss" >
        <span onMouseDown={continuosdecerment} onMouseLeave={timeoutClear} onMouseUp={timeoutClear}  className="ss-minus"  >-</span> <span className="ss-btn" onClick={UpdatePagesReadApi} >Update</span> <span className="ss-text" >Pages read : </span> <span className="ss-inp">{props.pages_read}</span> <span  onMouseDown={continuosincrement} onMouseLeave={timeoutClear} onMouseUp={timeoutClear} className="ss-add">+</span>
    </div>


    <div>
        <strong>About : </strong> {props.about} 
    </div>

</div>
<button hide="" id="refresh" onClick={ias} > </button>
    <Link to={`/book/${props.bookId}`} className="edit-book">  Expand  </Link>
</div>
    </FlippingCardBack>
    <FlippingCardFront>
        <div className="Book-front" >

        <div className="Book-cover-page-url" style={{backgroundImage:`url(${props.cover_page_url})`}} ></div>
        <ProgressBar 
    completed={parseInt(pageread_progress/props.total_pages * 100)}
    bgColor="#ee41d6"
    height="15px"
    labelColor="white"
    baseBgColor="#31d8dc"
    labelSize="10px"
    animateOnRender
    maxCompleted={100}/>
        </div>
        
    </FlippingCardFront>
</FlippingCard>
</div>
</>
    )
} 

export default Book


