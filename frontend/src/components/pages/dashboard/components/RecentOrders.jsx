import React from "react";
import { Table, Tag } from "antd";

const columns = [
  { title: "Product", dataIndex: "product", key: "product" },
  { title: "Order ID", dataIndex: "id", key: "id" },
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Customer Name", dataIndex: "name", key: "name" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "Delivered" ? "blue" : "red"}>{status}</Tag>
    ),
  },
  { title: "Amount", dataIndex: "amount", key: "amount" },
];

const data = [
  {
    key: 1,
    product: "Adidas Ultra boost",
    id: "#25426",
    date: "Jan 8th,2022",
    name: "Leo Gouse",
    status: "Delivered",
    amount: "$200.00",
  },
  {
    key: 2,
    product: "Adidas Ultra boost",
    id: "#25425",
    date: "Jan 7th,2022",
    name: "Jaxson Korsgaard",
    status: "Canceled",
    amount: "$200.00",
  },
  {
    key: 3,
    product: "Adidas Ultra boost",
    id: "#25424",
    date: "Jan 6th,2022",
    name: "Talan Botosh",
    status: "Delivered",
    amount: "$200.00",
  },
  {
    key: 4,
    product: "Adidas Ultra boost",
    id: "#25423",
    date: "Jan 5th,2022",
    name: "Ryan Philips",
    status: "Canceled",
    amount: "$200.00",
  },
  {
    key: 5,
    product: "Adidas Ultra boost",
    id: "#25422",
    date: "Jan 4th,2022",
    name: "Emerson Baptista",
    status: "Delivered",
    amount: "$200.00",
  },
  {
    key: 6,
    product: "Adidas Ultra boost",
    id: "#25421",
    date: "Jan 2th,2022",
    name: "Jaxson Calzoni",
    status: "Delivered",
    amount: "$200.00",
  },
];

export default function RecentOrders() {
  return (
    <div className="recent-orders" style={{ marginTop: 24 }}>
      <h4>Recent Orders</h4>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
}
