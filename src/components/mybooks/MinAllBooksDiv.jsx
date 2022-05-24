import React, {useReducer,useEffect,useContext} from "react";

import { DragDropContext } from "react-beautiful-dnd";
import MyCurrentReads from "./MyCurrentReads";
import MyBookWishList from "./MyBookWishList";
import MyBooksDiv from "./MyBooksDiv";
import { api_url } from "../..";
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";
const shortWords = {"W":"Wishlist","L":"My Library","R":"Currently Reading"}

    // console.log(BooksArr)
    // switch (action.type) {
    //   case "COMPLETE":
    //     return state.map((todo) => {
    //       if (todo.id === action.id) {
    //         return { ...todo, complete: !todo.complete };
    //       } else {
    //         return todo;
    //       }
    //     });
    //   default:
        // return state;
    // }
//   };
const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    iconColor: 'aliceblue',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  })
function MinAllBooksDiv(){
    const reducer = (state,action) => {
        // console.log("state",state)
        // console.log("action",action)
        var BooksArr = {...state}
        BooksArr[action.for]= action.arr
        // console.warn(BooksArr)
        if (action.type === 'n'){
    
            return BooksArr
    
        }}
    const inital_book_dict = {"L":[],"R":[],"W":[]}
    let { authTokens } = useContext(AuthContext);
    const [BooksArr, dispatch] = useReducer(reducer, inital_book_dict);
    // console.log(BooksArr);
    function handleOnDragEnd(result) {
        // console.warn(result)
        if (!result.destination) return;
        // console.warn(BooksArr)
        if(result.destination.droppableId === result.source.droppableId && result.source.index === result.destination.index){

        }else{
        if(result.destination.droppableId !== result.source.droppableId){
        const source_dict = [...BooksArr[result.source.droppableId]];
        const destination_dict = [...BooksArr[result.destination.droppableId]];
        const [reorderedItem] = source_dict.splice(result.source.index, 1);
        destination_dict.splice(result.destination.index, 0, reorderedItem);
        Update_Read_Status(result.destination.droppableId,reorderedItem.pk)
        
        dispatch({"type":"n",for:result.source.droppableId,"arr":source_dict})
        
        dispatch({"type":"n",for:result.destination.droppableId,"arr":destination_dict})
        
      }else{
        const source_dict = [...BooksArr[result.source.droppableId]];
        const [reorderedItem] = source_dict.splice(result.source.index, 1);
        source_dict.splice(result.destination.index, 0, reorderedItem);   
        dispatch({"type":"n",for:result.destination.droppableId,"arr":source_dict})
      }
      Toast.fire({
        icon: 'info',
        title: `${shortWords[result.destination.droppableId]} Updated`
      })}
    }
    const  Update_Read_Status = async(brs,book_id)=>{
          let response = await fetch(`${api_url}api/update_book/`, {
              method:'POST',
              headers:{ 
                  'Content-Type':'application/json',
                  'Authorization':'Bearer ' + String(authTokens.access)
              },
              
              body:JSON.stringify({
                "book_read_status":brs,
                "book_ID":book_id,
              })
          })
          let data = await response.json()
          if(data.success === 'true'){
          }
      }
    useEffect(() => {
        fetch(`${api_url}api/getuserbooks/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          }, body: JSON.stringify({
            "book_read_status": "L"
    
          })
        }).then(resp => resp.json())
          .then(data => {
            var arr = [];
            for (const [, value] of Object.entries(data.data)) {
              arr.push(value)
            }
            // console.warn(arr)
            dispatch({"type":"n",for:"L","arr":arr})
        })
        fetch(`${api_url}api/getuserbooks/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            }, body: JSON.stringify({
              "book_read_status": "R"
      
            })
          }).then(resp => resp.json())
            .then(data => {
              var arr = [];
              for (const [, value] of Object.entries(data.data)) {
                arr.push(value)
              }
              // console.warn(arr)
              dispatch({"type":"n",for:"R","arr":arr})
          });
          fetch(`${api_url}api/getuserbooks/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            }, body: JSON.stringify({
              "book_read_status": "W"
      
            })
          }).then(resp => resp.json())
            .then(data => {
              var arr = [];
              for (const [, value] of Object.entries(data.data)) {
                arr.push(value)
              }
              // console.warn(arr)
              dispatch({"type":"n",for:"W","arr":arr})
          })
           
      }, [])
    









return(
    <DragDropContext  onDragEnd={handleOnDragEnd}>

          <MyCurrentReads booksdata={BooksArr["R"]} />
          <MyBooksDiv booksdata={BooksArr["L"]} />
          <MyBookWishList booksdata={BooksArr["W"]} />
          </DragDropContext>
)


}

export default MinAllBooksDiv;