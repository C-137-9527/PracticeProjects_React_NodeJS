import React from "react";
import {} from "@material-ui/core";

const Message = ({ message, username }) => {
  const isUser = username === message.username;

  return (
    <div className={isUser ? "myMessage" : "friendMessage"}>
      <span>{message.username}:</span>
      <h2>{message.text}</h2>
    </div>
  );
};

export default Message;
