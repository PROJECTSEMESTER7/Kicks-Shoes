import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Row, Col, Pagination, message } from "antd";
import "../dashboard/dashboard.css";
import StoreCard from "./components/StoreCard";
import TabHeader from "../../common/components/TabHeader";

export default function AllStores() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const [stores, setStores] = useState([]);
  const [totalStores, setTotalStores] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/stores?page=${currentPage}&limit=${pageSize}`
      );
      if (response.data.success) {
        setStores(response.data.data.stores || response.data.data);
        setTotalStores(response.data.data.total || response.data.data.length);
      }
    } catch (error) {
      console.error("Failed to fetch stores:", error);
      message.error("Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteStore = async (storeId) => {
    try {
      // Get auth headers
      const getAuthHeaders = () => {
        const userInfo = localStorage.getItem("userInfo");
        const token = userInfo ? JSON.parse(userInfo).token : null;
        return token ? { Authorization: `Bearer ${token}` } : {};
      };

      console.log("Deleting store with ID:", storeId);

      const response = await axios.delete(`/api/stores/${storeId}/delete`, {
        headers: getAuthHeaders(),
      });

      if (response.data.success) {
        message.success("Store deleted successfully");
        fetchStores(); // Refresh the list
      } else {
        message.error(response.data.message || "Failed to delete store");
      }
    } catch (error) {
      console.error("Failed to delete store:", error);

      if (error.response?.status === 404) {
        message.error("Store not found or endpoint not available");
      } else if (error.response?.status === 401) {
        message.error("Unauthorized. Please login again.");
      } else if (error.response?.status === 403) {
        message.error("You don't have permission to delete stores");
      } else {
        message.error("Failed to delete store");
      }
    }
  };

  return (
    <div>
      <div className="all-stores-header">
        <TabHeader breadcrumb="All Stores" />
        <Button
          onClick={() => {
            window.location.href = "/dashboard/stores/add-new";
          }}
          type="primary"
          style={{ background: "black" }}>
          ADD NEW STORE
        </Button>
      </div>
      <div className="all-stores-grid">
        <Row gutter={[24, 24]} loading={loading}>
          {stores.map((store) => (
            <Col xs={24} sm={12} md={8} lg={8} key={store._id}>
              <StoreCard store={store} onDelete={handleDeleteStore} />
            </Col>
          ))}
        </Row>
      </div>
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          total={totalStores}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          showQuickJumper
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} stores`
          }
        />
      </div>
    </div>
  );
}
