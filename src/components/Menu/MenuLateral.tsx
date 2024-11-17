import React, { useState } from "react";
import { Layout, Menu, theme, Button } from "antd";
import { Route, Routes, Link } from "react-router-dom";
import {
  UploadOutlined,
  VideoCameraOutlined,
  MenuOutlined, // Ícone do botão para abrir o menu
} from "@ant-design/icons";
import Colaboradores from "../../pages/Employees/Employees";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <VideoCameraOutlined />,
    label: <Link to="/colaboradores">Colaboradores</Link>,
  },
  // {
  //   key: "2",
  //   icon: <UploadOutlined />,
  //   label: <Link to="/upload">Upload</Link>,
  // },
];

export const MenuLateral: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false); 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleMenu = () => setCollapsed(!collapsed);

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsed={collapsed} 
        onCollapse={toggleMenu} 
        style={{
          minHeight: "100vh",
          paddingTop: "20px", 
        }}
      >
        <div className="demo-logo-vertical">{/* logomarca */}</div>
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 16px", 
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between", 
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={toggleMenu} 
            style={{
              display: "block", 
              marginLeft: "auto", 
            }}
          />
        </Header>

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
              <Route path="/" element={<Colaboradores />} />
              {/* <Route path="/upload" element={<h1>Upload Page</h1>} /> */}
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
