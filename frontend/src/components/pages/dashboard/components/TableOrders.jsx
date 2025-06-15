import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Table, Tag, Avatar, Checkbox } from "antd";

const StatusTag = React.memo(({ status }) => (
  <Tag
    color={
      status === "completed"
        ? "rgb(59 130 246 / 30%)"
        : status === "refunded"
        ? "rgb(239 68 68 / 30%)"
        : "rgb(245 158 66 / 30%)"
    }
    style={{ borderRadius: 10, fontWeight: 500 }}
  >
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <span
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background:
            status === "completed"
              ? "#3b82f6"
              : status === "refunded"
              ? "#ef4444"
              : "#f59e42",
          marginRight: 6,
        }}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  </Tag>
));

StatusTag.propTypes = {
  status: PropTypes.string.isRequired,
};

const CustomerCell = React.memo(({ name }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span>{name}</span>
  </div>
));

CustomerCell.propTypes = {
  name: PropTypes.string.isRequired,
};

const TableOrders = ({ title, orders, dashboard }) => {
  const columns = useMemo(() => {
    const baseColumns = [
      {
        title: "Order ID",
        dataIndex: "_id",
        key: "id",
      },
      {
        title: "Date",
        dataIndex: "createdAt",
        key: "date",
        render: (date) => new Date(date).toLocaleDateString(),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => <StatusTag status={status} />,
      },
      {
        title: "Amount",
        dataIndex: "totalPrice",
        key: "amount",
        render: (amount) => `$${amount?.toFixed(2) || "0.00"}`,
      },
    ];

    if (dashboard) {
      baseColumns.unshift({
        title: <Checkbox />,
        dataIndex: "checkbox",
        key: "checkbox",
        width: 40,
        render: () => <Checkbox />,
      });

      baseColumns.splice(4, 0, {
        title: "Customer Name",
        dataIndex: "user",
        key: "customer",
        render: (userId) => <CustomerCell name={userId} />,
      });
    }

    return baseColumns;
  }, [dashboard]);

  return (
    <div className="recent-orders" style={{ marginTop: 24 }}>
      <h4>{title}</h4>
      <Table
        columns={columns}
        dataSource={orders}
        pagination={false}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => {
            window.location.href = `/dashboard/orders/${record._id}`;
          },
          style: { cursor: "pointer" },
        })}
      />
    </div>
  );
};

TableOrders.propTypes = {
  title: PropTypes.string.isRequired,
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      items: PropTypes.array.isRequired,
    })
  ).isRequired,
  dashboard: PropTypes.bool,
};

export default React.memo(TableOrders);
