import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; 
import axios from 'axios';
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const loginUser = async (data) => {
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem('token', res.data);
      localStorage.setItem('username' , res.user.username)
      navigate("/");
      // console.log(res.user.username)
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(data)
    
  };

  return (
    <main>
      <div className="left">
        <div className="left-content">
          <div className="left-content-top">
            <h1 className='left-heading'>Welcome</h1>
            <span>to Real Chat App</span>
          </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo doloribus, magni praesentium cupiditate at cumque error mollitia molestiae pariatur quae quas a sit alias ratione exercitationem? Aliquam excepturi cum obcaecati sit! Dicta atque, ducimus deserunt, assumenda, impedit omnis accusamus eaque officia quis pariatur quaerat recusandae cum sequi fuga soluta eius!
          </p>
        </div>
      </div>
      <div className='right'>
      <div className="right-content">
      <form onSubmit={handleSubmit}>
        <div className="form-heading">
          <h1>Sign In</h1>
          <p>Access Your Account Here</p>
        </div>
        <div className="credentials">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        {error && <div className='error_msg'>{error}</div>}
        <div className="buttons">
          <button type="submit" className="btn btn-active">
            Sign In
          </button>
        </div>
        <p className="login-prompt">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
      </div>
      
    </main>
    
  );
};

export default Login;
