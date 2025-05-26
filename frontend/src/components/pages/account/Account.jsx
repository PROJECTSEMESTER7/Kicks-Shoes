import { useState, createContext } from "react";
import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../common/components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  DashboardOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

export const ActiveTabContext = createContext();

const accountTabs = [
  { key: "1", name: "My Account", icon: <DashboardOutlined />, path: "/account" },
  { key: "2", name: "Null", icon: <AppstoreOutlined />, path: "/account/null" },
  { key: "3", name: "Order List", icon: <UnorderedListOutlined />, path: "/account/orders" },
  { key: "4", name: "Chat", icon: <MessageOutlined />, path: "/account/chat" },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState("1");
  const location = useLocation();

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} tabs={accountTabs}/>
        <Layout>
          <Header />
          <Content style={{ margin: "24px 16px 0" }}>
            <Outlet />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </ActiveTabContext.Provider>
  );
}
