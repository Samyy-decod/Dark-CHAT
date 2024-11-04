import React, { useState } from 'react'
import "./Join.css";
import logo from "../images/logochat.png"
import textlogo from "../images/teext.png"
import { Link } from 'react-router-dom';


export let user;

const Join = () => {

  const [name, setName] = useState("");

  const handleChange = (e) => {
    const { value } = e.target; 
    setName(value); 

  }

  const validate =(e)=>{
if(!name){
  
  e.preventDefault()

}else{
  return null
}

  }

const sendUser=()=>{
user = document.getElementById('joinInput').value
document.getElementById('joinInput').value = "";
console.log(user);
sessionStorage.setItem("user",user)


}



  return (
   <>
    <div className="JoinPage">
    <div className="JoinContainer">
      <img src={logo} alt='logo'/>  
       <h1 id='h1'> <img src={textlogo} id='textlogo'/></h1>
      <input placeholder="Enter Your Name" type="text" id="joinInput"  name='username' onChange={handleChange} required/>
     <Link to='/chat' onClick={validate}> <button onClick={sendUser}  className="joinbtn">Login In</button> </Link> 
      
    </div>
    </div>
   
   </>
  )
}

export default Join