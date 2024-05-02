import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../../Apis/Categories";
import { apiRoutes } from "../../../services/constants";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categoryList, setCategoryList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesData = async () => {
      // Fetch categories data from the API
      const categoriesData = await fetchCategories(apiRoutes.categories);

      // Set the fetched categories data to the component state.

      setCategoryList(categoriesData.length && categoriesData?.splice(0, 30));
    };

    fetchCategoriesData();
  }, []);

  const navigateToCategory = async (categorySlug) => {
    // The `navigate` function takes a URL string as an argument and navigates to that URL.
    navigate(`/category/${categorySlug}`);
  };

  return (
    <div className="mt-10 bg-white rounded-3xl shadow-inner shadow-slate-300 p-4">
      <h1 className="text-3xl font-light m-4">Store Categories</h1>
      <div className="bg-gray-100 rounded-3xl p-4">
        {categoryList?.map(({ slug, id, name }) => (
          <div
            onClick={() => navigateToCategory(slug)}
            key={id}
            className="hover:cursor-pointer hover:bg-slate-200 p-2 rounded-md hover:text-slate-500"
          >
            <h2 className="text-lg font-normal">{name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
