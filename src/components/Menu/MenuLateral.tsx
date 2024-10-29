import React from "react";
import { Layout, Menu, theme } from "antd";
import { Route, Routes, Link } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Colaboradores from "../../pages/Employees/Employees"; 

const { Header, Content, Footer, Sider } = Layout;

const items = [
  { key: "1", icon: <UserOutlined />, label: <Link to="/">Home</Link> },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: <Link to="/colaboradores">Colaboradores</Link>,
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: <Link to="/upload">Upload</Link>,
  },
];

export const MenuLateral: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0" style={{ minHeight: "100vh" }}>
        <div className="demo-logo-vertical">{/* logomarca */}</div>
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "24px 16px 0", height: "100%" }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 134px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<h1>Home </h1>} />
              <Route path="/colaboradores" element={<Colaboradores />} />
              <Route path="/upload" element={<h1>Upload Page</h1>} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Wilkson Flor © - {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
