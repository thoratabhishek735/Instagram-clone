import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { Accordion, Card, Button, Modal } from "react-bootstrap";

import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import "../../App.css";
const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [mypics, setMyPics] = useState([]);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  const [followersreq, setFollowers] = useState([]);
  useEffect(() => {
    fetch("/followers", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("fl", result);
        setFollowers(result);
      });
  }, []);
  useEffect(() => {
    fetch("/myposts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((myposts) => {
        setMyPics(myposts.result);
        console.log("aa", myposts);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "abhishektinstaclone");
      data.append("cloudname", "abhishekt");
      fetch("https://api.cloudinary.com/v1_1/abhishekt/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
          console.log(data);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...state, pic: data.url })
          );
          dispatch({ type: "UPDATEPIC", payload: data.url });
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log("updateed", result);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [image]);
  const updatePhoto = (file) => {
    console.log("ooo");
    setImage(file);
  };

  function Example() {
    const [show, setShow] = useState(false);
    const [person, setPerson] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { state, dispatch } = useContext(UserContext);
    console.log("kkkk", state);
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
            {followersreq.map((fill) => {
              return state.followers.includes(fill._id) ? (
                <div key={fill._id} className="row m-5">
                  <div className="col-xs-3">
                    {" "}
                    <img
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "40px",
                      }}
                      src={fill ? fill.pic : "httpss.png"}
                    />
                  </div>
                  <div className="col-xs-8 ml-5">
                    <Link to={"/profile/" + fill._id}>
                      <h3>{fill.name}</h3>
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              );
            })}
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
            {followersreq.map((fill) => {
              return state.following.includes(fill._id) ? (
                <div key={fill._id} className="row m-5">
                  <div className="col-xs-3">
                    {" "}
                    <img
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "40px",
                      }}
                      src={fill ? fill.pic : "httpss.png"}
                    />
                  </div>
                  <div className="col-xs-8 ml-5">
                    <Link to={"/profile/" + fill._id}>
                      <h3>{fill.name}</h3>
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              );
            })}
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

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Liked By</Popover.Title>
      <Popover.Content>
        {mypics
          ? mypics.map((post) => {
              return (
                <div>
                  {" "}
                  <h4>
                    {post.likes.map((likers) => {
                      return (
                        <>
                          {followersreq.map((lk) => {
                            if (lk._id == likers) {
                              return (
                                <div className="row mt-4">
                                  <div className="col-lg-3">
                                    {" "}
                                    <img
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "30px",
                                      }}
                                      src={lk ? lk.pic : "httpss.png"}
                                    />
                                  </div>
                                  <div className="col-lg-7">
                                    {lk.name} <br />
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </>
                      );
                    })}
                  </h4>{" "}
                  <br />,
                </div>
              );
            })
          : "fuck"}
      </Popover.Content>
    </Popover>
  );

  const Example3 = () => (
    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
      <i className="fa fa-heart" style={{ fontSize: "32px", color: "red" }}></i>
    </OverlayTrigger>
  );

  return (
    <React.Fragment>
      <div className="container">
        <div className="row mt-5 " id="pic and info">
          <div className="col-lg-3 ">
            <div id="imgdiv" className="text-center">
              <img
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                className="img-fluid mx-auto d-block m-5"
                src={state ? state.pic : "httpss.png"}
              />
            </div>
            <Accordion defaultActiveKey="1">
              <Card>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Update pic
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div className="form-group ml-5">
                      <br />
                      <input
                        type="file"
                        onChange={(e) => updatePhoto(e.target.files[0])}
                        id="exampleFormControlFile1"
                      />
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card></Card>
            </Accordion>
          </div>
          <div className="col-lg-6 mt-5 offset-lg-1">
            <div id="nameinfo" className=" mt3">
              <h2 className="mb-3"> {state ? state.name : "loading"}</h2>
              <div className="d-flex ">
                <div className="row">
                  <h4 className="col-lg-12 text-center">
                    {" "}
                    <b>{mypics.length}</b>
                  </h4>
                  <h4 className="col-lg-12"> Posts</h4>
                </div>
                <div className="row">
                  <h4 className="col-lg-12 text-center">
                    <b> {state ? state.followers.length : "0"}</b>
                  </h4>
                  <h4 className="col-lg-12 rock">
                    {" "}
                    <Example />
                  </h4>
                </div>

                <div className="row">
                  <h4 className="col-lg-12 text-center">
                    {" "}
                    <b>{state ? state.following.length : "0"}</b>{" "}
                  </h4>
                  <h4 className="col-lg-12 rock">
                    <Example2 />
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div id="Photo gallery" className="container">
        <div className="pics d-flex">
          {mypics.map((item) => {
            return (
              <div key={item._id}>
                <img
                  src={item.photo}
                  style={{
                    width: "350px",
                    height: "300px",
                    borderRadius: "5px",
                  }}
                  src={item.photo}
                  className="mx-2"
                />{" "}
                <p>{item.body}</p>
                <div className=" mt-1 d-flex">
                  <Example3 />
                  <h6 className="likes ml-3">{item.likes.length}</h6>

                  <p className="caption ml-5">{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
