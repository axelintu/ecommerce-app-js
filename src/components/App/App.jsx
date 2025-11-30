import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "../../context/CartContext";
import "./App.css";
import Layout from "../../layout";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import OrderConfirmation from "../../pages/OrderConfirmation/";
import Product from "../../pages/Product";
import Profile from "../../pages/Profile";
import Cart from "../../pages/Cart/Cart";
import SearchResults from "../../pages/SearchResults";
import ProtectedRoute from "../../pages/ProtectedRoute";
import Checkout from "../../pages/Checkout";
import Settings from "../../pages/Settings";
import WishList from "../../pages/WishList";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login /> } />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route 
              path="/profile"
              element={
              <ProtectedRoute 
                redirectTo="/login" 
                allowedRoles={["admin","customer","cliente"]}
              >
                <Profile />
              </ProtectedRoute>
            }/>
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout></Checkout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishList></WishList>
                </ProtectedRoute>
              }
            />
            <Route path="/order-confirmation" element={<OrderConfirmation/>} />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings></Settings>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div>Ruta no encontrada</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;