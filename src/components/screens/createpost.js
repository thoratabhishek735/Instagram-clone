import React,{useState,useEffect}from "react";
const Createpost = () => {
    const title = "title";
   const [body, setBody] = useState("") 
   const [image,setImage]=  useState("")
  const[url,setUrl] = useState("")
  // use effect hook only runs after image is uploaded
useEffect(()=>{
    if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
           
            body:JSON.stringify({
                title,
                body,
                picurl:url
                
    
             } )
        }).then(res=>res.json()).then(data=>{
            console.log(data)
           if(data.error){
               alert("error")
             }
             else{
                 alert("posted successfully")
                 
             }
        })

    }
   
},[url])
   const postdetails=()=>{
       console.log("ooo")
      const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","abhishektinstaclone")
      data.append("cloudname","abhishekt")
      fetch("https://api.cloudinary.com/v1_1/abhishekt/image/upload",{
          method:"post",
          body:data
      }).then(res=>res.json()).then(data=>setUrl(data.url)).catch(err=>console.log(err))
     
        
}
  return (
    <React.Fragment>
      <div className="col-lg-7 d-block mx-auto my-5 ">
        <div className="card shadow my-5">
          <h1 className="text-center my-5 signuptext">Create your post here</h1>

       
            <div className="form-group mx-5">
              <textarea
                className="form-control"
                onChange={(e)=>setBody(e.target.value)}
                id="body"
                rows="8"
                value={body}
                placeholder="Enter Caption"
              />
            </div>
            <div className="form-group ml-5">
              <label >Upload Image</label>
              <input
                type="file"
                 onChange={(e)=>setImage(e.target.files[0])}
                id="exampleFormControlFile1"
                
              />
            </div>
            <button onClick={()=>postdetails()} className="btn btn-success btn-lg w-50 d-block mx-auto my-5">SUBMIT</button>
          
        </div>
      </div>
    </React.Fragment>
  );
};

export default Createpost;
