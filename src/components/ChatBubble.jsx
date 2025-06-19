import React from "react";

export default function ChatBubble({ message }) {
  return (
    <div className={`bubble ${message.sender}`}>
      <div>{message.text}</div>
      {message.image && (
        <img
          src={`/assets/img/${message.image}`}
          alt={message.imageAlt || "Image"}
          className="rounded-xl max-w-full mt-2"
        />
      )}
    </div>
  );
}