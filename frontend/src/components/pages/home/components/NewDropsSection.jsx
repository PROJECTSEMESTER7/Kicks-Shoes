import "./NewDropsSection.css";
import ProductCard from "../../../common/components/ProductCard";
import { useEffect, useState } from "react";
import { newProducts } from "../../../../data/homepageData";

export const NewDropsSection = () => {
  const [newDrops, setNewDrops] = useState([]);
  useEffect(() => {
    setNewDrops(newProducts);
  }, []);
  return (
    <div className="new-drops-wrapper">
      <div className="new-drops-header">
        <h4>
          <span className="line">Don’t miss out </span>
          <span className="line">new drops</span>
        </h4>
        <button>Shop new drops</button>
      </div>

      <div className="new-drops-list">
        {newDrops.map((product) => (
          <div className="card-wrapper">
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
