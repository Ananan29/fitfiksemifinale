import React, {useEffect, useState} from 'react'
import './Navigationbar.css'
import logo from "../assets/logo.jpeg"
import config from '../config';
// import Authopopup from "../Authopopup/Authopopup";
import { Link } from "react-router-dom";

const Navigationbar = () => {
    const [isadminauthenticated, setisadminauthenticated] = useState()
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const checkAdminAuthenticated = async () => {
      try {
          const response = await fetch(`${process.env.API_BASE_URL}/admin/checklogin`, {
            // `${config.API_BASE_URL}/admin/checklogin`
              method: 'GET',
              headers: {
                  'Content-Type' : 'application/json',
              },
              credentials: 'include'
          });

          if (response.ok) {
              //Admin is authenticated
              setisadminauthenticated(true);
          }
          else {
              //Admin is not authenticated
              setisadminauthenticated(false);
          }
      }
      catch (err) {
          console.error(err);
          setisadminauthenticated(false);
      }
  }

  useEffect(() => {
      checkAdminAuthenticated();
  }, []);
  const [showpopup, setShowpopup] = useState(false)
  // const { theme, toggleTheme } = useTheme(false);
  useEffect(()=>{
    console.log(isadminauthenticated)
  },[isadminauthenticated])
  const loggedIn =(x) =>{
    console.log("loggedIn",x)
    setisadminauthenticated(true)
  }
  return (
    <nav>
      <img src={logo} alt="logo" className="img"/>
      <Link to="/" className="a">Home</Link>
      <Link to="/signup" className="a">signup</Link>
      <Link to="/login" className="a">login</Link>
      <Link to="/addworkout" className="a">addworkout</Link>
      <Link to="/contact" className="a">contact</Link>
      {/* <Link to="/profile" className="a"><IoIosBody/></Link> */}
      {
        isadminauthenticated?
        <button className="btn">Logout</button>:
        <button onClick={() => {
          setShowpopup(true)
        }}>Login</button>
      }
      {
        showpopup&& <Authopopup setShowpopup={setShowpopup} loggedIn={loggedIn}/>
        // <h1 className="mainhead1">Login page</h1>
      }
      
            {/* <Appp/> */}

      
        {/* <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button> */}
      
      
    </nav>
  )
//   return (
//     <div className="navbar">Navigationbar
//       <img src = {logo} alt = "Logo" width = {100} className = 'logo' />
//         <div className='adminlinks'>
//             {isadminauthenticated ?(
//                 <>
//                     <a href = "/pages/addworkout">Add Workout</a>
//                 </>
//             ) : (
//                 <>
//                     {/* Show login/signup links for unauthenticated admin */}
//                     <a href = "/adminauth/login">Login</a>
//                     <a href = "/adminauth/register">Signup</a>
//                 </>
//             )}
//         </div>
//     </div>
//   )
}

export default Navigationbar