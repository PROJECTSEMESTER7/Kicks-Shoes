import React from "react";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CardStats from "./components/CardStats";
import SaleGraph from "./components/SaleGraph";
import BestSellers from "./components/BestSellers";
import RecentOrders from "./components/RecentOrders";
import "./dashboard.css";

const { Content } = Layout;

export default function Dashboard() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content style={{ margin: "24px 16px 0" }}>
          <CardStats />
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ flex: 2 }}>
              <SaleGraph />
            </div>
            <div style={{ flex: 1 }}>
              <BestSellers />
            </div>
          </div>
          <RecentOrders />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
