import NavbarLogin from "./components/navbarLogin";
import Footer from "./components/footer";
import { useState } from "react";
import { useEffect } from "react";
import { API } from "./config/api";
import  TrasactionCard from'./transaction-card'


function Transactions(){
 
  const [user, setUser] = useState([]);
  const [trips, setTrips] = useState([]);
  const [transaction, setTransaction] = useState([]);
    // Create function get products data from database here ...
    const getUser = async () => {
      try {
        const response = await API.get("/users");
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    // Call function get products with useEffect didMount here ...
    useEffect(() => {
      getUser();
    }, []);
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
    const getTransaction = async () => {
      try {
        const response = await API.get("/transactions");
        setTransaction(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    // Call function get products with useEffect didMount here ...
    useEffect(() => {
      getTransaction();
    }, []);



    const [data,setData] = useState({
      fullName: "",
      tittle: "",
      attachment:"",
      status:""
    });
    const getData =()=>{
      
    }

console.log(data)
    return(
        <>
            <NavbarLogin/>
            <div id="card">
            <table class="table table-striped" style={{width:700,marginLeft:400,marginTop:100}}>
  <thead>
    <tr style={{display:'flex',justifyContent:'space-arround',fontWeight:'bold'}}>
      <label scope="col">No</label>
      <label style={{marginLeft:150}} scope="col">Trip</label>
      <label style={{marginLeft:220}} scope="col">Bukti Transfer</label>
      <label scope="col">Status Payment</label>
      <label scope="col">Action</label>
    </tr>
  </thead>
  <tbody>
  {transaction.map((props) => (<TrasactionCard props={props} />))}

  </tbody>
</table>
            </div>

            <Footer/>
        </>
    )
}
export default Transactions