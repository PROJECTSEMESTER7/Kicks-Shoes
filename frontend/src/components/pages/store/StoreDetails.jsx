import {
  ShopOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  PictureOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  message,
  Row,
  Upload,
  Switch,
  Space,
  Spin,
} from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TabHeader from "../../common/components/TabHeader";

const { TextArea } = Input;

const emptyStore = {
  name: "",
  description: "",
  address: "",
  phone: "",
  email: "",
  isOpen: true,
  social_media: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
  logo: "",
  banner: "",
};

export default function StoreDetails() {
  const location = useLocation();
  const isAddNew = location.pathname.includes("add-new");
  const [store, setStore] = useState(emptyStore);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(!isAddNew);
  const [logoFileList, setLogoFileList] = useState([]);
  const [bannerFileList, setBannerFileList] = useState([]);

  useEffect(() => {
    if (!isAddNew) {
      fetchStoreDetails();
    }
  }, [isAddNew, location.pathname]);

  const fetchStoreDetails = async () => {
    try {
      const storeId = location.pathname.split("/").pop();
      console.log("Fetching store details for ID:", storeId);

      const response = await axios.get(`/api/stores/${storeId}`);

      if (response.data.success) {
        const storeData = response.data.data;
        setStore(storeData);

        // Set file lists for existing images
        if (storeData.logo) {
          setLogoFileList([
            {
              uid: "logo",
              name: "Store Logo",
              status: "done",
              url: storeData.logo,
            },
          ]);
        }

        if (storeData.banner) {
          setBannerFileList([
            {
              uid: "banner",
              name: "Store Banner",
              status: "done",
              url: storeData.banner,
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch store details:", error);
      message.error("Failed to load store details");
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setStore((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parentField, childField, value) => {
    setStore((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value,
      },
    }));
  };

  const handleLogoUpload = ({ fileList: newFileList }) => {
    setLogoFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0];
      setStore((prev) => ({
        ...prev,
        logo: file.url || file.thumbUrl || "uploaded-logo-url",
      }));
    } else {
      setStore((prev) => ({ ...prev, logo: "" }));
    }
  };

  const handleBannerUpload = ({ fileList: newFileList }) => {
    setBannerFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0];
      setStore((prev) => ({
        ...prev,
        banner: file.url || file.thumbUrl || "uploaded-banner-url",
      }));
    } else {
      setStore((prev) => ({ ...prev, banner: "" }));
    }
  };

  // Validate form data before submission
  const validateForm = () => {
    const errors = [];

    if (!store.name || store.name.trim().length === 0) {
      errors.push("Store name is required");
    }
    if (!store.description || store.description.trim().length === 0) {
      errors.push("Store description is required");
    }
    if (!store.address || store.address.trim().length === 0) {
      errors.push("Store address is required");
    }
    if (!store.phone || store.phone.trim().length === 0) {
      errors.push("Phone number is required");
    }
    if (!store.email || store.email.trim().length === 0) {
      errors.push("Email address is required");
    }
    if (!store.logo) {
      errors.push("Store logo is required");
    }
    if (!store.banner) {
      errors.push("Store banner is required");
    }

    // Validate phone number format (10 digits)
    if (store.phone && !/^[0-9]{10}$/.test(store.phone)) {
      errors.push("Phone number must be exactly 10 digits");
    }

    // Validate email format
    if (
      store.email &&
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(store.email)
    ) {
      errors.push("Please enter a valid email address");
    }

    return errors;
  };

  const handleCreate = async () => {
    // Validate form before submission
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => message.error(error));
      return;
    }

    setLoading(true);
    try {
      // Get auth headers
      const getAuthHeaders = () => {
        const userInfo = localStorage.getItem("userInfo");
        const token = userInfo ? JSON.parse(userInfo).token : null;
        return token ? { Authorization: `Bearer ${token}` } : {};
      };

      const payload = {
        name: store.name.trim(),
        description: store.description.trim(),
        address: store.address.trim(),
        phone: store.phone.trim(),
        email: store.email.trim().toLowerCase(),
        isOpen: store.isOpen,
        social_media: {
          facebook: store.social_media.facebook?.trim() || "",
          instagram: store.social_media.instagram?.trim() || "",
          twitter: store.social_media.twitter?.trim() || "",
        },
        logo: store.logo,
        banner: store.banner,
      };

      console.log("Creating store with payload:", payload);

      const response = await axios.post("/api/stores/create", payload, {
        headers: getAuthHeaders(),
      });

      console.log("Create response:", response.data);

      if (response.data.success) {
        message.success("Store created successfully!");
        // Reset form
        setStore(emptyStore);
        setLogoFileList([]);
        setBannerFileList([]);

        // Redirect to stores list
        setTimeout(() => {
          window.location.href = "/dashboard/stores";
        }, 1500);
      } else {
        message.error(response.data.message || "Failed to create store");
      }
    } catch (error) {
      console.error("Failed to create store:", error);

      if (error.response?.status === 404) {
        message.error(
          "API endpoint not found. Please check if the server is running and the route is configured."
        );
      } else if (error.response?.status === 401) {
        message.error("Unauthorized. Please login to create stores.");
      } else if (error.response?.status === 403) {
        message.error("You don't have permission to create stores");
      } else if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          message.error(`${err.field}: ${err.message}`);
        });
      } else if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error(
          "Failed to create store. Please check your connection and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    // Validate form before submission
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => message.error(error));
      return;
    }

    setLoading(true);
    try {
      const storeId = store._id || store.id;
      const payload = {
        name: store.name.trim(),
        description: store.description.trim(),
        address: store.address.trim(),
        phone: store.phone.trim(),
        email: store.email.trim().toLowerCase(),
        isOpen: store.isOpen,
        social_media: {
          facebook: store.social_media.facebook?.trim() || "",
          instagram: store.social_media.instagram?.trim() || "",
          twitter: store.social_media.twitter?.trim() || "",
        },
        logo: store.logo,
        banner: store.banner,
      };

      console.log("Updating store with payload:", payload);

      // Try different possible API endpoints
      let response;
      try {
        response = await axios.put(`/api/stores/${storeId}`, payload);
      } catch (error) {
        if (error.response?.status === 404) {
          console.log("Trying alternative endpoint: /api/store");
          response = await axios.put(`/api/store/${storeId}`, payload);
        } else {
          throw error;
        }
      }

      console.log("Update response:", response.data);

      if (response.data.success) {
        message.success("Store updated successfully!");
        setTimeout(() => {
          window.location.href = "/dashboard/stores";
        }, 1500);
      } else {
        message.error(response.data.message || "Failed to update store");
      }
    } catch (error) {
      console.error("Failed to update store:", error);

      if (error.response?.status === 404) {
        message.error(
          "API endpoint not found. Please check if the server is running and the route is configured."
        );
      } else if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to update store. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const storeId = store._id || store.id;

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

      console.log("Delete response:", response.data);

      if (response.data.success) {
        message.success("Store deleted successfully!");
        setTimeout(() => {
          window.location.href = "/dashboard/stores";
        }, 1500);
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
        message.error("Failed to delete store!");
      }
    }
  };

  const handleCancel = () => {
    message.info("Changes canceled");
    window.location.href = "/dashboard/stores";
  };

  if (pageLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <TabHeader
        breadcrumb="All Stores"
        anotherBreadcrumb={isAddNew ? "Add New Store" : "Store Details"}
      />

      <div
        className="store-details-container"
        style={{ padding: "24px", background: "#f5f5f5" }}>
        <Row gutter={[24, 24]}>
          {/* Main Content */}
          <Col xs={24} lg={16}>
            {/* Basic Information */}
            <Card
              title={
                <Space>
                  <InfoCircleOutlined />
                  <span>Basic Information</span>
                </Space>
              }
              bordered={false}
              style={{
                borderRadius: 12,
                marginBottom: 24,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}>
              <Row gutter={[16, 24]}>
                <Col span={24}>
                  <label
                    style={{
                      fontWeight: 600,
                      marginBottom: 8,
                      display: "block",
                    }}>
                    Store Name
                  </label>
                  <Input
                    size="large"
                    placeholder="Enter store name"
                    value={store.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    prefix={<ShopOutlined />}
                  />
                </Col>

                <Col span={24}>
                  <label
                    style={{
                      fontWeight: 600,
                      marginBottom: 8,
                      display: "block",
                    }}>
                    Description
                  </label>
                  <TextArea
                    placeholder="Enter store description"
                    value={store.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    rows={4}
                    showCount
                    maxLength={500}
                    style={{ resize: "none" }}
                  />
                </Col>

                <Col span={24}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <label
                      style={{
                        fontWeight: 600,
                        marginBottom: 8,
                        display: "block",
                      }}>
                      Store Status
                    </label>
                    <Switch
                      checked={store.isOpen}
                      onChange={(checked) => handleChange("isOpen", checked)}
                      checkedChildren="Open"
                      unCheckedChildren="Closed"
                      size="default"
                    />
                  </Space>
                </Col>
              </Row>
            </Card>

            {/* Contact Information */}
            <Card
              title={
                <Space>
                  <EnvironmentOutlined />
                  <span>Contact Information</span>
                </Space>
              }
              bordered={false}
              style={{
                borderRadius: 12,
                marginBottom: 24,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}>
              <Row gutter={[16, 24]}>
                <Col span={24}>
                  <label
                    style={{
                      fontWeight: 600,
                      marginBottom: 8,
                      display: "block",
                    }}>
                    Address
                  </label>
                  <Input
                    size="large"
                    placeholder="Enter store address"
                    value={store.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    prefix={<EnvironmentOutlined />}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <label
                    style={{
                      fontWeight: 600,
                      marginBottom: 8,
                      display: "block",
                    }}>
                    Phone Number
                  </label>
                  <Input
                    size="large"
                    placeholder="Enter 10-digit phone number"
                    value={store.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    prefix={<PhoneOutlined />}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <label
                    style={{
                      fontWeight: 600,
                      marginBottom: 8,
                      display: "block",
                    }}>
                    Email Address
                  </label>
                  <Input
                    size="large"
                    placeholder="Enter store email"
                    value={store.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    prefix={<MailOutlined />}
                  />
                </Col>
              </Row>
            </Card>

            {/* Social Media */}
            <Card
              title={
                <Space>
                  <GlobalOutlined />
                  <span>Social Media</span>
                </Space>
              }
              bordered={false}
              style={{
                borderRadius: 12,
                marginBottom: 24,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}>
              <Row gutter={[16, 24]}>
                <Col xs={24} sm={8}>
                  <label
                    style={{
                      fontWeight: 600,
                      marginBottom: 8,
                      display: "block",
                    }}>
                    Facebook URL
                  </label>
                  <Input
                    size="large"
                    placeholder="https://facebook.com/yourstore"
                    value={store.social_media?.facebook || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        "social_media",
                        "facebook",
                        e.target.value
                      )
                    }
                  />
                </Col>

                <Col xs={24} sm={8}>
                  <label
                    style={{
                      fontWeight: 600,
                      marginBottom: 8,
                      display: "block",
                    }}>
                    Instagram URL
                  </label>
                  <Input
                    size="large"
                    placeholder="https://instagram.com/yourstore"
                    value={store.social_media?.instagram || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        "social_media",
                        "instagram",
                        e.target.value
                      )
                    }
                  />
                </Col>

                <Col xs={24} sm={8}>
                  <label
                    style={{
                      fontWeight: 600,
                      marginBottom: 8,
                      display: "block",
                    }}>
                    Twitter URL
                  </label>
                  <Input
                    size="large"
                    placeholder="https://twitter.com/yourstore"
                    value={store.social_media?.twitter || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        "social_media",
                        "twitter",
                        e.target.value
                      )
                    }
                  />
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            {/* Store Logo */}
            <Card
              title={
                <Space>
                  <PictureOutlined />
                  <span>Store Logo</span>
                </Space>
              }
              bordered={false}
              style={{
                borderRadius: 12,
                marginBottom: 24,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: !store.logo ? "1px solidrgb(0, 0, 0)" : "1px solid #d9d9d9",
              }}>
              {store.logo && (
                <div style={{ marginBottom: 16 }}>
                  <img
                    style={{
                      width: "100%",
                      borderRadius: "12px",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                    src={store.logo || "/placeholder.svg"}
                    alt="Store Logo Preview"
                  />
                </div>
              )}

              <Upload.Dragger
                fileList={logoFileList}
                onChange={handleLogoUpload}
                listType="picture"
                accept=".png,.jpg,.jpeg,.webp"
                maxCount={1}
                showUploadList={{ showRemoveIcon: true }}
                beforeUpload={() => false}
                style={{
                  borderRadius: 8,
                  border: "2px dashed #d9d9d9",
                  background: "#fafafa",
                }}>
                <p className="ant-upload-drag-icon">
                  <PlusOutlined style={{ fontSize: 24, color: "#1890ff" }} />
                </p>
                <p
                  className="ant-upload-text"
                  style={{ fontSize: 16, margin: "8px 0" }}>
                  <strong>Drop logo here</strong> or click to browse
                </p>
                <p
                  className="ant-upload-hint"
                  style={{ color: "#999", fontSize: 14 }}>
                  Support: JPG, PNG, WEBP (Max 5MB)
                </p>
              </Upload.Dragger>
            </Card>

            {/* Store Banner */}
            <Card
              title={
                <Space>
                  <PictureOutlined />
                  <span>Store Banner</span>
                </Space>
              }
              bordered={false}
              style={{
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: !store.banner
                  ? "1px solidrgb(0, 0, 0)"
                  : "1px solid #d9d9d9",
              }}>
              {store.banner && (
                <div style={{ marginBottom: 16 }}>
                  <img
                    style={{
                      width: "100%",
                      borderRadius: "12px",
                      maxHeight: "120px",
                      objectFit: "cover",
                    }}
                    src={store.banner || "/placeholder.svg"}
                    alt="Store Banner Preview"
                  />
                </div>
              )}

              <Upload.Dragger
                fileList={bannerFileList}
                onChange={handleBannerUpload}
                listType="picture"
                accept=".png,.jpg,.jpeg,.webp"
                maxCount={1}
                showUploadList={{ showRemoveIcon: true }}
                beforeUpload={() => false}
                style={{
                  borderRadius: 8,
                  border: "2px dashed #d9d9d9",
                  background: "#fafafa",
                }}>
                <p className="ant-upload-drag-icon">
                  <PlusOutlined style={{ fontSize: 24, color: "#1890ff" }} />
                </p>
                <p
                  className="ant-upload-text"
                  style={{ fontSize: 16, margin: "8px 0" }}>
                  <strong>Drop banner here</strong> or click to browse
                </p>
                <p
                  className="ant-upload-hint"
                  style={{ color: "#999", fontSize: 14 }}>
                  Support: JPG, PNG, WEBP (Max 5MB)
                </p>
              </Upload.Dragger>
            </Card>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Card
          bordered={false}
          style={{
            borderRadius: 12,
            marginTop: 24,
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}>
          <Space size="large">
            {isAddNew ? (
              <Button
                type="primary"
                size="large"
                onClick={handleCreate}
                loading={loading}
                style={{ minWidth: 120, height: 48 }}>
                Create Store
              </Button>
            ) : (
              <>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleUpdate}
                  loading={loading}
                  style={{ minWidth: 120, height: 48 }}>
                  Update Store
                </Button>
              </>
            )}
            <Button
              size="large"
              onClick={handleCancel}
              style={{ minWidth: 120, height: 48 }}>
              Cancel
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  );
}
