import React, { useContext, useRef, useState, useEffect } from "react";
import { Input, Button, Avatar, Badge, Upload } from "antd";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const { messages, selectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const scrollEnd = useRef();
  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSendImage = async (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
    };
    reader.readAsDataURL(file);
    return false;
  };

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
  }, [selectedUser]);

  useEffect(() => {
    scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: darkMode ? "#aaa" : "#888",
        }}
      >
        <img src={assets.logo_icon} alt="logo" style={{ width: 64, marginBottom: 8 }} />
        <p>Chat any time, anywhere</p>
      </div>
    );

  const bgColor = darkMode ? "#1e1e2f" : "#f9f9f9";
  const inputBg = darkMode ? "#2c2c44" : "white";
  const textColor = darkMode ? "#f0f0f0" : "black";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: bgColor,
        overflow: "hidden",
        border:"1px solid #ccc"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 10,
          backgroundColor: bgColor,
          borderBottom: "1px solid #ccc",
        }}
      >
        <Avatar src={selectedUser.profilePic || assets.avatar_icon} />
        <span style={{ marginLeft: 10, fontWeight: 500, color: textColor }}>
          {selectedUser.fullName}{" "}
          {onlineUsers.includes(selectedUser._id) && <Badge status="success" />}
        </span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: msg.senderId === authUser._id ? "row-reverse" : "row",
              gap: 8,
              marginBottom: 12,
            }}
          >
            {msg.text && (
              <div
                style={{
                  padding: 8,
                  maxWidth: "60%",
                  backgroundColor:
                    msg.senderId === authUser._id ? "#1677ff" : darkMode ? "#444" : "#aaa",
                  color: "white",
                  border: "none",
                  borderRadius: 7,
                }}
              >
                {msg.text}
              </div>
            )}

            {msg.image && (
              <div
                style={{
                  maxWidth: "60%",
                  display: "inline-block",
                  backgroundColor: msg.senderId === authUser._id ? "#1677ff" : darkMode ? "#444" : "#aaa",
                  borderRadius: 7,
                  overflow: "hidden",
                }}
              >
                <img
                  src={msg.image}
                  alt="message"
                  style={{
                    maxWidth: "100%",
                    borderRadius: 7,
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <div style={{ textAlign: "center", fontSize: 10 }}>
              <p style={{ color: darkMode ? "#888" : "#555" }}>
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      <div
        style={{
          display: "flex",
          padding: 12,
          gap: 2,
          borderTop: `1px solid ${darkMode ? "#444" : "#ccc"}`,
          backgroundColor: inputBg,
          width: "100%",
          alignItems: "center",
        }}
      >
       <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSendMessage}
          style={{ backgroundColor: inputBg, color: textColor, border: "1px solid black" }}
        />
         <Upload beforeUpload={handleSendImage} showUploadList={false}>
          <Button icon={<PictureOutlined />} />
        </Upload>
        <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
