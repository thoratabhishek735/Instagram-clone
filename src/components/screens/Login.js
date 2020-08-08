import React,{useState,useContext} from 'react'
import { Link ,useHistory} from 'react-router-dom';
import {UserContext}from '../../App'
export default function Login() {
   const {state,dispatch}=  useContext(UserContext)
    const history = useHistory()
    const[email,setEmail]= useState("")
    const[password,setPassword]= useState("")
   
    const postData = ()=>{
       
         fetch("/signin",{
             method:"post",
             headers:{
                 "Content-Type":"application/json"
             },
            
             body:JSON.stringify({
                
                 email,
                 password
   
              } )
         }).then(res=>res.json()).then(data=>{
             console.log(data)
            if(data.error){
                alert("error")
              }
              else{
                  localStorage.setItem("jwt",data.token)
                  localStorage.setItem("user",JSON.stringify(data.user))
                  dispatch({type:"USER" , payload:data.user})
                  alert("Login successfull")
                  history.push('/')
              }
         })
    }




    return (

      <React.Fragment>
        <div className="col-lg-5 d-block mx-auto my-5 ">
   <div className="card shadow my-5">
   <h1 className="text-center my-5 signuptext">Login</h1>

       
        <div className="form-group mx-5">
           
            <input type="email" className="form-control" id="email" name="email" placeholder="EMAIL" value={email} onChange={(e)=>setEmail(e.target.value)}/>
           
        </div>
        <div className="form-group mx-5">
        
            <input type="password" className="form-control" id="password" name="password" placeholder="PASSWORD" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        
         
        <button type="submit" className="btn btn-info btn-lg w-50 d-block mx-auto my-5"onClick={()=>postData()}>LOGIN</button>
    
 
     </div></div>
     
     </React.Fragment>
    )
}
