import { Pagination } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TableOrders from "../../pages/dashboard/components/TableOrders";
import { ActiveTabContext } from "./ActiveTabContext";
import TabHeader from "./TabHeader";
import { Dropdown, Button, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";

const OrderList = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 9;

  const { setActiveTab } = useContext(ActiveTabContext);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    setActiveTab("4");
  }, [setActiveTab]);

  useEffect(() => {
    const fetchOrders = async () => {
      // Log authentication state
      console.log("Current User from Auth Context:", user);
      console.log("Current User ID:", user?._id);

      if (!user?._id) {
        console.error("No user ID available in auth context");
        setError("User information is not available");
        setOrders([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/api/orders/user/${user._id}`, {
          params: {
            page: currentPage,
            limit: pageSize,
          },
        });

        console.log("API Response:", response.data);
        const ordersData = response.data.data || [];
        console.log("Orders received:", ordersData);
        console.log("Total orders:", ordersData.length);

        setOrders(ordersData);
        setTotalOrders(ordersData.length);
      } catch (error) {
        console.error("Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setError(error.response?.data?.message || "Failed to fetch orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, user?._id]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const statusMenu = (
    <Menu
      items={[
        { label: "Pending", key: "pending" },
        { label: "Completed", key: "completed" },
        { label: "Cancelled", key: "cancelled" },
      ]}
      onClick={(e) => {
        console.log("Selected status:", e.key);
      }}
    />
  );

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>Error: {error}</h3>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TabHeader breadcrumb="Order List" />
        <Dropdown overlay={statusMenu} trigger={["click"]}>
          <Button style={{ height: 45 }}>
            Change Status <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <TableOrders
        title="Recent Purchases"
        orders={orders}
        dashboard={isDashboard}
        loading={loading}
      />
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          total={totalOrders}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default OrderList;
