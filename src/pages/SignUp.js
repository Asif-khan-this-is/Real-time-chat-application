import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; 
import axios from 'axios';

const SignUp = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
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
          <h1>Sign Up</h1>
          <p>Create a new account</p>
        </div>
        <div className="credentials">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
          />
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
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <div className='error_msg'>{error}</div>}
        <div className="buttons">
          <button type="submit" className="btn btn-active">
            Sign Up
          </button>
        </div>
        <p className="login-prompt">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
      </div>
      
    </main>
    
  );
};

export default SignUp;
