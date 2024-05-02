import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAlphabets, updateStore } from "../../../../../Redux/reducer";
import { apiRoutes } from "../../../../../services/constants";
import { fetchStores } from "../../../../../Apis/stores";

const Alphaebt = () => {
  const {
    sortByValue,
    pageNumber,
    store,
    storeFilters,
    searchValue,
    alphabets,
  } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  useEffect(() => {
    // Extract the first character from each name and convert to uppercase
    const characters = store.map((item) => item.name.charAt(0).toUpperCase());

    // Remove duplicate characters and sort alphabetically
    const uniqueCharacters = [...new Set(characters)].sort();

    // Create an array of objects with the unique characters and IDs
    const generatedAlphabet = uniqueCharacters.map((item) => {
      return { value: item, id: Math.random(1000) };
    });

    // Update the alphabets array in the state

    dispatch(updateAlphabets(generatedAlphabet));
  }, [store, pageNumber, sortByValue, storeFilters, searchValue]);

  const fetchStoresData = async (filterQuery) => {
    //   The `fetchStores` function is a function that fetches store data from the API.

    if (filterQuery === "all") {
      const storesData = await fetchStores(apiRoutes.stores);

      dispatch(updateStore(storesData));

      return;
    }

    const storesData = await fetchStores(
      `${apiRoutes.stores}?name_like=^${filterQuery}`
    );

    if (!storesData) return;

    dispatch(updateStore(storesData));
  };

  return (
    <div className="flex gap-3 cursor-pointer">
      <p
        className="underline text-lg font-semibold text-yellow-700 hover:text-indigo-900 hover:text-xl"
        onClick={() => fetchStoresData("all")}
      >
        All
      </p>
      {alphabets.map(({ value, id }) => {
        return (
          <p
            className="underline text-lg font-semibold text-yellow-700 hover:text-indigo-900 hover:text-xl"
            key={id}
            onClick={() => fetchStoresData(value)}
          >
            {value}
          </p>
        );
      })}
    </div>
  );
};

export default Alphaebt;
