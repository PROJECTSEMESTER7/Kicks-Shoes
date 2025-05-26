import { Pagination } from "antd";
import { useContext, useEffect, useState } from "react";
import { getOrders, getTotalOrders } from "../../../data/mockData";
import TableOrders from "../../pages/dashboard/components/TableOrders";
import { ActiveTabContext } from "../../pages/dashboard/Dashboard";
import TabHeader from "./TabHeader";

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const currentOrders = getOrders(currentPage, pageSize);
  const totalOrders = getTotalOrders();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { setActiveTab } = useContext(ActiveTabContext);

  useEffect(() => {
    setActiveTab("3");
  }, [setActiveTab]);

  return (
    <>
      <TabHeader breadcrumb="Order List" />
      <TableOrders title="Recent Purchases" orders={currentOrders} />
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          total={totalOrders}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default OrderList;
