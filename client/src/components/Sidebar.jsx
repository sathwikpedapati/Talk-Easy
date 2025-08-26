import React, { useEffect, useState, useContext } from "react";
import { Avatar, Input, Dropdown, Menu, Badge, Card, Typography } from "antd";
import { EllipsisOutlined, SearchOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons"; // Changed Bulb to Sun
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { ThemeContext } from "../../context/ThemeContext";

const { Text } = Typography;

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } =
    useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext); 
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase()))
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers, getUsers]);

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        Edit Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const bgColor = darkMode ? "#1e1e2f" : "white";
  const textColor = darkMode ? "#f0f0f0" : "black";
  const cardBg = darkMode ? "#2c2c44" : "white";
  const borderColor = darkMode ? "#444" : "#f0f0f0";

  return (
    <div
      style={{ backgroundColor: bgColor, color: textColor ,border:"1px solid #ccc"}}
      className={`h-full p-4 overflow-y-auto ${selectedUser ? "hidden md:block" : "block"}`}
    >
      <div className="flex justify-between items-center mb-4">
        <Text strong style={{ color: textColor, fontSize: "2rem", fontFamily: "sans-serif" ,textAlign:"center"}}>
          TalkEasy
        </Text>
        <span
          onClick={toggleTheme}
          className="cursor-pointer text-xl select-none"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            <MoonOutlined style={{ fontSize: "24px", color: textColor }} />
          ) : (
            <SunOutlined style={{ fontSize: "24px", color: textColor }} />
          )}
        </span>

        <Dropdown overlay={menu} trigger={["click"]}>
          <EllipsisOutlined className="text-xl cursor-pointer" />
        </Dropdown>
      </div>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search User..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mb-4"
        style={{
          backgroundColor: darkMode ? "#2c2c44" : "white",
          color: textColor,
          borderColor: darkMode ? "#444" : "#d9d9d9",
        }}
      />
      <div className="flex flex-col gap-1">
        {filteredUsers.map((user) => (
          <Card
            key={user._id}
            hoverable
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            style={{
              backgroundColor:
                selectedUser?._id === user._id
                  ? darkMode
                    ? "#3a3a5a"
                    : "#e6f7ff"
                  : cardBg,
              borderColor: selectedUser?._id === user._id ? "#1890ff" : borderColor,
              color: textColor,
            }}
            bodyStyle={{ padding: "8px 12px" }}
          >
            <div className="flex items-center gap-0.5">
              <Avatar src={user?.profilePic || assets.avatar_icon} />
              <div className="flex-1 flex flex-col">
                <Text style={{ color: textColor, fontWeight: 500 }}>{user.fullName}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {onlineUsers.includes(user._id) ? <Text type="success">Online</Text> : "Offline"}
                </Text>
              </div>
              {unseenMessages[user._id] > 0 && (
                <Badge count={unseenMessages[user._id]} style={{ backgroundColor: "#722ed1" }} />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
