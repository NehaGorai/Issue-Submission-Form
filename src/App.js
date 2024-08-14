import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageText = `
    *Error Sending Form*
    *Name:* ${name}
    *Phone:* ${phone}
    *Email:* ${email}
    *Issue:* ${message}
  `;
    const telegramToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.REACT_APP_CHAT_ID;

    try {
      await axios.post(`https://api.lowcodeapi.com/telegram/bot-token/sendmessage?api_token=${telegramToken}`, {
        chat_id: chatId,
        text: messageText,
        parse_mode: 'Markdown'
      });
      setStatus('Sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Failed to send message.');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1520364729339-dcee97a284ff?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-30 p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-center text-cyan-950 mb-4">Error Submission Form</h1>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              placeholder='Full Name'
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b-[1px] placeholder:text-cyan-800 border-cyan-900 bg-transparent focus:border-cyan-900 p-2 outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder='Contact Number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-b-[1px] placeholder:text-cyan-800 border-cyan-900 bg-transparent focus:border-cyan-900 p-2 outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-[1px] placeholder:text-cyan-800 border-cyan-900 bg-transparent focus:border-cyan-900 p-2 outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              value={message}
              placeholder='Send error message.....'
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full border-b-[1px] border-cyan-900 bg-transparent focus:border-cyan-900 placeholder:text-cyan-800 p-2 outline-none"
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-cyan-900 text-white py-2 rounded hover:bg-cyan-800 transition">Send</button>
          {status && <p className="mt-4 text-center text-white py-2  bg-green-500">{status}</p>}
        </form>
      </div>
    </div>
  );
}

export default App;
