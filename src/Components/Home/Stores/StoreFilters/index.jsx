import CashBackEnabled from "./Filters/filters";
import SortBy from "./SortBy/SortBy";

const MainFilters = () => {
  return (
    <>
      <div className="flex items-end justify-between pl-4 mb-6 pr-24">
        <CashBackEnabled />
        <SortBy />
      </div>
    </>
  );
};

export default MainFilters;
