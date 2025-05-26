import { Slider } from "antd";

const PricePanel = ({ priceRange }) => (
  <Slider
    range
    defaultValue={priceRange}
    min={0}
    max={1000}
    tooltip={{ open: true }}
  />
);

export default PricePanel;
