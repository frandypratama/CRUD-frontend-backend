import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products/create"
          element={<CreateProduct />}
        />

        <Route
          path="/products/edit/:id"
          element={<EditProduct />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;