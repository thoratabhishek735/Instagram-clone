import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

//Function for sign up to Db
const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  //function for uploading pic
  const uploadPic = () => {
    console.log("ooo");
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "abhishektinstaclone");
    data.append("cloudname", "abhishekt");
    fetch("https://api.cloudinary.com/v1_1/abhishekt/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };
  const uploadFields = () => {
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("error");
        } else {
          alert("signup successfull");
          history.push("/login");
        }
      });
  };
  const postData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  return (
    <React.Fragment>
      <div className="col-lg-5 d-block mx-auto my-5 ">
        <div className="card shadow my-5">
          <h1 className="text-center my-5 signuptext">Signup</h1>

          <div className="form-group mx-5">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mx-5">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mx-5">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group ml-5">
            <label>Upload Profile Picture</label>
            <br />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              id="exampleFormControlFile1"
            />
          </div>

          <button
            className="btn btn-danger btn-lg w-50 d-block mx-auto my-5"
            onClick={() => postData()}
          >
            SIGNUP
          </button>

          <h5 className="text-center">
            <Link to="/login">Already have an account?</Link>
          </h5>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Signup;
