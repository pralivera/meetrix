import React, { Component } from "react";
import './App.css';
import axios from 'axios';
import Routes from "./Routes";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {      
      username:''
    }    
  
  }

  // componentDidMount(){
  //   //alert(this.props.location.search);
  //  let tokenString = this.props.location.search;
  //  let params = new URLSearchParams(tokenString);
  //  let jwt = params.get('jwt');
  //  if(jwt != null)  
  //   this.verifyToken(jwt);

  // }

  verifyToken(jwt){
    let tokenData = {
      token : jwt
  }
  
    axios.post('http://localhost:5000/api/validatetoken', tokenData)
        .then((response) => {
          this.setState({username : response.username})
        }, (error) => {
          alert('errr : ' + JSON.stringify(error));
        });
  }

  

  render() {
    
    return(
      <Routes />
  )
  }
}

export default App;
