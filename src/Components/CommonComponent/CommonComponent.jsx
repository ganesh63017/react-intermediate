import { Outlet } from "react-router-dom";
import Header from "../Header/header";
import Categories from "../Home/Categories/Categories";
import Home from "../Home";

const CommonComponent = () => {
  // Render the common header component
  // The header component displays the navigation bar and other common elements
  return (
    <div className="min-h-full">
      {/* Render the common header */}
      <Header />
      <Home />
      {/* The Outlet component is a placeholder that renders the content of the current route */}
      <main className="">
        <div className="flex items-start justify-center pl-[270px] gap-10">
          <Categories className="bg-white shadow-xl min-h-4" />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CommonComponent;
