import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Pagination,
  Modal,
  Form,
  Input,
  InputNumber,
} from "antd";
import "./dashboard.css";
import ProductCard from "./components/ProductCard";
import TabHeader from "./components/TabHeader";
import { ActiveTabContext } from "./Dashboard";
import { getProducts, getTotalProducts } from "./data/dashboardData";

export default function AllProducts() {
  const { setActiveTab } = useContext(ActiveTabContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const pageSize = 9;
  const currentProducts = getProducts(currentPage, pageSize);
  const totalProducts = getTotalProducts();

  useEffect(() => {
    setActiveTab("2");
  }, [setActiveTab]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      // Here you would typically make an API call to save the discount
      console.log("Discount values:", values);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error submitting discount:", error);
    }
  };

  return (
    <div>
      <div className="all-products-header">
        <TabHeader breadcrumb="All Products" />
        <Button onClick={showModal} type="default">
          ADD NEW PRODUCT
        </Button>
      </div>
      <div className="all-products-grid">
        <Row gutter={[24, 24]}>
          {currentProducts.map((product) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              key={`${product.id}-${product.name}`}
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          total={totalProducts}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>

      <Modal
        title="Add Discount"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="discountCode"
            label="Discount Code"
            rules={[
              { required: true, message: "Please input the discount code!" },
            ]}
          >
            <Input placeholder="Enter discount code" />
          </Form.Item>

          <Form.Item
            name="discountPercentage"
            label="Discount Percentage"
            rules={[
              {
                required: true,
                message: "Please input the discount percentage!",
              },
            ]}
          >
            <InputNumber
              min={0}
              max={100}
              placeholder="Enter percentage"
              addonAfter="%"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="validUntil"
            label="Valid Until"
            rules={[
              { required: true, message: "Please input the validity date!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Submit
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
