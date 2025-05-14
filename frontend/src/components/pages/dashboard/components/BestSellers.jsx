import React from "react";
import { List, Avatar, Button } from "antd";

const products = [
  {
    name: "Adidas Ultra boost",
    price: "$126.50",
    sales: 999,
    img: "/img/shoe.png",
  },
  {
    name: "Adidas Ultra boost",
    price: "$126.50",
    sales: 999,
    img: "/img/shoe.png",
  },
  {
    name: "Adidas Ultra boost",
    price: "$126.50",
    sales: 999,
    img: "/img/shoe.png",
  },
];

export default function BestSellers() {
  return (
    <div className="best-sellers">
      <h4
        className="best-seller-title"
        style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 16 }}
      >
        Best Sellers
      </h4>
      <List
        itemLayout="horizontal"
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.img} />}
              title={item.name}
              description={`${item.price} - ${item.sales} sales`}
            />
          </List.Item>
        )}
      />
      <Button type="default" block style={{ marginTop: 16 }}>
        REPORT
      </Button>
    </div>
  );
}
