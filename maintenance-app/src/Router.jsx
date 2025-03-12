import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panier" element={<CartPage />} />
        <Route path="/commandes" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
