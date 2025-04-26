import React, { useState, useEffect, useRef } from "react";
import { GetMessage } from "../api";
import { useUser } from "../context/UserContext";
import "../css/Chatbot.css"; // We'll create this CSS file

const Chatbot = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatBoxRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    document.title = "SkillSphere | Chatbot";
    // Add welcome message if no messages exist
    if (messages.length === 0) {
      setMessages([
        {
          text: `Hello${
            user?.name ? ` ${user.name}` : ""
          }! I'm your SkillSphere AI assistant. How can I help you today?`,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const sendMessage = async () => {
    const message = userInput.trim();
    if (!message) {
      setError("Please enter a message.");
      return;
    }

    // Add user message
    const userMessage = {
      text: message,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await GetMessage({
        message,
        context: messages.slice(-5), // Send last 5 messages as context
      });

      setMessages((prev) => [
        ...prev,
        {
          text:
            response.data.reply ||
            "I couldn't process that. Could you rephrase?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setError(err.message || "Failed to get response from AI.");
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble responding. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>AI Learning Assistant</h2>
        <div className="chatbot-subtitle">
          Ask me anything about your courses
        </div>
      </div>

      <div ref={chatBoxRef} className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={`${msg.timestamp || index}-${msg.sender}`}
            className={`message ${msg.sender}`}
          >
            <div className="message-bubble">
              <div className="message-text">{msg.text}</div>
              <div className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && <div className="chatbot-error">{error}</div>}

      <div className="chatbot-input-container">
        <input
          type="text"
          placeholder="Type your question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading || !userInput.trim()}>
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
