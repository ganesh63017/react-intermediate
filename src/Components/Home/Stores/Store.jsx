import React from "react";
import InfiniteScrollStore from "./InfiniteScroll";
import MainFilters from "./StoreFilters";
import SearchBar from "./StoreFilters/Search/Search";
import Alphaebt from "./StoreFilters/alphabet/Alphabet";

const Store = () => {
  return (
    <div className="my-[50px] w-full">
      <div className="flex items-center justify-between pr-24 mb-4">
        <Alphaebt />
        <SearchBar />
      </div>
      <MainFilters />
      <InfiniteScrollStore />
    </div>
  );
};

export default Store;
