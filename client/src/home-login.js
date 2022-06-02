
import Card from'./card'
import "./home.css"
import Footer from './components/footer'
import { useState,useEffect } from 'react'
import NavbarLogin from './components/navbarLogin'
import { API } from './config/api'
import { Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'



function HomeLogin() { 
  const user = JSON.parse(sessionStorage.getItem("user"))
    const [trips, setTrips] = useState([]);
  let history =useHistory()
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
    const [userr, setUser] = useState();
    
    // Create function get products data from database here ...
    const getUser = async () => {
      try {
        const response = await API.get(`/user/${user}`);
        setUser(response.data.newdata.idTrip);
        console.log(response)
       
      } catch (error) {
        console.log(error);
      }
    };
    console.log(userr)
    useEffect(() => {
        getUser();
      }, []);
    sessionStorage.setItem("idTrip",JSON.stringify(userr))


    const status = JSON.parse(sessionStorage.getItem("status"))
    if (status=="admin"){
      return(<>
        <NavbarLogin/>
            <div >
           <Button id="add-btn"  variant="warning" onClick={()=>{history.push('/add-trip')}}>Add Trip</Button>
           <div id="g">
            {trips.map((item) => (<Card item={item} />))}
            </div>
            </div>
            <Footer/>
        </>
        )
    }
    return (
        <div id = "container" >
            <div id = "index-image" > 
            <NavbarLogin/>
    
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




export default HomeLogin