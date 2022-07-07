import { FlippingCard,FlippingCardBack,FlippingCardFront } from "react-ui-cards"
import "./Book.css"
import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";
import React,{useState,useContext}  from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { api_url } from "../..";
import AuthContext from "../../context/AuthContext";  
// import { useDrag } from "react-dnd";
import { getparent } from "./getparent";
import { Draggable } from "react-beautiful-dnd";
const colors =["rgb(133, 25, 53)","rgb(121, 3, 75)","rgb(80 12 54)","rgb(64 37 54)","rgb(30 18 26)","rgb(175 47 132)","rgb(120 28 89)","rgb(78 17 57)","rgb(48 5 33)"]

function getRandomColor() {

    // var colors =["rgb(133, 25, 53)","rgb(121, 3, 75)","#F806CC","#A91079","rgb(147 169 16)"]
    // var colors =["rgb(133, 25, 53)","rgb(121, 3, 75)"]
    var color = Math.floor(Math.random() * colors.length)

    // var letters = '0123456789ABCDEF';
    // var color = '#';
    // for (var i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    return colors[color];
  }

  function getRandomgradColor() {
      var gradcolors = ["linear-gradient(to right, #ff0099, #493240)"]
      gradcolors.push(...colors)
    // var colors =["rgb(133, 25, 53)","rgb(121, 3, 75)",,"rgb(80 12 54)","rgb(64 37 54)","rgb(30 18 26)","rgb(175 47 132)","rgb(120 28 89)","rgb(78 17 57)","rgb(48 5 33)"]
    // var colors =["rgb(133, 25, 53)","rgb(121, 3, 75)"]
    var color = Math.floor(Math.random() * colors.length)

    // var letters = '0123456789ABCDEF';
    // var color = '#';
    // for (var i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    return colors[color];
  }

function Book(props){
    // console.table("-------------BOOK+_+_+_+_+_+_+_+_+_+_+_+_")
    

    // const [{ isDragging }, drag] = useDrag(() => ({
    //     type: "book",
    //     item: { id: props.bookId },
    //     collect: (monitor) => ({
    //       isDragging: !!monitor.isDragging(),
    //     }),
    //     previewOptions :    d
    //   }));
    // console.log(props)
    let {authTokens} = useContext(AuthContext)
    let [interval,setInterval] = useState()
    let [pageread_progress,setPageread_progress] = useState(props.pages_read)
    // eslint-disable-next-line no-unused-vars
    let [bookId,setBookId] = useState(`${props.place}${props.bookId}`)
    
    // const [{ isDragging }, drag] = useDrag(() => ({
    //     type: "image",
    //     item: { id: bookId },
    //     collect: (monitor) => ({
    //       isDragging: !!monitor.isDragging(),
    //     }),
    //   }));

    function AddtoCurrentReading(e){
        // send update book req
        // console.log( getparent(e.target,`o${props.bookId}`))
        // document.querySelector('#My-current-reading-books-div').insertBefore(getparent(e.target,`o${props.bookId}`).cloneNode(true),document.querySelector('#My-current-reading-books-div').children[0])
        Swal.fire({
            title: 'Sure about adding this book to Current Reading ?',
            showCancelButton: true,
        confirmButtonText: 'Yes',
        icon:'warning',
            
          }).then((result) => {
            // if (result.isConfirmed) {
            //     fetch(`${api_url}api/update_book/`, {
            //         method: "POST",
            //         headers: {
            //           "Content-Type": "application/json",
            //           Authorization: "Bearer " + String(authTokens.access),
            //         },body:JSON.stringify({
            //             "book_ID":props.bookId,
            //             "":"R"
            //             // "notes":document.querySelector("#Viewbook-notes").querySelector("[name=notes]").value,
            //         })
            //       }).then(resp => resp.json())
            //       .then(data => {
            //         if(data.success === 'true'){
            //         Swal.fire({
            //           title: 'Book Added to Currently Reading',
            //           confirmButtonText: 'Great',
            //           icon:'success',
                      
            //         }).then((result) => {
            //           if (result.isConfirmed) {
            //             window.location.href = "/Bookworms";
              
              
            //           } 
            //         })} else{
            //           Swal.fire({
            //             title: 'Problem Updating Book',
            //             confirmButtonText: 'ok',
            //             icon:'error',
                        
            //           })
            //         }})
    
    
            // } 
          })
    }

    function RemovefromCurrentReading(){
        // send update book req
        Swal.fire({
            title: 'Sure about Removing this book from Current Reading ?',
            showCancelButton: true,
        confirmButtonText: 'Yes',
        icon:'warning',
            
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/Bookworms";
    
    
            } 
          })
    }

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
        {/* style={{border:`2px solid ${getRandomColor()}`}} */}
        {/* style={{ border: isDragging ? "5px solid pink" : "0px" }} */}
        {/* ref={drag} book="" id={bookId} */}

        {/* <Draggable> */}
        {/* <Draggable  draggableId={bookId} index={props.index} > 
        {(provided, snapshot) => {
            return (  */}

        {/* <div ref={provided.innerRef} snapshot={snapshot} {...provided.draggableProps} {...provided.dragHandleProps} book="" id={bookId}  onClick={s}    > */}
        <div  book="" id={bookId}  onClick={s}    >
        <FlippingCard className="tune"  >
    <FlippingCardBack>
   
<div className="Book-back" >

<div className="Book-info-div" style={{background:getRandomgradColor()}}  >
    <div>
        <strong>Name : </strong> {props.name} 
    </div>
    { props.author.trim().length !== 0 ? <div> <strong>Author : </strong> {props.author}  </div> : ""  }
    {/* <div>
        <strong>Author : </strong> {props.author} 
    </div> */}
    { props.total_pages.trim().length !== 0 ? <div>
        <strong>Total Pages : </strong> {props.total_pages} 
    </div> : ""  }
    

        
    <div className="ss" >
        <span onMouseDown={continuosdecerment} onMouseLeave={timeoutClear} onMouseUp={timeoutClear}  className="ss-minus"  >-</span> <span className="ss-btn" onClick={UpdatePagesReadApi} >Update</span> <span className="ss-text" >Pages read : </span> <span className="ss-inp">{props.pages_read}</span> <span  onMouseDown={continuosincrement} onMouseLeave={timeoutClear} onMouseUp={timeoutClear} className="ss-add">+</span>
    </div>

    { props.online_read_url.trim().length !== 0 ? <a target={"_blank"} className="read_online_btn" href={props.online_read_url} rel="noreferrer" >
        Read Online 
    </a> : ""  }

    {/* { props.book_read_status === 'L' ? <div className="atcr" onClick={AddtoCurrentReading} > Add to Currently Reading</div> : <div className="atcr" onClick={RemovefromCurrentReading} > Remove from Currently Reading</div>  } */}
    { props.notes.trim().length !== 0 && props.notes !== "N/A" ? <div>
        <strong>Note : </strong> {props.notes} 
    </div> : ""  }
    { props.about.trim().length !== 0 ? <div>
        <strong>About : </strong> {props.about} 
    </div> : ""  }
    

</div>
<button hide="" id="refresh" onClick={ias} > </button>
    <Link to={`/book/${props.bookId}/details`} className="edit-book">  Expand  </Link>
</div>
    </FlippingCardBack>
    <FlippingCardFront>
        <div className="Book-front" >

        <div className="Book-cover-page-url" style={{backgroundImage:`url(${props.cover_page_url})`}} ></div>
      {props.place === "W" ? "" :
        <ProgressBar 
    completed={parseInt(pageread_progress/props.total_pages * 100)}
    bgColor="#ee41d6"
    height="20px"
    minheight="15px"
    maxheight="15px"
    labelColor="black"
    baseBgColor="#31d8dc"
    labelSize="15px"
    // customLabel={ (100*props.read_completed_times) + parseInt(pageread_progress/props.total_pages * 100) + "%"} 
    customLabel={ <span className="progcent" > {(100*props.read_completed_times) + parseInt(pageread_progress/props.total_pages * 100) + "%"}</span>} 
    animateOnRender
    maxCompleted={100}/>}
        </div>
        
    </FlippingCardFront>
</FlippingCard>
</div>
{/* ) */}
{/* } */}
{/* } */}
{/* </Draggable> */}
{/* </Draggable> */}
</>
    )
} 

export default Book


