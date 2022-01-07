import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setpwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
        headers: { "Content-Type": "application/json" },
        widthCredentials: true,
      });
      const data = await res.json();
      const accessToken = data.accessToken;
      const roles = data.roles;
      setAuth({ user, pwd, roles, accessToken });

      setUser("");
      setpwd("");
      setSuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrMsg("no server response");
        return;
      }
      setErrMsg(err.message);
    }
  };

  return (
    <>
      {success ? (
        <p>you are logged in!</p>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            {/* USERNAME */}
            <label htmlFor="username">username</label>
            <input
              ref={userRef}
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={user}
              required
            />

            {/* pwd */}
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => {
                setpwd(e.target.value);
              }}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            need an account? <br />
            <span className="line">
              <a href="">sign up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
