import {Col, Container, Row} from "react-bootstrap";
import ControlCard from "./ControlCard";
import {useEffect, useState} from "react";

const ControlePanel = (props) => {
    const [time,setTime] = useState('');
    const [weather,setWeather] = useState('');
     const {client} = props

     client.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        const {Topic:topic,message} = data
        SetData(topic,message);
     })

    function SetData(topic,message) {
        switch (topic) {

            case 'Time':
                const date = new Date(message)
                const hours = new Date();
                hours.setHours(date.getHours(),date.getMinutes(),date.getSeconds())
                setTime(hours.toLocaleTimeString())
                break;

            case 'Weather':
                setWeather(message)
                break;

            default:
                break;
        }
    }

    useEffect(() => {

    },[time,weather])

    return(
        <div className='control-panel'>
        <Container fluid style={{backgroundColor:"white",height:"70%",width:"50%",borderRadius:"10px",display:'flex'}}>

                <Col style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <Row style={{height:'100%',flex:1}}>

                    </Row>
                    <Row style={{height:'100%',flex:1}}>
                        <ControlCard title={"AC"} data={weather}></ControlCard>
                    </Row>
                    <Row style={{height:'100%',flex:1}}>

                    </Row>
                </Col>

                <Col style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <Row style={{height:'100%',flex:1}}>
                        <p style={{fontSize:"20px",fontWeight:"500"}}>Control panel</p>
                        <p>Time is {time}</p>
                        <p>Temperature is {weather} c</p>
                    </Row>
                    <Row style={{height:'100%',flex:1}}>
                      <ControlCard title={"Blinds"} data={time}></ControlCard>
                    </Row>
                    <Row style={{height:'100%',flex:1}}>
                    </Row>
                </Col>

                <Col style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <Row style={{height:'100%',flex:1}}>

                    </Row>
                    <Row style={{height:'100%',flex:1}}>
                        <ControlCard title={"Lights"} data={time}></ControlCard>
                    </Row>
                    <Row style={{height:'100%',flex:1}}>

                    </Row>
                </Col>

        </Container>
        </div>
    );
}
export default ControlePanel
