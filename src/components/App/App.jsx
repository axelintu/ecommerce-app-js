import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "../../layout";
import Home from "../../pages/Home";
import SearchResults from "../../pages/SearchResults";

function App() {
  return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<div>Ruta no encontrada</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
  );
}

export default App;