import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Store from "./Components/Home/Stores/Store";
import CommonComponent from "./Components/CommonComponent/CommonComponent";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/all-stores" />}></Route>
        <Route element={<CommonComponent />}>
          <Route exact path="/all-stores" element={<Store />}></Route>
          <Route
            exact
            path="/category/:categorySlug"
            element={<Store />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
