import "./Loader.css";

function Loader ({type}) {
 const products = (
    
      <div className="products-grid ld-container">
        <div className="product-card ld-el"><div className="img ld-placeholder"></div><div className="ld-placeholder">&nbsp;</div></div>
        <div className="product-card ld-el"><div className="img ld-placeholder"></div><div className="ld-placeholder">&nbsp;</div></div>
        <div className="product-card ld-el"><div className="img ld-placeholder"></div><div className="ld-placeholder">&nbsp;</div></div>
        <div className="product-card ld-el"><div className="img ld-placeholder"></div><div className="ld-placeholder">&nbsp;</div></div>
        <div className="product-card ld-el"><div className="img ld-placeholder"></div><div className="ld-placeholder">&nbsp;</div></div>
        <div className="product-card ld-el"><div className="img ld-placeholder"></div><div className="ld-placeholder">&nbsp;</div></div>
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
    className="loader"
    style={{
      textAlign: "center",
      padding: "2rem",
      background: "var(--surface)",
      borderRadius: "18px",
      border: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {loader}    
  </div>);
}

export default Loader;