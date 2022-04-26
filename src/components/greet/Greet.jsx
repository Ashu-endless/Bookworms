import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import './Greet.css'

function Greet() {
    let [greet,setgreet] = useState("Good Morning")
    let [greetwallpaper,setgreetwallpaper] = useState("moon-svg")

    let {user} = useContext(AuthContext)
    
    
    useEffect(() => {
        var date = new Date();  
        var hour = date.getHours();
        // var hour = 7
        if (hour < 12) {  
            setgreet("Good Morning")  
            setgreetwallpaper("sun-svg")
          } else if (hour < 17) {  
            setgreet("Good Afternoon")  
            setgreetwallpaper("sun-svg") 
          } else {  
            setgreet("Good Evening")  
            setgreetwallpaper("moon-svg") 
          }
        }, [])
      
     
  return (
          <>
          <div id='Greet-Div' > <div id={greetwallpaper} ></div> <div className='grapes' >{greet}</div> <div className='Apple' >{user.username}</div>   </div>
          </>
        )
}

export default Greet      ;