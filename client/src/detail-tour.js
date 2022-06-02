import NavbarLogin from './components/navbarLogin'
import React from "react";
import "./detail-tour.css"
import Footer from './components/footer'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API } from './config/api';
import { useHistory } from 'react-router-dom';
import convertRupiah from "rupiah-format";
import dateFormat from "dateformat";
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Tour(){
    let history =useHistory()
    let { id } = useParams();
    const [trip, setTrip] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  // Create function get products data from database here ...
  const getTrip = async (id) => {
    try {
      const response = await API.get(`/trip/${id}`);
      setTrip(response.data.data);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  // Call function get products with useEffect didMount here ...
  useEffect(() => {
    getTrip(id);
    
  }, []);
  const [country, setCountry] = useState([]);
const idCountry= JSON.parse(sessionStorage.getItem('idCountry'));
  // Create function get products data from database here ...
  const getCountry = async (e) => {
    try {
    
      const response = await API.get(`/country/${idCountry}`);
      setCountry(response.data.data);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountry();
    
  }, []);

  const [number,setCount] = useState(0)
    const handleMin =(e)=>{
      e.preventDefault();
    setCount((prevState) => prevState - 1);
    }
    const handlePlus =(e)=>{
      e.preventDefault();
        setCount((prevState) => prevState + 1);
    }
   
    const total= number * trip.price;
  
    const image = JSON.parse(sessionStorage.getItem("image"))
    const form = {
      counterQty:number,
      total:total,
      status:"waiting payment",
      idTrip:id,
    }
  
  console.log(form)
    const handleOnSubmit = async (e) => {
      try {
        e.preventDefault();
        const config ={
          headers:{
            "Content-type": "application/json",
          },
        };
      const idUsr= JSON.parse(sessionStorage.getItem('user'));
      const response = await API.post('/transaction',form,config);
      console.log(response)


      const newTransaction =  {"idTransaction" : response.data.newTransaction.id};
      
 
      console.log(newTransaction)
      const update = await API.put(`/user/${idUsr}`,newTransaction, config);
        console.log(update)
        

      const user= JSON.parse(sessionStorage.getItem('user'));
      sessionStorage.setItem("idTransaction", JSON.stringify(response.data.newTransaction.id))
        history.push('/home-login')

      } catch (error) {
        console.log(error);
      }
    };
    return(
        <form id="tour-container" >
            <NavbarLogin/>
            <h1>{trip.tittle}</h1>
            <p id="country" style={{marginTop:40}}>{country.name}</p>
            <div id="detail-img">
                <div id="main-img">
                    <img src ={require(`../../server/uploads/${image[0].filename}`).default} className="image" alt=""/>
                </div>
                <div id="secondary-img">
                <img style={{width:360,height: 180}} src ={require(`../../server/uploads/${image[1].filename}`).default} alt="main-img"/>
                <img style={{marginLeft:50,marginRight:50,width:360,height: 180}} src ={require(`../../server/uploads/${image[2].filename}`).default} alt="main-img"/>
                <img style={{width:360,height: 180}} src={require(`../../server/uploads/${image[3].filename}`).default}  alt="main-img"/>
                </div>
            </div>
            <div id="info">
            <h2>Information Trip</h2>
            <div id="dis-info">
                <div>
                    <p>Accommodation</p>
                    <img src={require("./components/assets/hotel 1.png").default} alt="detail-icon"/>
                    <h3>{trip.accomodation}</h3>
                </div>
                <div>
                    <p>Transportation</p>
                    <img src={require("./components/assets/plane 1.png").default} alt="detail-icon"/>
                    <h3>{trip.transportation}</h3>
                </div>
                <div>
                    <p>Eat</p>
                    <img src={require("./components/assets/meal 1.png").default} alt="detail-icon"/>
                    <h3>{trip.eat}</h3>
                </div>
                <div>
                    <p>Duration</p>
                    <img src={require("./components/assets/time 1.png").default} alt="detail-icon"/>
                    <h3>{trip.day} Day {trip.night} Night</h3>
                </div>
                <div>
                    <p>Date Trip</p>
                    <img src={require("./components/assets/calendar 1.png").default} alt="detail-icon"/>
                    <h3> {dateFormat(trip.dateTrip, "dddd, d mmmm yyyy")}</h3>
                </div>
            </div>
            </div>
            <div id="descriptionn">
            <h2>Description</h2>
            <p>{trip.description}</p>
            </div>
            <div id="tag">
            <label><span>{convertRupiah.convert(trip.price)}</span> / Person</label>
            <div id="sum">
            <button onClick={handleMin}>-</button><label name="counterQty" >{number}</label> <button onClick={handlePlus}>+</button>
            </div>
            
            </div>
            <div id="total">
            <h2>Total:</h2>
            <label value={total} name="total">{convertRupiah.convert(total)}</label>
            </div>
            <button id="btn-book" type='submit' onClick={handleOnSubmit}>Book Now</button>
            <Footer/>
        </form>
    )
}
export default Tour