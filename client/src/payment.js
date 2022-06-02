import Navbar from './components/navbar'
import React from "react";
import "./payment.css"
import Footer from './components/footer'
import NavbarLogin from './components/navbarLogin';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { API } from './config/api';
import dateFormat from "dateformat";
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Payment(){

    const [transaction, setTransaction] = useState([]);
    const [user, setUser] = useState([]);
    const [trip, setTrip] = useState([]);
    const [preview, setPreview] = useState(null); 
  
    const idUser= JSON.parse(sessionStorage.getItem('user'));
    const idTrip= JSON.parse(sessionStorage.getItem('idTrip'));

    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // Create function get products data from database here ...
    const getUser = async () => {
      try {
        const response = await API.get(`/user/${idUser}`);
        setUser(response.data.data);
        console.log(response)
       
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
        getUser();
      }, []);
    
    
      
    
      // Create function get products data from database here ...
      const getTransaction = async () => {
        try {
          const response = await API.get(`/user/${idUser}`);
          setTransaction(response.data.newdata);
        
         
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
          getTransaction();
        }, []);
        const getTrip = async () => {
            try {
              const response = await API.get(`/trip/${idTrip}`);
              setTrip(response.data.data);
              console.log(response)
             
            } catch (error) {
              console.log(error);
            }
          };
         
          useEffect(() => {
              getTrip();
            }, []);
            console.log(user)
            console.log(transaction)
            console.log(trip)


            const [form, setForm] = useState({
                status:"waiting approve",
              }
            )
            const handleChange = (e) => {
              setForm({
                ...form,
                [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
              });
            
              // Create image url for preview
              if (e.target.type === "file") {
            
                let url = URL.createObjectURL(e.target.files[0]);
                setPreview(url);
              }
            };
    const handleClick = async (e)=>{
        e.preventDefault();
        const config ={
          headers:{
            "Content-type": "multipart/form-data",
          },
        };
        const formData = new FormData();
      if (form.attachment) {
        formData.set("attachment", form?.attachment[0], form?.attachment[0]?.name);
      }
      formData.set("status", form.status);
  
        
        const update = await API.put(`/transaction/${transaction.id}`,formData, config);
        console.log(update)
        handleShow()
    }
    return(
        <>
        <NavbarLogin/>
        <form onSubmit={handleClick} id="pay-container">
            
            <div id="card">
            <div id="pay-top">
                <img src={require("./components/assets/Icon.png").default} alt="icon"/>
                <div id="booking">
                    <h1>Booking</h1>
                    <p></p>
                </div>
            </div>
            <div id="main-con">
                <div id="main-pay">
                    <div id="pay-name">
                    <h1>{trip.tittle}</h1 >
                    <p></p>
                    </div>
                    <div id="date">
                        <h3>Date Trip</h3>
                        <p>{dateFormat(trip.dateTrip, "dddd, d mmmm yyyy")}</p>
                    </div>
                    <div id="duration">
                        <h3>Duration</h3>
                        <p>{trip.day} Day {trip.night} Night</p>
                    </div>
                    <div id="status">
                        <span style={{borderRadius:5,backgroundColor:"#EC7A7A",fontWeight:"bold",color:"red",width:60}}>{transaction.status}</span>
                    </div>
                    <div>
                        <h3>Accomodation</h3>
                        <p id="accomodation">{trip.accomodation}</p>
                    </div>
                    <div>
                        <h3 >Transporartion</h3>
                        <p id="transporartion">{trip.transportation}</p>
                    </div>
                </div>
                <div id="photo">{preview && (<div id="prev"><img src={preview}style={{maxWidth: "150px",maxHeight: "150px",objectFit: "cover",}}alt="preview"/></div>)}
                    <input type="file" name="attachment" id="attachment" hidden onChange={handleChange} multiple></input>
                    <label for="attachment" id="attachment" style={{fontSize:13,marginTop:10}}>upload payment proof</label>
                </div>
            </div>
            <div id="tabel-con">
            <table class="table">
  <thead>
    <tr style={{marginLeft:20,marginRight:20,display:'flex',justifyContent:'space-between'}}>
      <th scope="col">No</th>
      <th scope="col">Full Name</th>
      <th scope="col">Phone</th>
    </tr>
  </thead>
  <tbody>
    <tr style={{marginLeft:20,marginRight:20,display:'flex',justifyContent:'space-between'}} >
      <th scope="row">1</th>
      <td >{user.fullName}</td>
      <td>{user.phone}</td>
      <td></td>
    </tr>
  </tbody>
</table>
<div id= "qty">
    <div id="q">
    <span style={{fontWeight:"bold"}}>Qty</span><span style={{fontWeight:"bold",marginLeft:70}}>:</span><span style={{fontWeight:"bold",marginLeft:10}}>{transaction.counterQty}</span>
    </div>
    <div id="tot">
    <span style={{fontWeight:"bold"}}>Total</span><span style={{fontWeight:"bold",marginLeft:60}}>:</span><span style={{fontWeight:"bold",marginLeft:10,color:"red"}}>Rp.{transaction.total}</span>
    </div>
   
</div>
            </div>
           
            </div>
            <button id="btn-pay" type="submit">Pay</button>
            

        </form>
        <Footer/>
        <Modal show={show} onHide={handleClose}>
  
        Your payment will be confirmed within 1 x 24 hours
        To see orders thank you
        </Modal>
        </>
    )
}
export default Payment