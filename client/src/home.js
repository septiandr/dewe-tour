import Navbar from './components/navbar'
import Card from'./card'
import "./home.css"
import Footer from './components/footer'
import data from "./list.json"
import React from 'react';
import { useState,useEffect } from 'react'
import { API } from './config/api'



function Home() {
    const [trips, setTrips] = useState([]);

    // Create function get products data from database here ...
    const getTrips = async () => {
      try {
        const response = await API.get("/trips");
        setTrips(response.data.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    
    // Call function get products with useEffect didMount here ...
    useEffect(() => {
      getTrips();
    }, []);
    console.log(trips)
    return (
        <div id = "container" >
            <div id = "index-image" > 
            <Navbar/>
    
            <h1 id = "index-title" > Explore </h1>
            <h2 id = "index-des" > your amazing city together </h2> 
            <p id = "description" > Find great places for holiday </p>
            <input id = "search" type = "text" /> 
            < button id = "btn-search" > Search </button> 
            </div >
            <Content />
            <h1 id = "group-title" > Grup Tour </h1>
        <div id="group-cont">
            {trips.map((item) => (
            <Card item={item} />))}
        </div>
        
       
     
        <Footer/>
        </div>
    )
        
   
    function Content() {
        return ( 
            < div id = "content" >
            <div id = "guarantee" >
            <img src = { require("./components/assets/guarantee 1.png").default }
            alt = "guarantee" />
            <h1 > Best Price Guarantee </h1> 
            <p > A small river named Duren flows by their place and supplies </p> 
            </div >

            <div id = "traveller" >
            <img src = { require("./components/assets/heart 1.png").default }
            alt = "heart" />
            <h1> Travellers Love Us </h1>  
            <p > A small river named Duren flows by their place and supplies </p> 
            </div >

            <div id = "bestagent" >
            <img src = { require("./components/assets/agent 1.png").default }
            alt = "agent" />
            <h1 > Best Travel Agent </h1 >  
            <p > A small river named Duren flows by their place and supplies </p> 
            </div >

            < div id = "support" >
            <img src = { require("./components/assets/support 1.png").default }
            alt = "support" />
            <h1 > Our Dedicated Support </h1 >  
            <p > A small river named Duren flows by their place and supplies </p> 
            </div > 
            </div >
        )
    }

}



export default Home