import { createSlice } from "@reduxjs/toolkit";
import { filters } from "../services/constants";

// here the intial State of Application
const state = {
  store: [],
  sortByValue: {
    id: 1,
    name: "Alphabetical",
    query: "name",
  },
  searchValue: "",
  pageNumber: 1,
  alphabets: [],
  storeFilters: filters,
};

const storeSlice = createSlice({
  name: "store",
  initialState: state,
  reducers: {
    /**
     * Reducer function to update the store by adding new items.
     *
     * @param {Object} state - The current state of the store.
     * @param {Object} action - The action object containing the payload with the new items.
     */
    addStore: (state, action) => {
      // store array with the new items array. This allows the existing items to remain

      state.store = [...state.store, ...action.payload];
    },

    updateStore: (state, action) => {
      // The existing store items are replaced by the new ones.
      state.store = [...action.payload];
    },

    updateSortBy: (state, action) => {
      // Update the sortByValue in the state with the new value provided in the payload.
      state.sortByValue = { ...action.payload };
    },

    updatePageNumber: (state) => {
      // Increment the page number in the state by 1.
      // This is useful for pagination purposes.
      state.pageNumber += 1;
    },

    updateStoreByFilter: (state, action) => {
      // Map over the storeFilters array and update the filter with the given ID
      // The map function creates a new array with the updated filter or the original filter if the ID does not match.
      const updatedFilters = state.storeFilters.map((item) => {
        // If the ID of the current item matches the ID of the filter to be updated
        if (item.id === action.payload.id) {
          // Update this item with the payload
          return action.payload;
        }
        // Return the original item unchanged
        return item;
      });

      // Update the storeFilters array in the state with the updated filters
      state.storeFilters = updatedFilters;
    },
    updateSearchString: (state, action) => {
      // This is useful for filtering and searching purposes.
      // Set the search string in the state to the new value
      state.searchValue = action.payload.value;
    },

    updateAlphabets: (state, action) => {
      // Update the alphabets array in the state with the new values provided in the payload.
      // The existing alphabets are replaced by the new ones.
      state.alphabets = [...action.payload];
    },
  },
});

export const {
  addStore,
  updateSortBy,
  updatePageNumber,
  updateStoreByFilter,
  updateSearchString,
  updateStore,
  updateAlphabets,
} = storeSlice.actions;

export default storeSlice.reducer;
