import React from "react";

const UserChatBubble = ({ message }) => {
  return (
    <div className="flex flex-col jusity-center items-end">
      <p className="font-bold">Me</p>
      <p className="text-justify text-wrap">{message}</p>
    </div>
  );
};

export default UserChatBubble;
