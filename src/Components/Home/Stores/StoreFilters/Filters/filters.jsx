import { useDispatch, useSelector } from "react-redux";
import { updateStoreByFilter } from "../../../../../Redux/reducer";

const CashBackEnabled = () => {
  const { storeFilters } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  return (
    <>
      {storeFilters?.map(({ value, id, query, checked }) => {
        return (
          <div className="flex items-center mb-4 cursor-pointer" key={id}>
            <input
              id={id}
              type="checkbox"
              value={value}
              onChange={() => {
                dispatch(
                  updateStoreByFilter({
                    id,
                    checked: checked === "true" ? "false" : "true",
                    query,
                    value,
                  })
                );
              }}
              checked={checked === "true"}
              className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor={id}
              className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >
              {value}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default CashBackEnabled;
