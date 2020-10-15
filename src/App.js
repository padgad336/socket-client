import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

class App extends Component {
  constructor() {
    super()

    this.state = {
      input: {},
      message: [],
      endpoint: "http://10.38.194.50:9000" // เชื่อมต่อไปยัง url ของ realtime server
    }
  }

  componentDidMount = () => {
    this.response()
  }

  // เมื่อมีการส่งข้อมูลไปยัง server
  send = (message) => {
    const { endpoint, input } = this.state
    const socket = socketIOClient(endpoint)
    socket.emit('sent-message', input)
    // this.setState({ input: {} })
  }

  // รอรับข้อมูลเมื่อ server มีการ update
  response = () => {
    const { endpoint, message } = this.state
    const temp = message
    const socket = socketIOClient(endpoint)
    socket.on('new-message', (messageNew) => {
      console.log(messageNew)
      console.log(message)
      // console.log({ message:temp?.map(()=>({}))})
      temp.push(messageNew)
      console.log(temp)
      this.setState({ message:temp})
    })
  }

  changeInput = (e) => {
    // console.log('e',e.target.value)
    const edata=e.target?.value
    const msg=data.filter((item)=>item?.i===edata)
console.log('d',edata,msg[0])
    this.setState({ input: msg[0]||{} })
  }

  render() {
    const {  message } = this.state
    // console.log(message)
    return (
      <div>
        <div style={style}>
        <label htmlFor="cars">Choose an alarm  test:</label>
  <select onChange={this.changeInput} name="cars" id="cars">
  <option key={0} value={0}></option>
    {data?.map((item)=> <option key={item?.i} value={item?.i}>mac:{item?.macaddress} msg:{item?.message?.msg}</option>)}
  
  </select>
          <button onClick={() => this.send()}>Send</button>
        </div>
        {
          message.map((data, i) =>
            <div key={i} style={style} >
              {i + 1} : {data?.macaddress} msg:{data?.message?.msg}
            </div>
          )
        }
      </div>
    )
  }
}

const style = { marginTop: 20, paddingLeft: 50 }
const data =[
  {i:1,macaddress:"fcf5c4a80ac",message:{type:"response",msg:"connected",time:1596793279812}},
{i:2,macaddress:"fcf5c4a80ac",message:{type:"response",msg:"disconnected",time:1596793270521}},
{i:3,macaddress:"fcf5c4a80ac",message:{type:"response",msg:"command ok",time:1596793238750}},
{i:4,macaddress:"fcf5c4a80ac",message:{type:"response",index:3,msg:"normal",time:1596793247978}},
{i:5,macaddress:"fcf5c4a80ac",message:{type:"response",index:3,msg:"alarm",time:1596793308085}},
{i:6,macaddress:"fcf5c4a80ac",message:{type:"response",msg:"disalarm.",time:1596793296620}},
{i:7,macaddress:"fcf5c4a80ac",message:{type:"response",index:3,msg:"normal",time:1596793291798}},
{i:8,macaddress:"fcf5c4a80ac",message:{type:"response",msg:"door and windows and motions on.",time:1596793313611}},
{i:9,macaddress:"fcf5c4a80ac",message:{type:"response",msg:"door and windows on.",time:1596793317106}}
]
export default App