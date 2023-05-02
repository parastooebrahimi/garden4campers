import React, { useState } from "react";
import { Menu, Layout, Modal, Form, Input, Button, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  useUsers,
  useCurrentUser,
  useSetCurrentUser,
} from "../../utiles/useUserStore";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

const MenuHeader: React.FC = () => {
  const [loginVisible, setLoginVisible] = useState<boolean>(false);
  const users = useUsers();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const location = useLocation();

  const [form] = Form.useForm();

  const handleLogin = () => {
    setLoginVisible(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const { username, password } = values;
      console.log("user and password", username, password);
      console.log("all users", users);
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );
      if (foundUser) {
        console.log("found user", foundUser);
        setCurrentUser(foundUser);
        setLoginVisible(false);
        console.log("Login successful");
      } else {
        console.log("Invalid username or password");
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setLoginVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const greetingMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const greeting =
    currentUser && currentUser.username ? (
      <Dropdown overlay={greetingMenu} trigger={["click"]}>
        <span>
          <span style={{ marginRight: "8px" }}>
            <UserOutlined />
          </span>
          {currentUser.username}({currentUser.role})
        </span>
      </Dropdown>
    ) : (
      <span onClick={handleLogin}>Login</span>
    );

  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
        <Menu.Item key="/home">
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="/about">About</Menu.Item>
        <Menu.Item key="/contact">Contact</Menu.Item>
        <Menu.Item key="/greeting" style={{ float: "right" }}>
          {greeting}
        </Menu.Item>
      </Menu>
      {loginVisible && (
        <Modal
          title="Login"
          visible={loginVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            name="login-form"
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Header>
  );
};

export default MenuHeader;
