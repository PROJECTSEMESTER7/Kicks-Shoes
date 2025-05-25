import { useState } from "react";
import "./FilterSidebar.css";
import { Checkbox, Collapse, Slider, Button } from "antd";

const { Panel } = Collapse;

const FilterSidebar = ({
  refineOptions,
  sizes,
  colors,
  categories,
  genders,
  priceRange
}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <div className="filter-sidebar">
      <h2 className="filter-sidebar__title">Filters</h2>

      {/* Refine by */}
      <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]} ghost>
        <Panel header="REFINE BY" key="1">
          <div className="filter-refine">
            {refineOptions.map((option) => (
              <Button key={option} className="refine-button">
                {option}
              </Button>
            ))}
          </div>
        </Panel>

        {/* Size */}
        <Panel header="SIZE" key="2">
          <div className="filter-size-grid">
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-button ${
                  selectedSize === size ? "active" : ""
                }`}
                onClick={() => setSelectedSize(size)}
                disabled={size.disabled}
              >
                {size.value}
              </button>
            ))}
          </div>
        </Panel>

        {/* Color */}
        <Panel header="COLOR" key="3">
          <div className="filter-color-grid">
            {colors.map((color) => (
              <button
                key={color}
                className={`color-button ${
                  selectedColor === color ? "selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </Panel>

        {/* Category */}
        <Panel header="TYPE" key="4">
          <Checkbox.Group style={{ display: "flex", flexDirection: "column" }}>
            {categories.map((cat) => (
              <Checkbox key={cat} value={cat}>
                {cat}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Panel>

        {/* Gender */}
        <Panel header="GENDER" key="5">
          <Checkbox.Group style={{ display: "flex", flexDirection: "column" }}>
            {genders.map((g) => (
              <Checkbox key={g} value={g}>
                {g}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Panel>

        {/* Price */}
        <Panel header="PRICE" key="6">
          <Slider
            range
            defaultValue={priceRange}
            min={0}
            max={1000}
            tooltip={{ open: true }}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default FilterSidebar;
