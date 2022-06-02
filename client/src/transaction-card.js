
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { API } from './config/api';
function TransactionCard({props}){
        const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const form = {
        status:"approve",
      }
      const formCancel = {
        status:"Canceled",
      }

const [btn,setbtn]= useState()
const getbtn = async (e) => {
    setbtn(1)
  };
  const getbtn1 = async (e) => {
    setbtn(0)
  };
console.log(btn)
const onSubmit =async (e) => {
    e.preventDefault();
    if (btn == 1) {
        console.log("aprove")
        const config ={
            headers:{
              "Content-type": "application/json",
            },
          };
          console.log(form)
          const update = await API.put(`/transactionn/${props.id}`,form, config);
          console.log(update)
    }
    if (btn == 0) {
        console.log("cancel")
        const config ={
            headers:{
              "Content-type": "application/json",
            },
          };
    
          const update = await API.put(`/transactionn/${props.id}`,formCancel, config);
          console.log(update)
   
    }

  };

  if(JSON.stringify(props.attachment)=='null'){
    return(
        <>
        <tr>
        <th scope="row">1</th>
        <td>{props.fullName}</td>
        <td>{props.trip.tittle}</td>
        <td><img style={{width:100,height:100}} src=""></img></td>
        <td>{props.status}</td>
        <td><img onClick={handleShow} src={require('./components/assets/Vector.png').default} /></td>
        </tr>
        
<Modal class="modal-dialog modal-xl" style={{overflow:'auto'}} show={show} onHide={handleClose}>
<form onSubmit={onSubmit} style={{left: -300,height:600}} id="pay-container">
    
    <div style={{}} id="card">
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
            <h1>{props.trip.tittle}</h1 >
            <p></p>
            </div>
            <div id="date">
                <h3>Date Trip</h3>
                <p>{props.trip.dateTrip}</p>
            </div>
            <div id="duration">
                <h3>Duration</h3>
                <p>{props.trip.day} Day {props.trip.night} Night</p>
            </div>
            <div id="status">
                <span style={{borderRadius:5,backgroundColor:"#EC7A7A",fontWeight:"bold",color:"red",width:60}}>{props.status}</span>
            </div>
            <div>
                <h3>Accomodation</h3>
                <p id="accomodation">{props.trip.accomodation}</p>
            </div>
            <div>
                <h3 >Transporartion</h3>
                <p id="transporartion">{props.trip.transportation}</p>
            </div>
        </div>
        <div id="photo">
                <img style={{width:150,height:150}} src=""></img>
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
<td >{}</td>
<td>{}</td>
<td></td>
</tr>
</tbody>
</table>
<div id= "qty">
<div id="q">
<span style={{fontWeight:"bold"}}>Qty</span><span style={{fontWeight:"bold",marginLeft:70}}>:</span><span style={{fontWeight:"bold",marginLeft:10}}>{props.counterQty}</span>
</div>
<div id="tot">
<span style={{fontWeight:"bold"}}>Total</span><span style={{fontWeight:"bold",marginLeft:60}}>:</span><span style={{fontWeight:"bold",marginLeft:10,color:"red"}}>Rp.{props.total}</span>
</div>

</div>
    </div>
   
    </div>
    <div style={{marginTop:70,marginLeft:700}}>
    <button style={{color:"white",backgroundColor:"#FF0742",borderRadius:5}} name='btn' type="submit" onClick={getbtn1} value='cancel'>Cancel</button>
    <button  name="btn" style={{color:"white",marginLeft:20,backgroundColor:"#0ACF83",borderRadius:5}} type='submit' onClick={getbtn} value='approve'>Aprove</button>
    </div>
    
    

</form>
</Modal>
        </>
)
  }else{
      
        return(
                <>
                <tr>
                <th scope="row">1</th>
                <td>{props.fullName}</td>
                <td>{props.trip.tittle}</td>
                <td><img style={{width:100,height:100}} src={require(`../../server/uploads/${props.attachment}`).default}></img></td>
                <td>{props.status}</td>
                <td><img onClick={handleShow} src={require('./components/assets/Vector.png').default} /></td>
                </tr>
                
        <Modal class="modal-dialog modal-xl" style={{overflow:'auto'}} show={show} onHide={handleClose}>
        <form onSubmit={onSubmit} style={{left: -300,height:600}} id="pay-container">
            
            <div style={{}} id="card">
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
                    <h1>{props.trip.tittle}</h1 >
                    <p></p>
                    </div>
                    <div id="date">
                        <h3>Date Trip</h3>
                        <p>{props.trip.dateTrip}</p>
                    </div>
                    <div id="duration">
                        <h3>Duration</h3>
                        <p>{props.trip.day} Day {props.trip.night} Night</p>
                    </div>
                    <div id="status">
                        <span style={{borderRadius:5,backgroundColor:"#EC7A7A",fontWeight:"bold",color:"red",width:60}}>{props.status}</span>
                    </div>
                    <div>
                        <h3>Accomodation</h3>
                        <p id="accomodation">{props.trip.accomodation}</p>
                    </div>
                    <div>
                        <h3 >Transporartion</h3>
                        <p id="transporartion">{props.trip.transportation}</p>
                    </div>
                </div>
                <div id="photo">
                        <img style={{width:150,height:150}} src={require(`../../server/uploads/${props.attachment}`).default}></img>
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
      <td >{}</td>
      <td>{}</td>
      <td></td>
    </tr>
  </tbody>
</table>
<div id= "qty">
    <div id="q">
    <span style={{fontWeight:"bold"}}>Qty</span><span style={{fontWeight:"bold",marginLeft:70}}>:</span><span style={{fontWeight:"bold",marginLeft:10}}>{props.counterQty}</span>
    </div>
    <div id="tot">
    <span style={{fontWeight:"bold"}}>Total</span><span style={{fontWeight:"bold",marginLeft:60}}>:</span><span style={{fontWeight:"bold",marginLeft:10,color:"red"}}>Rp.{props.total}</span>
    </div>
   
</div>
            </div>
           
            </div>
            <div style={{marginTop:70,marginLeft:700}}>
            <button style={{color:"white",backgroundColor:"#FF0742",borderRadius:5}} name='btn' type="submit" onClick={getbtn1} value='cancel'>Cancel</button>
            <button  name="btn" style={{color:"white",marginLeft:20,backgroundColor:"#0ACF83",borderRadius:5}} type='submit' onClick={getbtn} value='approve'>Aprove</button>
            </div>
            
            

        </form>
        </Modal>
                </>
        )
}
}
export default TransactionCard