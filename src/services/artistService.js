import artists from "../data/artists.json";
import products from "../data/products.json";

export const fetchArtists = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(artists);
    }, 1200); // 1.2 segundos de delay
  });
};

export const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 800);
  });
};

export const searchArtists = async (query) => {
  const lowerQuery = query.trim().toLowerCase();
  return fetchArtists().then((data) =>
    data.filter(
      (cat) =>
        cat.name.toLowerCase().includes(lowerQuery) ||
        cat.description?.toLowerCase().includes(lowerQuery)
    )
  );
};

export const getArtistById = async (ArtistId) => {
  return fetchArtists().then((data) =>
    data.find((cat) => cat._id === ArtistId)
  );
};

// Obtener productos por categoría específica
export const getProductsByArtist = async (ArtistId) => {
  return fetchProducts().then((data) =>
    data.filter((product) => product.artist._id === ArtistId)
  );
};

// Obtener productos de una categoría incluyendo sus subcategorías
export const getProductsByArtistAndChildren = async (ArtistId) => {
  const allProducts = await fetchProducts();
  const allArtists = await fetchArtists();

  // Encontrar la categoría
  const artist = allArtists.find((art) => art._id === ArtistId);

  if (!artist) return [];

  return allProducts.filter((product) => product.artist._id === ArtistId);
};
