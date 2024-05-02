import InfiniteScroll from "react-infinite-scroll-component";
import { apiRoutes, dollarPng } from "../../../services/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addStore,
  updatePageNumber,
  updateStore,
} from "../../../Redux/reducer";
import Spinner from "../../spinner/Spinner";
import { useEffect, useRef, useState } from "react";
import { fetchStores } from "../../../Apis/stores";
import BookMark from "./Bookmark/Bookmark";

const InfiniteScrollComponent = () => {
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );

  const { sortByValue, pageNumber, store, storeFilters, searchValue } =
    useSelector((state) => state.store);
  const dispatch = useDispatch();
  const previousPageNumber = useRef(pageNumber);
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch store data from the API
    (async () => {
      // Create an array of query strings
      const queryStrings = storeFilters
        .filter((item) => item.checked === "true")
        .map((item) => item.query);

      // Join the query strings with '&' to form the final query string
      const filterQueryString = queryStrings.join("&");

      // Create the query string
      const query = `${apiRoutes.stores}?_page=${pageNumber}&_limit=9&_sort=${sortByValue.query}&${filterQueryString}&name_like=^${searchValue}`;

      // Call the fetchStoresData function
      const data = await fetchStores(query);

      // Update the store state
      if (pageNumber !== previousPageNumber.current) {
        dispatch(addStore(data));
      } else {
        if (categorySlug) {
          const categoryStore = `${apiRoutes.stores}?${categorySlug}=1&_page=${pageNumber}&_limit=9`;

          const data = await fetchStores(categoryStore);

          dispatch(updateStore(data));

          return;
        }
        dispatch(updateStore(data));
      }

      // Update previousPageNumber ref
      previousPageNumber.current = pageNumber;
    })();
  }, [pageNumber, sortByValue, searchValue, storeFilters, categorySlug]);

  const fetchData = () => {
    setTimeout(() => {
      dispatch(updatePageNumber());
    }, 1000);
  };

  const handleBookMark = (event, id) => {
    event.stopPropagation();
    // Get current bookmarks from local storage and parse it
    const currentBookMarks =
      JSON.parse(localStorage.getItem("bookmarks")) || [];

    // Check if the ID is already bookmarked
    if (!currentBookMarks?.includes(id)) {
      // Add the new ID to the bookmarks array
      const newBookMarks = [...currentBookMarks, id];
      // Store the updated bookmarks array back to local storage
      localStorage.setItem("bookmarks", JSON.stringify(newBookMarks));

      const localBookMarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];

      setBookmarks(localBookMarks);
      return;
    }
    // Remove the ID from the bookmarks array
    const newBookMarks = currentBookMarks.filter((item) => item !== id);

    // Store the updated bookmarks array back to local storage
    localStorage.setItem("bookmarks", JSON.stringify(newBookMarks));
    setBookmarks(newBookMarks);
  };

  return (
    <InfiniteScroll
      dataLength={store.length}
      next={fetchData}
      hasMore={true}
      loader={<Spinner />}
    >
      <div className="flex flex-wrap gap-4 w-full">
        {store?.map(
          ({
            id,
            name,
            logo,
            rate_type,
            cashback_enabled,
            amount_type,
            cashback_amount,
            homepage,
          }) => {
            return (
              <div key={id} onClick={() => navigate(homepage)}>
                <div className="flex flex-col gap-4 min-w-[370px] p-6 bg-white border border-gray-200 rounded-3xl shadow hover:bg-gray-100 hover:cursor-pointer">
                  <div className="flex items-start justify-between">
                    <img src={logo} alt={name} className="h-24 w-[180px]" />
                    <BookMark
                      handleBookMark={handleBookMark}
                      id={id}
                      currentBookMarks={bookmarks}
                    />
                  </div>
                  <p className="font-light text-gray-700 dark:text-gray-400 text-lg">
                    {name}
                  </p>

                  {cashback_enabled === 0 ? (
                    <p className="text-red-400 font-medium text-2xl">
                      No cashback available
                    </p>
                  ) : (
                    <div className="flex items-center gap-1">
                      <img src={dollarPng} alt="dollar" />
                      <div className="flex gap-1 text-yellow-500 text-2xl font-medium">
                        <p>{rate_type}</p>
                        {amount_type === "fixed" ? (
                          <p>${cashback_amount}</p>
                        ) : (
                          <p>{cashback_amount}%</p>
                        )}
                        <p>Cashback</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
