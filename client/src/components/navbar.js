
import './navbar.css'
import  { Modal }  from  'react-bootstrap' ;
import React, { useState,useContext } from 'react';
import {useHistory} from 'react-router-dom'
import { Alert } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { API, setAuthToken } from "../config/api";


function Navbar() {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const [state, dispatch] = useContext(UserContext);
    
  const [message, setMessage] = useState(null);
  const [messageLogin, setMessageLogin] = useState(null);

    const [form, setform] = useState({
        email:"",
        password:"",
        fullName:"",
        phone:"",
        status:""
      }
    )

    const { email, password,fullName,  phone,address } = form;

    const handleRegister = (e) => {
      setform({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
    
    const handleSubmit = async (e)=>{
      try{
      e.preventDefault();
   
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);
      console.log(response)
      if (response.data.status === "success...") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setform({
          fullName:"",
          email:"",
          password:"",
          phone:"",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };
  
    const [login, setLogin] = useState({
        email:"",
        password:"",
    })

  
    const handleLogin =(e) =>{
      setLogin((prevState) => ({
        ...login,
        [e.target.name]:e.target.value,
      }))
    }
    
    const handleSubmitLogin =async (e)=>{
      try {
      e.preventDefault();
  
        // Create Configuration Content-type here ...
        // Content-type: application/json
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
  
        // Convert form data to string here ...
        const body = JSON.stringify(login);
  
        // Insert data user for login process ...
        const response = await API.post("/login", body, config);
        console.log(response)
        sessionStorage.setItem('user', JSON.stringify(response.data.data.id));
        sessionStorage.setItem('status', JSON.stringify(response.data.data.status));
        setAuthToken(response.data.data.token);
        // Checking process
        if (response?.status === 200) {
          // Send data to useContext
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.data,
          });
          console.log(response.data.data.status)
          // Status check
          history.push('/home-login')
          
          
          JSON.parse(sessionStorage.setItem("isLogin", true));
          const alert = (
            <Alert variant="success" className="py-1">
              Login success
            </Alert>
          );
          setMessageLogin(alert);
        }
      } catch (error) {
        const alert = (
          <Alert variant="danger" className="py-1">
            Login failed
          </Alert>
        );
        setMessageLogin(alert);
        console.log(error);
      }
    }
    const home =()=>{
      history.push("/");
    }
    return ( 
        <div class = "navbar" >
        <div id = "nav-right" >
        <img onClick={home} src = { require("./assets/Icon.png").default } alt = "Icon" />
        </div> 
        <div id = "nav-left" > 
        <button id = "login" onClick={handleShow}> Login </button> 
        <button id = "register" onClick= {handleShowRegister}> Register </button>  
        </div >

        <div id='modal'> 
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <div id="body-register">
        {messageLogin && messageLogin}
        <Modal.Body>
            <form onSubmit={handleSubmitLogin}>
            <label>Email</label><br/>
            <input id="emailLogin" name="email" type='email' onChange={handleLogin} required></input><br/>
            <label>Password</label><br/>
            <input id="passwordLogin" type='password' name="password" onChange={handleLogin} required></input><br/>
            <div id="btn-login">
            <button id="handlelogin" type="submit">Login</button>
            </div>
            </form>
            
        </Modal.Body>
        </div>
    </Modal>

  
    </div>
    <div id="modal-register">
    <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        {message && message}
        <div id="body-register">
        <Modal.Body>
            <form onSubmit={handleSubmit}>
            <label>Full Name</label><br/>
            <input name="fullName" value={fullName} type='text' onChange={handleRegister}/><br/>
            <label>Email</label><br/>
            <input name="email" value={email} type='email' onChange={handleRegister}></input><br/>
            <label>Password</label><br/>
            <input name="password" value={password} type='password' onChange={handleRegister}></input><br/>
            <label>Phone</label><br/>
            <input name="phone" value={phone} type='number' onChange={handleRegister}></input><br/>
            <label>Address</label><br/>
            <input name="address" value={address} type='text' onChange={handleRegister}></input><br/>
            <button id="btn-regis"  type="submit">Register</button>
            </form>
            
        </Modal.Body>
        </div>
        <Modal.Footer>
        <div id="btn-register">
        
        
        </div>
        </Modal.Footer>
    </Modal>
    </div>
    
    </div>
    );
}




export default Navbar