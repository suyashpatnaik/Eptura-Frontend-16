import React, { useState } from 'react';
import ChatBubble from './ChatBubble';

const Main = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const addMessage = (message) => {
    setConversation((prev) => [...prev, message]);
  };

  const handleSend = async (userPrompt) => {
    if (!userPrompt.trim()) return;

    // Add user message to chat
    addMessage({
      text: userPrompt,
      sender: 'user',
    });

    // Decide which API to call
    if (
      userPrompt.toLowerCase().includes('diagram') ||
      userPrompt.toLowerCase().includes('image') ||
      userPrompt.toLowerCase().includes('show')
    ) {
      // Call /api/ask for image
      try {
        const askRes = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: userPrompt }),
        });
        const askData = await askRes.json();

        addMessage({
          text: askData.text,
          image: askData.image,
          imageAlt: askData.imageAlt,
          sender: 'assistant',
        });
      } catch (error) {
        console.error('Error calling /api/ask:', error);
        addMessage({
          text: "Sorry, I couldn't retrieve the diagram right now.",
          sender: 'assistant',
        });
      }
    } else {
      // Call /api/chat for text
      try {
        const chatRes = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userPrompt, conversation }),
        });
        const chatData = await chatRes.json();

        addMessage({
          text: chatData.response,
          sender: 'assistant',
        });
      } catch (error) {
        console.error('Error calling /api/chat:', error);
        addMessage({
          text: "Sorry, I couldn't get a response right now.",
          sender: 'assistant',
        });
      }
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