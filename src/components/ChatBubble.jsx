import React from "react";

function ChatBubble({ messages }) {
  return (
    <div className="chat-history">
      {messages.map((msg, index) => (
        <div
          key={index}
          className="message-bubble p-3 mb-2 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md max-w-lg"
        >
          {/* Display text (if any) */}
          {msg.text && (
            <p className="text-base text-gray-900 dark:text-gray-100 mb-2 whitespace-pre-line">
              {msg.text}
            </p>
          )}

          {/* Display image (if exists) */}
          {msg.image && (
            <img
              src={msg.image}
              alt="Generated Visual"
              className="rounded-xl max-w-full h-auto border border-gray-300 dark:border-gray-600"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatBubble;