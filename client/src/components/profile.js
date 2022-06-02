
import Footer from "./footer"
import NavbarLogin from "./navbarLogin"
import './profile.css'
import { useState,useEffect } from "react"
import {API} from'../config/api'
import dateFormat from "dateformat";
function Profile(){
    const id= JSON.parse(sessionStorage.getItem('user'));
    const [profile, setProfile] = useState({});
    const [transaction, settransaction] = useState({});
    const [trip, settrip] = useState({});
    
    const getProfile = async () => {
        try {
        const response = await API.get(`/user/${id}`);
          // Store product data to useState variabel
        setProfile(response.data.data);
        } catch (error) {
        console.log(error);
        }
    };
    useEffect(() => {
        getProfile();
      }, []);

      const getTransaction = async () => {
        try {
        const response = await API.get(`/user/${id}`);
          // Store product data to useState variabel
        settransaction(response.data.data.transactions);
        } catch (error) {
        console.log(error);
        }
    };
    useEffect(() => {
        getTransaction();
      }, []);
      const idTrip = JSON.parse(sessionStorage.getItem("idTrip"))
      const gettrip = async () => {
        try {
        const response = await API.get(`/trip/${idTrip}`);
          // Store product data to useState variabel
        settrip(response.data.data);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        gettrip();
      }, []);
  console.log(profile)

      if(transaction.status=="approve" ||transaction.status=="Canceled"  ){
          return(
            <>
        <NavbarLogin/>
        <div id="profile-container">
            <div id="left-profile">
                <h1>Personal Info</h1>
                <label>{profile.fullName}</label>
                <p>Email</p>
                <label>{profile.email}</label>
                <p>Phone</p>
                <label>{profile.phone}</label>
                <p>Address</p>
                <label>{profile.address}</label>
            </div>
            <div id="right-profile">
                <img src={require("./assets/profile.png").default}></img><br/>
                <button>Change Photo Profil</button>
    
            </div>
        </div>
        <div id="card" style={{marginTop:600,marginLeft:100,marginRight:100}}>
            <div id="pay-top">
                <img src={require("./assets/Icon.png").default} alt="icon"/>
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
                <div id="photo">
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
      <td >{profile.fullName}</td>
      <td>{profile.phone}</td>
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
        
        <Footer/>
        </>
    )
            
      }else{
    return(
        <>
        <NavbarLogin/>
        <div id="profile-container">
            <div id="left-profile">
                <h1>Personal Info</h1>
                <label>{profile.fullName}</label>
                <p>Email</p>
                <label>{profile.email}</label>
                <p>Phone</p>
                <label>{profile.phone}</label>
                <p>Address</p>
                <label>{profile.address}</label>
            </div>
            <div id="right-profile">
                <img src={require("./assets/profile.png").default}></img><br/>
                <button>Change Photo Profil</button>
            </div>
        </div>
        <Footer/>
        </>
    )
      }
}

export default Profile