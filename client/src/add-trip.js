import React from "react";
import {Form, Row, Col, FloatingLabel} from "react-bootstrap"
import './add-trip.css'
import NavbarLogin from "./components/navbarLogin";
import Footer from "./components/footer";
import { useState, useEffect } from "react";
import { API } from "./config/api"
import { useHistory } from "react-router-dom";


function Add(){
  let history = useHistory()

  const [country, setCountry] = useState([]); //Store all category data
  const [idCountry, setIdCountry] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview

  const getCountry = async () => {
    try {
      const response = await API.get("/countries");
      setCountry(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeIdCountry = (e) => {
    const id = e.target.value;
    const selected= e.target.selected;
    if (selected) {
      // Save category id if checked
      setIdCountry([...idCountry, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newIdCountry = idCountry.filter((idCountryItem) => {
        return idCountryItem !== id;
      });
      setIdCountry(newIdCountry);
    }
  };


  const [trip, setTrip] = useState({
    tittle:"",
    idCountry:0,
    accomodation:"",
    transportation:"",
    eat:"",
    day:"",
    night:"",
    dateTrip:"",
    price:0,
    quota:0,
    descriptions:"",
    image:"",
  }
)
const handleOnChange = (e) => {
  setTrip({
    ...trip,
    [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
  });

  // Create image url for preview
  if (e.target.type === "file") {

    let url = URL.createObjectURL(e.target.files[0]);
    setPreview(url);
  }
};
const handleSubmit = async (e) => {
  try {
    e.preventDefault();

    // Create Configuration Content-type here ...
    // Content-type: multipart/form-data
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(trip)
    // Create store data with FormData as object here ...
    const formData = new FormData();
    formData.set("tittle", trip.tittle);
    formData.set("accomodation", trip.accomodation);
    formData.set("transportation", trip.transportation);
    formData.set("eat", trip.eat);
    formData.set("day", trip.day);
    formData.set("night", trip.night);
    formData.set("dateTrip", trip.dateTrip);
    formData.set("price", trip.price);
    formData.set("quota", trip.quota);
    formData.set("description", trip.descriptions);
    formData.set("idCountry", trip.country);


    for (let i = 0; i < trip.image.length; i++) {
      formData.append("image", trip.image[i])
    }
    
   
    // Insert product data here ...
    
    const response = await API.post("/trip", formData, config);
    console.log(response)
    history.push(`/home-login`);

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getCountry();
}, []);

    return(
      <>
      <NavbarLogin/>
       <div id="con">
  <h1>Add Trip</h1>
<Form onSubmit={handleSubmit} enctype="multipart/form-data">
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Tittle Trip</Form.Label>
<Form.Control onChange={handleOnChange} name="tittle" type="text" />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicEmail">
  
  <label>Country</label><br/>
  <div class="input-group mb-3">
  <select name="country" class="custom-select" onChange={handleOnChange} id="inputGroupSelect01">
    <option selected disabled >Choose country</option>
    {country.map((item, index) => (
    <option value={item.id} onClick={handleChangeIdCountry}>{item.name}</option>
    ))}
    </select>
</div>
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Accomodation</Form.Label>
<Form.Control onChange={handleOnChange} name="accomodation" type="text" />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Transportation</Form.Label>
<Form.Control onChange={handleOnChange} name="transportation" type="text" />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Eat</Form.Label>
<Form.Control onChange={handleOnChange} name="eat" type="text" />
</Form.Group>
<Row>
<Col>
<Form.Label  >Day</Form.Label>
<Form.Control onChange={handleOnChange} name="day" type="number" />
</Col>
<Col>
<Form.Label>Night</Form.Label>
<Form.Control onChange={handleOnChange} name="night" type="number" />
</Col>
</Row>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Date Trip</Form.Label>
<Form.Control onChange={handleOnChange} name="dateTrip" type="date" />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Quota</Form.Label>
<Form.Control onChange={handleOnChange} name="quota" type="number"  />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Price</Form.Label>
<Form.Control onChange={handleOnChange} name="price" type="number"  />
</Form.Group>
<Form.Label>Descriptions</Form.Label>
<FloatingLabel controlId="floatingTextarea2">
<Form.Control onChange={handleOnChange}
name="descriptions"
as="textarea"
placeholder="Leave a comment here"
style={{ height: '100px' }}
/>
</FloatingLabel>
{preview && (
<div id="prev">
<img src={preview}
    style={{
    maxWidth: "150px",
    maxHeight: "150px",
    objectFit: "cover",
    }}
    alt="preview"/>
</div>
)}
<input type="file" id="upload" name="image" multiple hidden onChange={handleOnChange} />
<label id="upload" for="upload" className="label-file-add-product" ><span>Upload file</span></label>
<br/>
<button id="btn-addTrip" variant="warning" type="submit">
Add Trip
</button>
</Form>

</div>
<Footer/>
      </>
     
     
    
    )
}
export default Add