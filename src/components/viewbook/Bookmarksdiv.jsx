import React,{ useEffect, useState ,useContext,} from "react"
import Swal from "sweetalert2"
import { api_url } from "../.."
import AuthContext from "../../context/AuthContext"
import { useParams } from "react-router-dom"



function Bookmarksdiv(props){
  let { authTokens } = useContext(AuthContext);
  let {slug} = useParams()
 const [bookmarksArr,setbookmarksArr] = useState(props.bookmarks_Arr)
 const colors = ["cadetblue","#1b4748","#261b48","#5635bb","#9b355f","#acaf1f"]
 function getRandomColor() {
    var color = Math.floor(Math.random() * colors.length)
    return colors[color];
  }
  const bg = getRandomColor()
//   var cd = {"color":bg}
 useEffect(()=>{
    setbookmarksArr(props.bookmarks_Arr)
 },[props])       


  const DeleteBookmarkreq=async(e)=>{  
    var bookmark_index = e.target.getAttribute('index')
    Swal.fire({
      title: 'Are you sure! you are about to delete this bookmark?',
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
    }).then((result)=>{
      if(result.isConfirmed){
        // console.log(bookmarksArr)
        // console.log(bookmarksArr[bookmark_index])
        const index = bookmarksArr.indexOf(bookmarksArr[bookmark_index]);
        const nd = [...bookmarksArr]
        if (index > -1) {
    nd.splice(index, 1); // 2nd parameter means remove one item only
  } console.log(nd)
  Update_bookmarks(JSON.stringify(nd)).then( data =>{
    setbookmarksArr(nd);
    Swal.fire({title:"Bookmark Deleted!",confirmButtonText: 'Fine',
    icon:'success',});
    document.querySelector("#load_bookmarks").click();
      })
  

      }
    })


  }

  const  Update_bookmarks = async(new_bookmarks)=>{
    let response = await fetch(`${api_url}api/update_book/`, {
        method:'POST',
        headers:{ 
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        },
        
        body:JSON.stringify({
          "bookmarks":new_bookmarks,
          "book_ID":slug,
        })
    })
    let data = await response.json()
    if(data.success === 'true'){
    }
}
return (
    <>
    {bookmarksArr &&  bookmarksArr.map((bookmark,index)=>
            <div key={index}  className="bm-div">
              <div className="bm-t" style={{backgroundColor:bg}}  > {Object.keys(bookmark)[0]} </div>
               <div className="bm-c" style={{backgroundColor:bg}} > {bookmark[Object.keys(bookmark)[0]]} <div icon="delete-bookmark" index={index} onClick={DeleteBookmarkreq} ></div></div>
               
                <div>
                    {/*  <div icon="delete-bookmark" ></div> */}
                </div>
              </div>
            )}
    </>
)

}

export default Bookmarksdiv