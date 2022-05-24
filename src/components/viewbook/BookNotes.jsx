import React,{useState,useContext,useEffect} from "react";
import Swal from "sweetalert2";
import Bookmarksdiv from "./Bookmarksdiv";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { api_url } from "../..";
import { textareaElemUI } from "../addbook/AddBook";
function BookNotes(props) {
  
  let { slug } = useParams()
  let { authTokens } = useContext(AuthContext);
  if(props.fetchedData === ""){
    window.location.assign(`/Bookworms#/book/${slug}/details`)
  }
  console.log(props)
  var received_bookmarks_data
  if(props.fetchedData === ""){
    received_bookmarks_data = []
  }else{
      received_bookmarks_data = JSON.parse(props.fetchedData.bookmarks)

  }
  const [bookmarksArr,setbookmarksArr] = useState(received_bookmarks_data)
  const [fetchedData,setfetchedData] = useState(props.fetchedData)
  // const [change,setchange] = useState("")

  // fetch(`${api_url}api/viewbook/${slug}/`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + String(authTokens.access),
  //   },
  // }).then(resp => resp.json())
  // .then(data => {
  //   console.log(data)
  //   setfetchedData(data.data);
  //   // var received_bookmarks_data;
  //   // console.warn((data.data));
  //   // console.log(fetchedData)
  //   try {
  //     setbookmarksArr(JSON.parse(fetchedData.bookmarks))
  //   } catch (error) {
      
  //   }})
  //   console.log(slug)
  //   // navigate(`#/book/${slug}`)
  //   window.location.assign(`/Bookworms#/book/${slug}/details`)
  //   // console.table("redirect to parent component")
  // }
    // console.log(props)
    // const fetchedData = props.fetchedData
    // var received_bookmarks_data;
    // if(fetchedData.bookmarks === ""){
    //   received_bookmarks_data = []
    // }else{
    //   received_bookmarks_data = JSON.parse(fetchedData.bookmarks)
    // }
    // const [bookmarksArr,setbookmarksArr] = useState(received_bookmarks_data)
    
    
    // console.warn(props)

    // console.warn(JSON.parse(JSON.stringify(`${fetchedData.bookmarks}`)))

  const AddBookmark= async(e)=>{
    const steps = ['1', '2']
    const ques = ["Page-number or title of the bookmark","content of the bookmark"]
    const confirm_text = ["Next","Create Bookmark"]
    const swalQueueStep = Swal.mixin({
  confirmButtonText: 'Next',
  cancelButtonText: 'Back',
  progressSteps: steps,
  input: 'text',
  inputAttributes: {
    required: true
  },
  reverseButtons: true,
  validationMessage: 'This field is required'
})

const values = []
let currentStep

for (currentStep = 0; currentStep < steps.length;) {
  const result = await swalQueueStep.fire({
    title: ques[currentStep],
    inputValue: values[currentStep],
    showCancelButton: currentStep > 0,
    confirmButtonText: confirm_text[currentStep],
    currentProgressStep: currentStep
  })

  if (result.value) {
    values[currentStep] = result.value
    currentStep++
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    currentStep--
  } else {
    break
  }
}

if (currentStep === steps.length) {
  var new_bookmark = {}
  new_bookmark[values[0]] = values[1]
  console.log(new_bookmark)
  var new_bookmark_Arr = [...bookmarksArr]
  new_bookmark_Arr.push(new_bookmark)
  setbookmarksArr(new_bookmark_Arr)
  // console.log(JSON.stringify(new_bookmark_Arr));
  Update_bookmarks(JSON.stringify(new_bookmark_Arr))
  Swal.fire({title:"Bookmark Created!",confirmButtonText: 'Great!',
  icon:'success',})
}
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
          "book_ID":fetchedData.pk,
        })
    })
    let data = await response.json()
    if(data.success === 'true'){
    }
}
  // console.log(bookmarks_JSon)
  // bookmarks_JSon = JSON.parse(bookmarks_JSon)
  // console.log(typeof(bookmarks_JSon))
  // if(bookmarks_JSon !== 'undefined'){
  // var data = JSON.parse(bookmarks_JSon)
  // console.log(typeof(data))}

  // useEffect(() => {
  //     // refresh()
  //     textareaElemUI()
  // }, [])
  
  const refresh=()=>{
    fetch(`${api_url}api/viewbook/${slug}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    }).then(resp => resp.json())
    .then(data => {
      console.log(data)
      console.log(JSON.parse(data.data.bookmarks))
      setfetchedData(data.data);
      // var received_bookmarks_data;
      // console.warn((data.data));
      // console.log(fetchedData)
      try {
        setbookmarksArr(JSON.parse(data.data.bookmarks))
      } catch (error) {
        
      }
    // if( fetchedData === {} || fetchedData.bookmarks === "" ){
    //   // received_bookmarks_data = []
    // }else{
    //   // console.warn(fetchedData === null)
    //   // console.log("else")
    //   setbookmarksArr(JSON.parse(fetchedData.bookmarks))
    //   // received_bookmarks_data = JSON.parse(fetchedData.bookmarks)
    // }
      
    });
  }

  
  return (
    <>
      <div id="Viewbook-notes">
        <button id="load_bookmarks" type="button" hide="" onClick={refresh} ></button>
        <div>
          <label className="inp-text">Notes</label>
          <textarea
            addbookinp=""
            type="text"
            name="notes"
            placeholder="Some important detail about this book"
            id=""
            defaultValue={fetchedData && fetchedData.notes}
          />
        </div>

        <div>
          <label className="inp-text">Bookmarks</label>
          <div>
            <Bookmarksdiv bookmarks_Arr={bookmarksArr} />
            {/* <div>{bookmarks_JSon}</div> */}
            <div onClick={AddBookmark} icon="bookmark-add" ></div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default BookNotes;


