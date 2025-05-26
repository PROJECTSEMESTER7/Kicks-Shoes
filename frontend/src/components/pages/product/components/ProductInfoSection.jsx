import { useState } from "react";
import { Button, Tag, Typography } from "antd";
import { formatPrice } from "../../../../utils/StringFormat";
import "./ProductInfoSection.css";

const { Title, Paragraph } = Typography;

const ProductInfoSection = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(
    product.variants.colors[0]
  );

  return (
    <div className="product-info">
      <div className="product-tags">
        {product.isNew && (
          <Tag color="blue" className="release-tag">
            New Release
          </Tag>
        )}
        {product.price.isOnSale && (
          <Tag color="red" className="sale-tag">
            Sale {product.price.discountPercent}%
          </Tag>
        )}
      </div>

      <Title level={2} className="product-name">
        {product.name}
      </Title>
      <Title level={3} className="product-price">
        {product.price.isOnSale
          ? formatPrice(
              product.price.regular * (1 - product.price.discountPercent / 100)
            )
          : formatPrice(product.price.regular)}
      </Title>

      {/* Color Selector */}
      <div className="variant-block">
        <p className="variant-label">Color</p>
        <div className="color-options">
          {product.variants.colors.map((color) => (
            <div
              key={color}
              className={`color-swatch ${
                selectedColor === color ? "active" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div className="variant-block">
        <div className="size-header">
          <p className="variant-label">Size</p>
          <a href="#" className="size-chart-link">
            Size Chart
          </a>
        </div>
        <div className="size-options">
          {product.variants.sizes.map((size) => (
            <button
              key={size}
              className={`size-btn ${selectedSize === size ? "active" : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="product-actions">
        <Button type="primary" size="large" block className="add-to-cart-btn">
          Add to Cart
        </Button>
        <Button size="large" block className="buy-now-btn">
          Buy it now
        </Button>
      </div>

      {/* Description */}
      <div className="product-description">
        <Paragraph type="secondary" className="summary-text">
          {product.summary}
        </Paragraph>
        <ul className="benefit-list">
          <li>
            Pay over time in interest-free installments with Affirm, Klarna or
            Afterpay.
          </li>
          <li>
            Join adiClub to get unlimited free standard shipping, returns, &
            exchanges.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInfoSection;
