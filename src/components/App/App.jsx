import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "../../layout";
import Home from "../../pages/Home";
import SearchResults from "../../pages/SearchResults";
import ProtectedRoute from "../../pages/ProtectedRoute";
import PurchaseOrder from "../../pages/PurchaseOrder";
import Settings from "../../pages/Settings";
import WishList from "../../pages/WishList";

function App() {
  return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/profile"
            element={
              <ProtectedRoute 
                redirectTo="/login" 
                allowedRoles={["admin","customer","cliente"]}
              >
                {/* <Profile /> */}
              </ProtectedRoute>
            }/>
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <PurchaseOrder></PurchaseOrder>
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
  );
}

export default App;