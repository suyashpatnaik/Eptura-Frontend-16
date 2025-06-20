import React from "react";

function ChatBubble({ message }) {
  return (
    <div>
      <div>{message.text}</div>
      {message.image && (
        <img
          src={message.image}
          alt={message.imageAlt || "AI image"}
          style={{ maxWidth: "300px" }}
        />
      )}
    </div>
  );
}

export default ChatBubble;