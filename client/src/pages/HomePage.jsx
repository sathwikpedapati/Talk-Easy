import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";
import { ThemeContext } from "../../context/ThemeContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);
  const { darkMode } = useContext(ThemeContext);

  const bgColor = darkMode ? "#1e1e2f" : "#f0f2f5";

  return (
    <div
      className="h-screen w-full"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="backdrop-blur-xl rounded-2xl h-full grid"
        style={{
          gridTemplateColumns: selectedUser ? "1fr 2fr 1fr" : "1fr 2fr",
          backgroundColor: darkMode ? "#2c2c44" : "white",
          gap: 0,
        }}
      >
        <Sidebar />
        <ChatContainer />
        {selectedUser && <RightSidebar />}
      </div>
    </div>
  );
};

export default HomePage;
