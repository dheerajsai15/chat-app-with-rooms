import axios from "axios";
import { BACKEND_URL } from "../app/config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string){
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`)
    return response.data.messages;
}

export async function ChatRoom( { id } : {
    id: string
}){
    console.log(id);
    const messages = await getChats(id);
    return <ChatRoomClient messages={messages} id={id}></ChatRoomClient>
}