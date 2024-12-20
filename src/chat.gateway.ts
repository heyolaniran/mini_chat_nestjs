import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: 'http://127.0.0.1:5500',
        credentials: true
    }
})
export class ChatGateway implements OnModuleInit, OnModuleDestroy {

    @WebSocketServer()
    server : Server

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log("Connected to ", socket.id)
        })
    }

    onModuleDestroy() {
        this.server.on('disconnect', () => {
            console.log("Disconnected from the gateway")
        })
    }


    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string) : void {
        this.server.emit('message', message); 
    }

}