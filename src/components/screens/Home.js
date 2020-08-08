import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import "../../App.css";
//import { Button,Nav,Navbar,NavDropdown,Form,FormControl } from 'react-bootstrap';
import { UserContext } from "../../App";
import { Accordion, Card, Button } from "react-bootstrap";
import "../../App.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [comd, setComd] = useState("");
  const { state, dispatch } = useContext(UserContext);
  console.log(state);
  useEffect(() => {
    fetch("/allposts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);
//  funtion to add likes
  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",

        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          console.log(item._id, result._id);

          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
      });
  };
  // function for dislikes
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",

        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result)

        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
      });
  };
// Function for posting comment
  const makeComment = (text, postId) => {
    console.log(text, postId);
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",

        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            console.log(result);
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };
  // function to delete post
  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.filter((item) => {
          return item._id != result._id;
        });
        setData(newData);
      });
  };

  return (
    <div className="home container">
      {console.log(data)}
      {data
        ? data.map((item) => {
            return (
              <div key={item._id} className="col-lg-9 d-block mx-auto mt-5">
                <div className="cardo">
                  <div className="row ">
                    <div className="col-xs-1 iconpic mx-4 my-2">
                      <img
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "70px",
                        }}
                        src={item.postedBy.pic}
                      />
                    </div>
                    <h3 className="title  col-xs-7 mt-4">
                      <Link to={"/profile/" + item.postedBy._id}>
                        {item.postedBy.name}
                      </Link>
                    </h3>
                    <span className="ml-auto ">
                      {state._id == item.postedBy._id ? (
                        <i
                          className="fa fa-trash mr-5 mt-4"
                          style={{ fontSize: "42px", color: "red" }}
                          onClick={() => {
                            deletePost(item._id);
                          }}
                        ></i>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>

                  <img
                    src={item.photo}
                    className="card-img-top img-fluid"
                    alt="..."
                    style={{
                      width: "800px",
                      height: "500px",
                      borderRadius: "5px",
                    }}
                  />
                  <div className="card-body mt-4 d-flex">
                    {item.likes.includes(state._id) ? (
                      <i
                        className="fa fa-heart"
                        onClick={() => {
                          unlikePost(item._id);
                        }}
                        style={{ fontSize: "32px", color: "red" }}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-heart"
                        onClick={() => {
                          likePost(item._id);
                        }}
                        style={{ fontSize: "32px", color: "grey" }}
                      ></i>
                    )}

                    <h6 className="likes ml-3">{item.likes.length}</h6>

                    <p className="caption ml-5">{item.body}</p>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      makeComment(e.target[0].value, item._id);
                    }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="comment"
                      placeholder="Add comment and press enter"
                    />
                  </form>
                  <Accordion defaultActiveKey="1">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="0"
                        >
                          View Comments!
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          {" "}
                          {item.comments.map((record) => {
                            return (
                              <div key={record.postedby._id}>
                                {" "}
                                <div className="row">
                                  <h6 className="col-lg-4">
                                    <span>
                                      {record.postedby.name} commented -
                                    </span>
                                  </h6>
                                  <span>{record.text}</span>
                                </div>
                                <hr />
                              </div>
                            );
                          })}{" "}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card></Card>
                  </Accordion>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default Home;
