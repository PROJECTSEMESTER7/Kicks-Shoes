import React from "react";
import { Card, Button } from "antd";

export default function SaleGraph() {
  return (
    <Card
      className="sale-graph"
      title="Sale Graph"
      extra={
        <>
          <Button type="default" size="small">
            WEEKLY
          </Button>
          <Button type="default" size="small" style={{ margin: "0 8px" }}>
            MONTHLY
          </Button>
          <Button type="default" size="small">
            YEARLY
          </Button>
        </>
      }
      style={{ marginBottom: 24 }}
    >
      {/* Thay bằng chart thực tế nếu dùng chartjs/recharts */}
      <div
        style={{
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#aaa",
        }}
      >
        [Biểu đồ doanh số]
      </div>
    </Card>
  );
}
