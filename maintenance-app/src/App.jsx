// 📌 src/App.jsx
import { CartProvider } from "./context/CartContext";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import AdminOrders from "./components/AdminOrders";

function App() {
  return (
    <CartProvider>
      <div>
        <h1>eCommerce App</h1>
        <ProductList />
        <Cart />
        <CheckoutForm />
        <AdminOrders />
      </div>
    </CartProvider>
  );
}

export default App;
