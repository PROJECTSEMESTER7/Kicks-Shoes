import { Pagination } from "antd";
import TabHeader from "./components/TabHeader";
import { getDiscounts, getTotalDiscounts } from "./data/dashboardData";
import { useContext, useEffect, useState } from "react";
import { ActiveTabContext } from "./Dashboard";
import TableDiscounts from "./components/TableDiscounts";

const DiscountListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const currentDiscounts = getDiscounts(currentPage, pageSize);
  const totalDiscounts = getTotalDiscounts();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { setActiveTab } = useContext(ActiveTabContext);

  useEffect(() => {
    setActiveTab("4");
  }, [setActiveTab]);

  return (
    <>
      <TabHeader breadcrumb="Discount Management" />
      <TableDiscounts title="Discount List" discounts={currentDiscounts} />
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          total={totalDiscounts}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default DiscountListPage;
