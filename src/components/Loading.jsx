import { SpinnerInfinity } from 'spinners-react';
import React, { useState} from 'react';
const LoadingDivStyle = {
    width : "50%",
    position : "absolute",
    top : "50%",
    left : "50%",
    transform:"translate(-50%,-50%)"
}

function Loading(props) {
    const [loading, setloading] = useState(true);

    
    function unload(){
        setloading(false)
    }


    return (
            <>
            {/* <div >  */}
            <SpinnerInfinity enabled={loading} style={LoadingDivStyle} thickness={180} speed={100} color="black" secondaryColor="rgb(20 20 82)" />
            <button id={props.id} hide="" onClick={unload} ></button>
            
            {/* </div> */}
            </>
          )
  }
  
  export default Loading;