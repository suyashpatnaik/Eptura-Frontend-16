import React from "react";

function ChatBubble({ message }) {
  return (
    <div>
      <div>{message.text}</div>
      {message.image && (
        <img
          src={`/assets/img/${message.image}`}
          alt={message.imageAlt || "Image" || "image" || "IMAGE" || "images" || "Images" || "IMAGES"}
          className="rounded-xl max-w-full mt-2"
        />
      )}
    </div>
  );
}

export default ChatBubble;