// 📌 src/App.jsx
import { CartProvider } from "./context/CartContext";
import AppRouter from "./Router";
import "./styles/styles.css";




function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
}

export default App;
