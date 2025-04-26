import { useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

export default function ChatRoomClient(
    {messages,id}: {
        messages:{message:string}[];
        id:string
    }
){
    const {socket, loading} = useSocket()

    useEffect(()=>{
        if(socket && !loading){
            socket.onmessage = 
        }
    },[socket, loading])
} 