import { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";

import UserChatBubble from "./userChatBubble";
import AssistantChatBubble from "./assistantChatBubble";

function App() {
  const [isChatStart, setIsChatStart] = useState(false);
  const [isChatEmpty, setIsChatEmpty] = useState(true);
  const [loadingState, setLoadingState] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [assistantMessage, setAssistantMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const [chatBubbles, setChatBubbles] = useState([]);

  const chatPageRef = useRef(null);
  const chatInputRef = useRef(null);
  const bottomPageRef = useRef(null);

  const startChatbot = async () => {
    setIsChatStart(true);
  };

  const handleSubmitChat = async (event) => {
    if (event.key === "Enter" && chatInputRef.current.value.length > 0) {
      setLoadingState(true);
      const userInput = chatInputRef.current.value;
      setUserMessage(userInput);
      setAllMessages([...allMessages, { sender: "user", message: userInput }]);
      chatInputRef.current.value = "";

      try {
        const res = await axios.post("http://127.0.0.1:8000/summary", {
          text: userInput,
        });
        setAllMessages([
          ...allMessages,
          { sender: "bot", message: res.data[0].content[0].text.value },
        ]);
        setLoadingState(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (allMessages.length === 0) setIsChatEmpty(true);
    else setIsChatEmpty(false);

    allMessages.forEach((bubble, index) => {
      bubble.sender === "user"
        ? setChatBubbles([
            ...chatBubbles,
            <UserChatBubble message={bubble.message} />,
          ])
        : setChatBubbles([
            ...chatBubbles,
            <AssistantChatBubble message={bubble.message} />,
          ]);
    });
  }, [allMessages]);

  useEffect(() => {
    var chats = document.querySelector("#chatBubbles");
    chats?.lastChild?.scrollIntoView({ behavior: "smooth" });
  }, [chatBubbles]);

  return (
    <div>
      {isChatStart ? (
        <div className="flex flex-col h-screen">
          {isChatEmpty ? (
            <div className="flex flex-grow items-center justify-center">
              <p className="font-medium text-2xl">There are no messages.</p>
            </div>
          ) : (
            <div
              id="chatBubbles"
              className="flex flex-col flex-grow my-4 mx-64 px-4 overflow-y-auto gap-2"
            >
              {chatBubbles}
            </div>
          )}
          <div className="flex items-center w-full justify-center mb-4 mt-2">
            <input
              className="w-full rounded-full px-10 py-4 mx-64"
              id="chatInput"
              type="text"
              placeholder="Enter your message..."
              ref={chatInputRef}
              onKeyDown={handleSubmitChat}
            />
          </div>
        </div>
      ) : (
        <div className="font-bold flex flex-col mt-[20%] gap-8 self-center justify-center align-center items-center">
          <p>Hello, I'm Summary Sage!</p>
          <button className="w-min" onClick={() => startChatbot()}>
            Chat
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
