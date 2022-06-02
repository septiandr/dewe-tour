import React from "react";
import "./index.css";
import Home from "./home";
import HomeLogin from "./home-login";
import Tour from "./detail-tour";
import Profile from "./components/profile"
import Payment from "./payment"
import Add from "./add-trip"
import { API, setAuthToken } from "./config/api";
import { useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Transactions from './transaction'



if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  function App() {
  
    let history = useHistory();
    const [state, dispatch] = useContext(UserContext);
    console.log(state.user.status);
    useEffect(() => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      console.log(state)
      // Redirect Auth
      
    }, [state]);
    const checkUser = async () => {
      try {
        const response = await API.get("/check-auth");
  
        // If the token incorrect
        if (response.status === 404) {
          return dispatch({
            type: "AUTH_ERROR",
          });
        }
  
        // Get user data
        let payload = response.data.data.user;
        // Get token from local storage
        payload.token = localStorage.token;
  
        // Send data to useContext
        dispatch({
          type: "USER_SUCCESS",
          payload,
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      checkUser();
    }, []);
    return (
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path  ="/home-login" component={HomeLogin} />
        <Route path  ="/detail-tour/:id" component={Tour} />
        <Route path  ="/profile" component={Profile} />
        <Route path  ="/payment/:id" component={Payment} />
        <Route path  ="/add-trip" component={Add} />
        <Route path  ="/transactions" component={Transactions} />
        </Switch>
      );
    }
    export default App