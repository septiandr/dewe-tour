import "./home.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useState,useEffect } from "react";
import { API } from "./config/api";
import convertRupiah from "rupiah-format";
function Card({item}) {
    const [country, setCountry] = useState([]);
    const idCountry= JSON.parse(sessionStorage.getItem('idCountry'));
      // Create function get products data from database here ...
      const getCountry = async (e) => {
        try {
        
          const response = await API.get(`/country/${item.idCountry}`);
          setCountry(response.data.data);
          console.log(response)
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getCountry();
        
      }, []);
    let history =useHistory()
  const detail=()=>{
    history.push(`./detail-tour/${item.id}`)
    sessionStorage.setItem('idCountry', JSON.stringify(item.idCountry));
    sessionStorage.setItem('image', item.image);
  }
    const arr = JSON.parse(item.image)

    return ( 
        <div id="group" key={item.id}>
        < img id="gbr"  onClick={detail} src ={require(`../../server/uploads/${arr[0].filename}`).default} className="image" alt = "" /><br/>
        <h2 onClick={detail} >{item.tittle}</h2>
        
        <section>
        <p>{convertRupiah.convert(item.price)}</p><label>{country.name}</label>
        </section>
      
        </div>
    )
}
export default Card