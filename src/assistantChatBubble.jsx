import React from "react";

const AssistantChatBubble = ({ message }) => {
  const bulletPoints = message.split("\n").map((item) => item.trim());
  return (
    <div className="flex flex-col justify-center items-start whitespace-pre-wrap">
      <p className="font-bold">Summary Sage</p>
      <p className="text-left list-disc pl-0">
        {bulletPoints.slice(1).map((point, index) => (
          <p key={index}>{point}</p>
        ))}
      </p>
    </div>
  );
};

export default AssistantChatBubble;
