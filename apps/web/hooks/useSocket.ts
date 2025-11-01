import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MGZhZjgxZC0zYzJiLTRmMjAtYTMyMS1hZTYzYTIzYmY0YTUiLCJpYXQiOjE3NjE0MDg2ODB9.qpcM2705rmTDfhFOKLBZYK8i18dQWkDOMuo2TQpAChY`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }
}