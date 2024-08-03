import { useState } from "react";
import Navbar from "./components/Navbar";
import Front from './pages/Startpage';
import Home from './pages/Home'; // Import the Home page
import './index.css';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isHome, setIsHome] = useState(false); // Track if we are on the Home page

  const handleSignIn = () => {
    setIsSignedIn(true);
    setIsHome(true); // Go to home page after signing in
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setIsHome(false); // Go back to the Front page after signing out
  };

  return (
    <>
      {isSignedIn ? (
        <>
          <Navbar onSignOut={handleSignOut} />
         <Home /> 
        </>
      ) : (
        <Front onSignIn={handleSignIn} />
      )}
    </>
  );
}

export default App;

