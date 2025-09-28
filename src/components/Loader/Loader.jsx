import "./Loader.css";

function Loader ({type, loadingMessage}) {
  function productsHTML(key) {
    return (<div key={key} className="product-card ld-el"><div className="img ld-placeholder"></div><div className="ld-placeholder">&nbsp;</div></div>);
  };
  let productsCollection = [];
  const numberOfPlaceHolders = 6;
  for (let i = 0; i < numberOfPlaceHolders; i++) {
    productsCollection.push(productsHTML(i));
  }
  const products = (
      <div className="products-grid ld-container">
        {productsCollection}
      </div>
  );

  let loader = '';
  const defaultLoader = (<div>Cargando...</div>);
  switch (type) {
    case 'products':
      loader = products;
      break;
    default:
      loader = defaultLoader;
      break;
  }
  return (<div
    className="loader">{loadingMessage ? (<div className="container home-products"><h3><span className="loader-spinner-line"></span> <span>{loadingMessage}</span></h3></div>): '<div></div>'}
    {loader}    
  </div>);
}

export default Loader;