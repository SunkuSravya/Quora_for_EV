import React, { useState } from 'react';
import './Login.css';
import {auth} from '../../firebase';
import logo from './CST-logo.png'

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then((auth) => {
      console.log(auth);
    }).catch((e) => alert(e.message));
    
    setEmail("");
    setPassword("");
  }
  const handleRegister = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then((auth) => {
        if (auth) {
          console.log(auth);
        }
      }).catch((e) => alert(e.message));

      setEmail("");
      setPassword("");
  };

    return (
        <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src={logo}
            alt=""
          />
        </div>
        <div className="login__desc">
          <p>A Place to Share knowledge and better understand the world</p>
          <h3>Quora For EV</h3>
        </div>
        <div className="login__auth">
          <div className="login__emailPass">
            <div className="login__label">
              <h4>Login</h4>
            </div>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small>Forgot Password?</small>
              <button type='submit' onClick={handleLogin}>Login</button>
              <button className="reg_btn" onClick={handleRegister}>Register</button>
            </div>
            
          </div>
        </div>
        <div className="login__footer">
          <p>About</p>
          <p>Terms</p>
          <p>Contact</p>
          <p>&copy; Quora For EV Inc. 2021</p>
        </div>
      </div>
    </div>
    )
}

export default Login