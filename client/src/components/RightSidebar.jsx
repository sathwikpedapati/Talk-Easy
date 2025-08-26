import React, { useEffect, useState, useContext } from "react";
import { Avatar, Divider, Image, Button, Badge, Card } from "antd";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { onlineUsers } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    const images = messages.filter(msg => msg.image).map(msg => msg.image);
    setMsgImages(images);
  }, [messages]);

  if (!selectedUser) return null;

  const bgColor = darkMode ? "#1e1e2f" : "white";
  const textColor = darkMode ? "#f0f0f0" : "black";

  return (
   <div
  style={{ 
    backgroundColor: bgColor, 
    color: textColor, 
    border: `1px solid #ccc`
  }}
  className="hidden md:block h-full p-5 overflow-y-auto"
>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h1 style={{ marginTop: 10, fontSize: 18, color: textColor }}>
          {onlineUsers.includes(selectedUser._id) && <Badge status="success" />}
        </h1>
      </div>

      <Divider style={{ borderColor: "#ccc", color:"green"}}>Media</Divider>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, maxHeight: 208, overflowY: "auto" }}>
        {msgImages.map((url, idx) => (
          <Image key={idx} src={url} style={{ borderRadius: 8, cursor: "pointer" }} />
        ))}
      </div>


    </div>
  );
};

export default RightSidebar;
