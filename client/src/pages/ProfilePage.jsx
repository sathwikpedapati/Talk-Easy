import React, { useState, useContext } from "react";
import { Form, Input, Button, Upload, Typography, Row, Col, Avatar, Card } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import assets from "../assets/assets";

const { TextArea } = Input;
const { Title, Text } = Typography;

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = { fullName: name, bio };
    if (selectedImg) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload = async () => {
        payload.profilePic = reader.result;
        await updateProfile(payload);
        navigate("/");
      };
      return;
    }
    await updateProfile(payload);
    navigate("/");
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      backgroundColor: darkMode ? "#1e1e2f" : "#f0f2f5",
    },
    card: {
      width: "100%",
      maxWidth: 720,
      borderRadius: 16,
      backgroundColor: darkMode ? "#2c2c44" : "#fff",
      boxShadow: darkMode
        ? "0 0 15px rgba(255,255,255,0.05)"
        : "0 10px 20px rgba(0,0,0,0.1)",
    },
    input: {
      backgroundColor: darkMode ? "#1c1c1c" : "#fff",
      color: darkMode ? "#f0f0f0" : "#000",
      borderColor: darkMode ? "#444" : "#d9d9d9",
    },
    button: {
      borderRadius: 8,
      fontWeight: 500,
      backgroundColor: darkMode ? "#fff" : "#000",
      color: darkMode ? "#000" : "#fff",
      border: "none",
    },
    text: {
      color: darkMode ? "#f0f0f0" : "#000",
    },
    avatar: {
      border: `3px solid ${darkMode ? "#fff" : "#000"}`,
      boxShadow: darkMode
        ? "0 0 15px rgba(255,255,255,0.3)"
        : "0 0 15px rgba(0,0,0,0.3)",
    },
  };

  return (
    <div style={styles.container}>
      <Card bordered={false} style={styles.card}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={14}>
            <Form layout="vertical" onSubmitCapture={handleSubmit}>
              <Title level={4} style={styles.text}>
                Update Profile
              </Title>

              <Form.Item label={<Text style={styles.text}>Profile Image</Text>}>
                <Upload
                  beforeUpload={(file) => {
                    setSelectedImg(file);
                    return false;
                  }}
                  showUploadList={false}
                  accept=".png,.jpg,.jpeg"
                >
                  <Button icon={<UploadOutlined />} type="dashed">
                    Upload Image
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item label={<Text style={styles.text}>Full Name</Text>} required>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  allowClear
                  style={styles.input}
                />
              </Form.Item>

              <Form.Item label={<Text style={styles.text}>Bio</Text>} required>
                <TextArea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write something about yourself"
                  allowClear
                  style={styles.input}
                />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" type="primary" block style={styles.button}>
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} md={10} style={{ textAlign: "center" }}>
            <Avatar
              size={160}
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : authUser?.profilePic || assets.logo_icon
              }
              icon={<UserOutlined />}
              style={styles.avatar}
            />
            <Text style={{ display: "block", marginTop: 12, ...styles.text }}>
              Profile Preview
            </Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProfilePage;
