import React,{useEffect, useState} from "react";
import "./Navigationbar.css";
import {IoIosBody} from "react-icons/io";
import logo from "../../assets/purplestar.png"
import Authopopup from "../Authopopup/Authopopup";
import { Link } from "react-router-dom";
import Appp from "../../Appp";
// import { ThemeContext } from "@emotion/react";
// import { useTheme } from '../ThemeContext/ThemeContext';


const Navigationbar = () => {
  const [isloggedin,setisloggedin]=useState()
  const [showpopup, setShowpopup] = useState(false)
  // const { theme, toggleTheme } = useTheme(false);
  useEffect(()=>{
    console.log(isloggedin)
  },[isloggedin])
  const loggedIn =(x) =>{
    console.log("loggedIn",x)
    setisloggedin(true)
  }
  return (
    <nav>
      <img src={logo} alt="logo" className="img"/>
      <Link to="/" className="a">Home</Link>
      <Link to="/about" className="a">About</Link>
      <Link to="/contact" className="a">Contact</Link>
      <Link to="/reports" className="a">Reports</Link>
      <Link to="/workouts" className="a">Workouts</Link>
      <Link to="/profile" className="a"><IoIosBody/></Link>
      {
        isloggedin?
        <button className="btn">Logout</button>:
        <button onClick={() => {
          setShowpopup(true)
        }}>Login</button>
      }
      {
        showpopup&& <Authopopup setShowpopup={setShowpopup} loggedIn={loggedIn}/>
        // <h1 className="mainhead1">Login page</h1>
      }
      
            <Appp/>

      
        {/* <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button> */}
      
      
    </nav>
  )
}

export default Navigationbar