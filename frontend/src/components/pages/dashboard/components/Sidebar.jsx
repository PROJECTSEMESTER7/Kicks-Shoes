import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import logo from "../../../../assets/images/logo_small.png";

const { Sider } = Layout;

export default function Sidebar() {
  return (
    <Sider width={220} className="sidebar">
      <div className="logo">
        <img className="logo_image" src={logo}></img>
      </div>
      <Menu
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          All Products
        </Menu.Item>
        <Menu.Item key="3" icon={<UnorderedListOutlined />}>
          Order List
        </Menu.Item>
      </Menu>
      <div style={{ color: "#fff", margin: 16 }}>Categories</div>
    </Sider>
  );
}
