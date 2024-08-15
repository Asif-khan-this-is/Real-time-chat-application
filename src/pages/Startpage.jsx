import React from 'react';
import './Front.css';
import Login from './Login';
import SignUp from './SignUp';
const Front = () => {
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
    </main>
  );
}

export default Front;
