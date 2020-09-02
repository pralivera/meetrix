import React, { Component } from "react";
import ms from 'pretty-ms';


class Timer extends Component {

    constructor(props){
      super(props)
      this.state = {
        timer1_time: 0,
        timer2_time: 0,
        timer3_time: 0,
        timer1_isOn: false,
        timer2_isOn: false,
        timer3_isOn: false,
        timer1_start: 0,
        timer2_start: 0,
        timer3_start: 0,
        username:''
      }    
      this.startTimer = this.startTimer.bind(this)
      this.stopTimer = this.stopTimer.bind(this)
      this.resetTimer = this.resetTimer.bind(this)
    }
  
    componentDidMount(){
      //alert(this.props.location.search);
     let tokenString = this.props.location.search;
     let params = new URLSearchParams(tokenString);
     let jwt = params.get('jwt');
     if(jwt != null)  
      this.verifyToken(jwt);
  
    }
  
    verifyToken(jwt){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: jwt })
        };

        fetch('http://localhost:5000/api/validatetoken', requestOptions)
        .then(
            response => response.json()
            )
        .then(data =>  
            this.setState({username : data.username})
            ).catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    
     
    }
  
    startTimer(timer) {
      if(timer == "t1"){
      this.setState({
        timer1_isOn: true,
        timer1_time: this.state.timer1_time,
        timer1_start: Date.now() - this.state.timer1_time
      })
      this.timer1 = setInterval(() => this.setState({
        timer1_time: Date.now() - this.state.timer1_start
      }), 10000);
    } else if(timer == "t2"){
      this.setState({
        timer2_isOn: true,
        timer2_time: this.state.timer2_time,
        timer2_start: Date.now() - this.state.timer2_time
      })
      this.timer2 = setInterval(() => this.setState({
        timer2_time: Date.now() - this.state.timer2_start
      }), 1000);
    } else {
      this.setState({
        timer3_isOn: true,
        timer3_time: this.state.timer3_time,
        timer3_start: Date.now() - this.state.timer3_time
      })
      this.timer3 = setInterval(() => this.setState({
        timer3_time: Date.now() - this.state.timer3_start
      }), 100);
    } 
    }  
    
    stopTimer(timer) {
      if(timer == "t1"){
      this.setState({timer1_isOn: false})
      clearInterval(this.timer1)
      } else if(timer == "t2"){
        this.setState({timer2_isOn: false})
        clearInterval(this.timer2)
      } else {
        this.setState({timer3_isOn: false})
        clearInterval(this.timer3)
      }
    }  
    
    resetTimer(timer) {
      if(timer == "t1"){
        this.setState({timer1_time: 0, timer1_isOn: false})
        } else if(timer == "t2"){
          this.setState({timer2_time: 0, timer2_isOn: false})
        } else {
          this.setState({timer3_time: 0, timer3_isOn: false})
        }
  
    }
  
    render() {
      let start1 = (this.state.timer1_time == 0) ?
      <button onClick={() => this.startTimer("t1")}>Play</button> :
      null    
      let stop1 = (this.state.timer1_time == 0 || !this.state.timer1_isOn) ?
      null :
      <button onClick={ () => this.stopTimer("t1")}>stop</button>    
      let resume1 = (this.state.timer1_time == 0 || this.state.timer1_isOn) ?
      null :
      <button onClick={ () => this.startTimer("t1")}>resume</button>    
      let reset1 = (this.state.timer1_time == 0 || this.state.timer1_isOn) ?
      null :
      <button onClick={ () =>this.resetTimer("t1")}>reset</button>   
      
      let start3 = (this.state.timer3_time == 0) ?
      <button onClick={() => this.startTimer("t3")}>Play</button> :
      null    
      let stop3 = (this.state.timer3_time == 0 || !this.state.timer3_isOn) ?
      null :
      <button onClick={ () => this.stopTimer("t3")}>stop</button>    
      let resume3 = (this.state.timer3_time == 0 || this.state.timer3_isOn) ?
      null :
      <button onClick={ () => this.startTimer("t3")}>resume</button>    
      let reset3 = (this.state.timer3_time == 0 || this.state.timer3_isOn) ?
      null :
      <button onClick={ () =>this.resetTimer("t3")}>reset</button>  
  
      let start2 = (this.state.timer2_time == 0) ?
      <button onClick={() => this.startTimer("t2")}>Play</button> :
      null    
      let stop2 = (this.state.timer2_time == 0 || !this.state.timer2_isOn) ?
      null :
      <button onClick={ () => this.stopTimer("t2")}>stop</button>    
      let resume2 = (this.state.timer2_time == 0 || this.state.timer2_isOn) ?
      null :
      <button onClick={ () => this.startTimer("t2")}>resume</button>    
      let reset2 = (this.state.timer2_time == 0 || this.state.timer2_isOn) ?
      null :
      <button onClick={ () =>this.resetTimer("t2")}>reset</button>  
      return(
      <div>
        <div style={{ width: "50%", float: "left"}}>
        <div style={{border:"1px solid black", width: "200px", height: "150px",  margin: "0 auto"}}>
            <h2>Total Timer</h2>
            <h2>{ms(this.state.timer1_time + this.state.timer2_time + this.state.timer3_time) }</h2>
  
            <br/>
          </div>
        </div>
        <div style={{ width: "50%", float: "right"}}>
          <div style={{border:"1px solid black", width: "100px", height: "150px"}}>
            <h3>Timer 1</h3>
            <h3>{ms(this.state.timer1_time)}</h3>
            {start1}
            {resume1}
            {stop1}
            {reset1}
            <br/>
          </div>
          <br/>
          <div style={{border:"1px solid black", width: "100px", height: "150px"}}>
            <h3>Timer 2</h3>
            <h3>{ms(this.state.timer2_time)}</h3>
            {start2}
            {resume2}
            {stop2}
            {reset2}
            <br/>
          </div>
          <br/>
          <div style={{border:"1px solid black", width: "100px", height: "150px"}}>
            <h3>Timer 3</h3>
            <h3>{ms(this.state.timer3_time)}</h3>
            {start3}
            {resume3}
            {stop3}
            {reset3}
            <br/>
          </div>
          <br/>
        </div>
  
      </div>
    )
    }
  }
  
  export default Timer;
  