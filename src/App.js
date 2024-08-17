
// import './App.css';
import { Children } from 'react';
import Dashboard from './modules/Dashboard';
import Form from './modules/Form';
import { Routes,Route ,Navigate } from 'react-router-dom';
import Profile from './modules/Profile';

function App() {
  const ProtectedRoute = ({children, auth=false}) =>{
    const isLoggedIn = localStorage.getItem('user:token') !== null || false
    if(!isLoggedIn && auth){
      return <Navigate to={"/users/sign_in"}  />
    }else if(isLoggedIn && ['/users/sign_in', '/users/sign_up'].includes(window.location.pathname)){
      return <Navigate to = {'/'}/>
    }
    return children
  }
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute auth={true}>
          <Dashboard/>
        </ProtectedRoute>
      } />
      <Route path="/users/sign_in" element={
        <ProtectedRoute>
          <Form isSignin={true}/>
        </ProtectedRoute>
      } />
      <Route path="/users/sign_up" element={
        <ProtectedRoute>
          <Form isSignin={false}/>
        </ProtectedRoute>
      } />
      <Route path="users/profile" element={<Profile/>}/>
    </Routes>
    
  );
}

export default App;
