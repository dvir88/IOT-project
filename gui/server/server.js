import express from 'express'
import cors from 'cors'
import * as mqtt from 'mqtt'
import { WebSocketServer} from "ws";

const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const server = new WebSocketServer({port:8080})

app.listen(5001,() => {
    const client = mqtt.connect("mqtt://enter-your-local-ip-address-here:7001")

    client.on('connect',() => {
        console.log("connected")
        client.subscribe("Time");
        client.subscribe("Weather")
        console.log(client.connected)

    }).on('message',(topic,message) => {
        console.log('message has arrived',message.toString())
        server.on('connection', ws => {
            const data = {
                Topic:topic,
                message:message.toString()
            }
            ws.send(JSON.stringify(data))
        })

    })

})