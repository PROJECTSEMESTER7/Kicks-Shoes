import { useState } from "react";

const SizePanel = ({ sizes }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="filter-size-grid">
      {sizes.map((size) => (
        <button
          key={size.value}
          className={`size-button ${
            selectedSize === size.value ? "active" : ""
          }`}
          onClick={() => setSelectedSize(size.value)}
          disabled={size.disabled}
        >
          {size.value}
        </button>
      ))}
    </div>
  );
};

export default SizePanel;
