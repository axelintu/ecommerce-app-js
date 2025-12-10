import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../common/Loading';
import ErrorMessage from '../../common/ErrorMessage';
import ProductCard from '../../ProductCard'
import { getArtistById, getProductsByArtistAndChildren } from '../../../services/artistService';
import './ArtistProducts.css';

function ArtistProducts({ artistId }) {
  const [artist, setArtist] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);

  useEffect(()=>{
    setLoading(true);
    setError(null);

    const loadArtistAndProducts = async () => {
      try {
        const [artistData, productsData] = await Promise.all([
          getArtistById(artistId),
          getProductsByArtistAndChildren(artistId)
        ]);
        if (!artistData) {
          setError("Artista no encontrado");
          return;
        }

        setArtist(artistData);
        setProducts(productsData);
      } catch (error) {
        setError("Error al cargar el artista o productos");
      } finally {
        setLoading(false);
      }
    };

    loadArtistAndProducts();
  }, [artistId]);

  if (loading) {
    return (
      <div className="artist-products">
        <Loading>Cargando productos del artista...</Loading>
      </div>
    )
  }

  if (error || !artist) {
    return (
      <div className='artist-products'>
        <ErrorMessage message={error || "Artista no encontrado"}>
          <p className='artist-products-muted'>
            Vuelve al <Link to="/">inicio</Link> o explora nuestros artistas destacadas.
          </p>
        </ErrorMessage>
      </div>
    )
  }


  return (
    <div className="artist-products">
      <h1>
        { artist.name }</h1>
      {artist.description && (
        <p className="artist-products-muted">{artist.description}</p>
      )}
      { products.length > 0 ? (
        <div className="artist-products-grid products-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              orientation="vertical"
              className="card"
            />
          ))}
        </div>
      ) : (
        <ErrorMessage message="No se encontraron productos">
          <p className="artist-products-muted">
            No hay productos disponibles de este artista por el momento.
          </p>
        </ErrorMessage>
      )}
    </div>
  );
}

export default ArtistProducts;
