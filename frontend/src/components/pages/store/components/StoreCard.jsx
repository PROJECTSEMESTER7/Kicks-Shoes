import { Card, Button, Tag, Tooltip, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ShopOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

const StoreCard = ({ store, onDelete }) => {
  const handleEdit = () => {
    window.location.href = `/dashboard/stores/${store._id}`;
  };

  const handleDelete = () => {
    onDelete(store._id);
  };

  return (
    <Card
      hoverable
      className="store-card"
      cover={
        <div className="store-banner-container">
          <img
            alt={store.name}
            src={store.banner || "/placeholder-store.png"}
            className="store-banner"
          />
          <Tag
            color={store.isOpen ? "green" : "red"}
            className="store-status-tag">
            {store.isOpen ? "Open" : "Closed"}
          </Tag>
        </div>
      }
      actions={[
        <Tooltip key="edit" title="Edit Store">
          <Button type="text" icon={<EditOutlined />} onClick={handleEdit} />
        </Tooltip>,
        <Tooltip key="delete" title="Delete Store">
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            danger
          />
        </Tooltip>,
      ]}>
      <div className="store-header">
        <Avatar src={store.logo} icon={<ShopOutlined />} size={40} />
        <div className="store-title">
          <h3>{store.name}</h3>
          <p className="store-description">{store.description}</p>
        </div>
      </div>

      <div className="store-details">
        <p>
          <EnvironmentOutlined /> {store.address}
        </p>
        <p>
          <PhoneOutlined /> {store.phone}
        </p>
        <p>
          <MailOutlined /> {store.email}
        </p>
      </div>

      {store.social_media && (
        <div className="store-social">
          {store.social_media.facebook && (
            <a
              href={store.social_media.facebook}
              target="_blank"
              rel="noopener noreferrer">
              Facebook
            </a>
          )}
          {store.social_media.instagram && (
            <a
              href={store.social_media.instagram}
              target="_blank"
              rel="noopener noreferrer">
              Instagram
            </a>
          )}
          {store.social_media.twitter && (
            <a
              href={store.social_media.twitter}
              target="_blank"
              rel="noopener noreferrer">
              Twitter
            </a>
          )}
        </div>
      )}
    </Card>
  );
};

export default StoreCard;
