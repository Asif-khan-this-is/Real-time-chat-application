import React, { useState } from 'react';
import './login.css';



const Login = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [action , setAction] = useState('Sign In !')
  const [email, setEmail] = useState('');
  // const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    if (username && password) {
      onSignIn();
    }
  };

  return (
    <div className="right-content">
      <form onSubmit={handleSignIn}>
        <div className="form-heading">
          <h1>{action}</h1>
          {action === "Sign In !"?<p>Sign in to your account if you're an existing user</p>: <p>Create a new Account</p> }
          
        </div>
        <div className="credentials">
          {action === "Sign In !" ?<div></div>:<input
            type="email"
            name='email'
            id="email"
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />}
          <input
            type="text"
            name='username'
            id="username"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name='password'
            id="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {action === "Sign Up !" ?<div></div>:<div className="forgot-pw">
          <div className="remember">
            <input
              type='checkbox'
              id="rememberMe"
              name='rememberMe'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <a href="/forgot-password">Forgot Password?</a>
        </div>}
        
        <div className='buttons'><button onClick={()=>setAction("Sign In !")}className={`btn ${action === "Sign In !" ? 'btn-active' : 'btn-inactive'}`}>
          Sign in
        </button>
        <button onClick={()=>setAction("Sign Up !")} className={`btn ${action === "Sign Up !" ? 'btn-active' : 'btn-inactive'}`}>
          Sign up
        </button></div>
      </form>

    </div>
  );
};

export default Login;
