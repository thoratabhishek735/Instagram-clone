import React,{useContext,useEffect,useState} from "react";
import { UserContext } from '../../App';
import {useParams} from 'react-router-dom'
import {BrowserRouter,Route,Link,useHistory} from'react-router-dom'
import { Button,Nav,Navbar,NavDropdown,Form,FormControl,Modal } from 'react-bootstrap';
import "../../App.css"



const UserProfile = () => {
  const{state,dispatch}= useContext(UserContext)
  const [userprofile,setuserProfile] = useState(null)
  const {userid}=useParams()
  const [followersreq,setFollowers] = useState([])
  useEffect(() => {
    fetch("/followers", {
      method: "get",
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFollowers(result);
      });
  }, []); 
  
  useEffect(() => {
    fetch(`/user/${userid}`,{
      method:"get",
      headers:{
       
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
    }).then(res=>res.json()).then(result=>{ 
        console.log(result)
        setuserProfile(result) })
  }, )
  //Funtion for adding id in followers array
  const followUser =()=>{
    fetch('/follow',{
      method:"put",
      headers:{
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("jwt"),
      },
      body:JSON.stringify({
        followId:userid,
      })
    }).then(res=>res.json()).then(data=>{
      console.log("m",data)
      dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
      localStorage.setItem("user",JSON.stringify(data))
      setuserProfile((prevState)=>{
        return {
            ...prevState,
            user:{
                ...prevState.user,
                followers:[...prevState.user.followers,data._id]
               }
        }
    })
     
    }).catch(err=>{console.log(err)})
    
  }
  // function for unfollowing
  const unfollowUser =()=>{
    fetch('/unfollow',{
      method:"put",
      headers:{
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("jwt"),
      },
      body:JSON.stringify({
        unfollowId:userid
      })
    }).then(res=>res.json()).then(data=>{
      console.log("object",data)
      dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
      localStorage.setItem("user",JSON.stringify(data))
      setuserProfile((prevState)=>{
        return {
            ...prevState,
            user:{
                ...prevState.user,
                followers:[...prevState.user.followers,data._id]
               }
        }
    })
    }).catch(err=>{console.log(err)})
    
  }

//  Bootstrap modals
  function Example() {
    const [show, setShow] = useState(false);
    const [person,setPerson] = useState([]) 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const{state,dispatch}= useContext(UserContext)
    console.log("kkkk",state)
    return (
      <>
        <h4 variant="primary" onClick={handleShow}>
          Followers
        </h4>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Followers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
        {

          followersreq.map(fill=>{
         return userprofile.user.followers.includes(fill._id)? <div key={fill._id} className="row m-5">
           <div className="col-xs-3"> <img
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "40px",
                }}
          
                
                src={fill ? fill.pic : "httpss.png"}
                
              /></div>
           <div className="col-xs-8 ml-5"><Link to={"/profile/"+fill._id}><h3>{fill.name}</h3></Link></div>
           </div> : ""
          })
         
        }
       
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }


  function Example2() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <h4 variant="primary" onClick={handleShow}>
          Following
        </h4>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Following</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          {

followersreq.map(fill=>{
return userprofile.user.following.includes(fill._id)? <div key={fill._id} className="row m-5">
 <div className="col-xs-3"> <img
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "40px",
      }}

      
      src={fill ? fill.pic : "httpss.png"}
      
    /></div>
 <div className="col-xs-8 ml-5"><Link to={"/profile/"+fill._id}><h3>{fill.name}</h3></Link></div>
 </div> : ""
})

}

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
         
          </Modal.Footer>
        </Modal>
      </>
    );
  }




  return (
    <React.Fragment>
      
        { 
            userprofile? <div className="container">
            <div className="row " id="pic and info">
              <div className="col-lg-4 mt-5 ">
                <div id="imgdiv" className="text-center">
                  <img
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "80px",
                    }}
                    src={userprofile.user.pic}
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <div id="nameinfo" className=" mt3">
                  <h2 className="mt-5">{userprofile.user.name}</h2>
                  <h5 className="mt-2">{userprofile.user.email}</h5>
                  <div className="d-flex">
                  <div className="row">
                <h4 className="col-lg-12 text-center"><b> {userprofile.post.length}</b></h4>
                <h4 className="col-lg-12"> Posts</h4>

                </div>
                <div className="row">
                <h4 className="col-lg-12 text-center"><b>{userprofile.user.followers.length}</b></h4>
                <h4 className="col-lg-12 rock"> <Example /></h4>

                </div>
                
                <div className="row">
                <h4 className="col-lg-12 text-center"> <b> {userprofile.user.following.length}</b></h4>
                <h4 className="col-lg-12 rock"> <Example2 /></h4>
 
                </div>
               
                  </div>
              
                  {state._id!=userid ? <div>{
                    userprofile.user.followers.includes(state._id)? <button type="button" className="btn btn-info mt-4 d-block w-100" onClick={()=>{unfollowUser()}}>unFollow</button> : <button type="button" className="btn btn-info d-block w-100" onClick={()=>{followUser()}}>Follow</button>
                  }</div> : "" }

                  

                 
                </div>
              </div>
            </div>
            <hr />
            <div id="Photo gallery">
            <div className="pics d-flex">
              {
               userprofile.post.map(item=>{
                 return(
                  <div>
                  <img src={item.photo}
                  style={{ width: "350px", height: "300px", borderRadius: "5px" }}
                  src={item.photo}
                  className="mx-2"
                  
                  
                 /> <p className="ml-2">{item.body}</p> 
                  <div className="row ml-3"><i
                className="fa fa-heart"
               
                style={{ fontSize: "32px", color: "red"}}
              ></i>  <h5 className="likes ml-2">{item.likes.length}</h5></div>
                 
                 </div>
                 )
               })
              }
              
               
                
              </div>
            </div>
          </div> : "loading"
        }
      
    </React.Fragment>
  );
};

export default UserProfile;