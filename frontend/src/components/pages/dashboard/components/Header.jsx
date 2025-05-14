import React from "react";
import { Layout, Button } from "antd";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
const { Header: AntHeader } = Layout;

export default function Header() {
  return (
    <AntHeader
      className="header"
      style={{
        background: "#fff",
        margin: 0,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: "0px",
        padding: "0 24px",
      }}
    >
      <div>
        <SearchOutlined />
        <BellOutlined />
        <Button type="default">ADMIN ▼</Button>
      </div>
    </AntHeader>
  );
}
