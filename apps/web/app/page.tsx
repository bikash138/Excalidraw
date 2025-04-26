'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const [roomId, setRoomId] = useState("")
  const router = useRouter();

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
      height: "100vh",
      width: "100vw"
    }}>
      <input style={{padding: 10}} 
       value={roomId} onChange={(e)=>{setRoomId(e.target.value)}}
       placeholder="Enter Room Id"
       type="text"
      />
      <button style={{padding: 10}}
      onClick={()=>{
        router.push(`/room/${roomId}`)
      }}>
        Join Room</button>
    </div>
  );
}
