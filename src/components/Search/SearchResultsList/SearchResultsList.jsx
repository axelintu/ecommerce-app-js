import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../../../services/productService';
import List from '../../List';
import Button from "../../common/Button";
import Loading from '../../../components/common/Loading/Loading';
import { productDataAsString } from '../../../components/Product/shared/product';
import './SearchResultsList.css';

function SearchResultsList() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  
  const query = (searchParams.get("q") || "").trim();

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        if (isMounted) setProducts(data);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadProducts();
    return () => {
      isMounted = false;
    };
  },[]);
  
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredProducts = useMemo(() => {
    if (!query) return [];
    const normalizedQuery = query.toLowerCase();
    let result = products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(normalizedQuery);
      const matchesDescription = productDataAsString(product.description)
        ?.toLowerCase()
        .includes(normalizedQuery);
      const matchesCategory = product.category.name.toLowerCase().includes(normalizedQuery);
      const matchesArtist = product.artist.name.toLowerCase().includes(normalizedQuery);
      return  matchesName || matchesDescription || matchesCategory || matchesArtist;
    });
    result = result.sort((a,b)=>{
      let valA = sortBy === "price" ? a.price : a.name.toLowerCase();
      let valB = sortBy === "price" ? b.price : b.name.toLowerCase();
      
      if (valA<valB) return sortOrder === "asc" ? -1 : 1;
      if (valA>valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [query,products,sortBy,sortOrder]);

  const hasQuery = query.length > 0;
  const showNoResults = hasQuery && !loading && filteredProducts.length === 0;

  return (
    <div className="search-results search-results-container">
      <header className='search-results-header'>
        <div>
          <h1 className='search-results-title'>
            { hasQuery 
              ? `Resultados para ${query}` 
              : `Explora nuestro catálogo`
            }
          </h1>
          <p className='search-results-description'>
            { hasQuery
              ? `Estos son los productos que encontramos basados en tu búsqueda` 
              : `Usa la barra de búsqueda para encontrar rápidamente lo que necesitas.`
            }
          </p>
        </div>
      { hasQuery && (
        <div className="search-result-controls">
          <label htmlFor="">Ordernar por:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
          </select>
          <Button
            type='button'
            className="sort-btn"
            onClick={()=> setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "Ascendente": "Descendente"}
          </Button>
        </div>
      )}
      </header>
      {loading && (
        <Loading>
          <h3>Buscando productos...</h3>
          <p>Esto puede tomar unos segundos.</p>
        </Loading>
      )}
      {!loading && showNoResults && (
        <div className="search-results-message">
          <h3>No encontramos coincidencias</h3>
          <p>
            Prueba con otros términos o recorre nuestras{" "}
            <Link to="/offers">ofertas destacadas</Link>.
          </p>
        </div>
      )}
      {!loading && hasQuery && !showNoResults && (
        <List 
          products={filteredProducts}
          layout="vertical"
          title={`Resultados para "${query}"`}
        />
      )}
      {!loading && !hasQuery && (
        <div className="search-results-message">
          <h3>¿Buscas algo en especial?</h3>
          <p>
            Comienza a escribir en la barra de búsqueda y te mostraremos los
            resultados aquí mismo.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchResultsList;