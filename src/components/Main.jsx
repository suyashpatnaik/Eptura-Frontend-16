import React, { useState } from 'react';
import ChatBubble from './ChatBubble';

const Main = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  // 👇 backend URL — works on localhost & on Vercel if env is set
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

  const handleSend = async (userPrompt) => {
    if (!userPrompt.trim()) return;

    // Add user message to conversation
    setConversation((prev) => [
      ...prev,
      { text: userPrompt, sender: 'user' },
    ]);

    // 👉 Check if we should call /api/ask
    if (
      userPrompt.toLowerCase().includes('diagram') ||
      userPrompt.toLowerCase().includes('image') ||
      userPrompt.toLowerCase().includes('show')
    ) {
      try {
        const askRes = await fetch(`${backendUrl}/api/ask`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: userPrompt }),
        });
        const askData = await askRes.json();

        setConversation((prev) => [
          ...prev,
          {
            text: askData.text || 'No image available.',
            image: askData.image,
            imageAlt: askData.imageAlt,
            sender: 'assistant',
          },
        ]);
      } catch (error) {
        console.error('Error calling /api/ask:', error);
        setConversation((prev) => [
          ...prev,
          {
            text: "Sorry, I couldn't retrieve the image.",
            sender: 'assistant',
          },
        ]);
      }
    }

    // 👉 Always call /api/chat next
    try {
      const chatRes = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userPrompt }),
      });

      const chatData = await chatRes.json();

      setConversation((prev) => [
        ...prev,
        { text: chatData.response, sender: 'assistant' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setConversation((prev) => [
        ...prev,
        {
          text: "Sorry, I couldn't get a response.",
          sender: 'assistant',
        },
      ]);
    }

    setUserInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(userInput);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Eptura AI Assistant</h1>
      <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', minHeight: '400px' }}>
        {conversation.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: '10px', display: 'flex' }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flexGrow: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '8px',
          }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Main;