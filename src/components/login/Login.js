import React, { useState } from "react";
import "./Login.css";
import { useStateValue } from "../../datalayer/StateProvider";
import { useHistory } from "react-router-dom";

function Login() {
  const [myusername, setUsername] = useState("");
  const [mypassword, setPassword] = useState("");
  const history = useHistory();
  const [{}, dispatch] = useStateValue();
  const disabledStatus = myusername.length < 3 || mypassword.length < 3;
  const [errorBlock, setErrorBlock] = useState(false);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const url = process.env.API_URL;
    console.log(process.env);
    fetch(url + "/api/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: myusername, password: mypassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrorBlock(true);
          setUsername("");
          setPassword("");
        } else {
          dispatch({ type: "SET_ROLE", role: data.role });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              {errorBlock && (
                <div className="alert alert-danger" role="alert">
                  Please check your Username and Password
                </div>
              )}
              <form>
                <div className="form-group">
                  <label htmlFor="email">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleUsername}
                    value={myusername}
                    name="username"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={handlePassword}
                    value={mypassword}
                    name="password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleClick}
                  className="btn btn-dark"
                  disabled={disabledStatus}
                  style={{ cursor: disabledStatus ? "not-allowed" : "pointer" }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
