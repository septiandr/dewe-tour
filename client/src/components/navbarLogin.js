import {Dropdown} from 'react-bootstrap'
import './navbar.css'
import {Link,Redirect} from 'react-router-dom'
import { useState,useContext } from 'react'
import { useHistory } from "react-router-dom";
import { UserContext } from '../context/userContext';

function NavbarLogin(){
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    history.push("/");
    sessionStorage.setItem('isLogin', JSON.stringify(false));
  };
  const home =()=>{
    history.push("/home-login");
  }
  const status = JSON.parse(sessionStorage.getItem("status"))
  console.log(status)
  const user= JSON.parse(sessionStorage.getItem('user'));
  const handlePayment = (e)=>{
    e.preventDefault()
 
  history.push(`/payment/${user}`)
  }
  if (status=="admin"){
    return(<div class = "navbar" >
    <div id = "nav-right" >
    <img onClick={home} src = {require("./assets/Icon.png").default } alt = "Icon" />
    </div> 
    <div id = "nav-left" >
    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
    
    <img id="user-img" src={require("./assets/user (1).png").default} alt="user"/>
    </Dropdown.Toggle>

    <Dropdown.Menu>
    <Dropdown.Item onClick={()=>{history.push('/transactions')}}>Transaction</Dropdown.Item>
      <Dropdown.Item onClick={()=>{history.push('/add-trip')}}>Trip</Dropdown.Item>
      <Dropdown.Item  onClick={logout}>Logout</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
        
    </div>
</div>)
  }
  return(
  <div class = "navbar" >
        <div id = "nav-right" >
        <img  onClick={home} src = {require("./assets/Icon.png").default } alt = "Icon" />
        </div> 
        <div id = "nav-left" >
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        
        <img id="user-img" src={require("./assets/user (1).png").default} alt="user"/>
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item onClick={()=>{history.push('/profile')}} >Profile</Dropdown.Item>
          <Dropdown.Item onClick={handlePayment}>Pay</Dropdown.Item>
          <Dropdown.Item  onClick={logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
</Dropdown>
            
        </div>
  </div>)
}
export default NavbarLogin