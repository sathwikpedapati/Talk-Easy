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
    <div className="h-screen w-full" style={{ backgroundColor: bgColor }}>
      <div
        className="backdrop-blur-xl rounded-2xl h-full grid"
        style={{
          backgroundColor: darkMode ? "#2c2c44" : "white",
        }}
      >
        {/* Sidebar: Always visible on desktop, toggleable on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Chat container: Full width on mobile, center on desktop */}
        <div
          className={`${
            selectedUser ? "col-span-1 md:col-span-1" : "col-span-2 md:col-span-1"
          }`}
        >
          <ChatContainer />
        </div>

        {/* Right sidebar: Only shows if a user is selected & on desktop */}
        {selectedUser && (
          <div className="hidden md:block">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
