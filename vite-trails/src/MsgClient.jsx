import React, { useState, useEffect } from "react";

function Messaging(){
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [socket,setSocket]=useState(null);
useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081');
    setSocket(ws);

    ws.onopen = () => {
        console.log('WebSocket connection established');
    };

    ws.onmessage = async (event) => {
        const data = typeof event.data === 'string' ? event.data : await blobToString(event.data);

        setMessages(prevMessages => [...prevMessages, data]);
    };

    return () => {
        ws.close();
    };
}, []);

const blobToString = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(blob);
    });
};
const handleSendMessage = () => {
    if (input.trim() !== '' && socket) {
        socket.send(input);
        setInput(''); // Clear the input field after sending
    }
};

// Add a button to send the message
return (
<div>
    <h1>Chat App</h1>
    <div style={{ padding: '10px', margin: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
        {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
        ))}
    </div>
    <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Type your message here..." 
    />
    <button onClick={handleSendMessage}>Send</button>
</div>
);
}
export default Messaging;