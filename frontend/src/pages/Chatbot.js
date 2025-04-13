import React, { useState, useEffect, useRef } from "react";
import { GetMessage } from "../api"; // Adjust path to your API utility

const Chatbot = () => {
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

  // Send message function
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
      // Build conversation context
      const conversation =
        messages
          .filter((msg) => msg.text.trim()) // Exclude empty messages
          .map(
            (msg) =>
              `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`
          )
          .join("\n") + `\nUser: ${message}\nAssistant:`;
      const response = await GetMessage(conversation);
      console.log(response);
      setMessages((prev) => [
        ...prev,
        {
          text: response.data.reply || "⚠ No response from AI.",
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
          text: "Sorry, something went wrong. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key (prevent Shift+Enter)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Chat with AI 🤖
      </h2>

      {/* Chat Box */}
      <div
        ref={chatBoxRef}
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "15px",
          backgroundColor: "#f9f9f9",
          marginBottom: "15px",
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{ textAlign: "center", color: "#888", paddingTop: "20px" }}
          >
            Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={`${msg.timestamp || index}-${msg.sender}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                margin: "8px 0",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "10px 15px",
                  borderRadius: "12px",
                  backgroundColor:
                    msg.sender === "user" ? "#007bff" : "#e0e0e0",
                  color: msg.sender === "user" ? "#fff" : "#333",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <span>{msg.text}</span>
                {msg.timestamp && (
                  <div
                    style={{
                      fontSize: "0.75em",
                      opacity: 0.7,
                      marginTop: "5px",
                    }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            color: "#d32f2f",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          {error}
        </div>
      )}

      {/* Input Area */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            fontSize: "16px",
            outline: "none",
            backgroundColor: isLoading ? "#f5f5f5" : "#fff",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          style={{
            padding: "12px 24px",
            backgroundColor: isLoading ? "#cccccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontSize: "16px",
            transition: "background-color 0.2s",
          }}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
