import Header from "./Header/Header";
import Footer from "./Footer/Footer";

// stateless
export default function Layout({children}) {
  return <div className="layout">
    <Header className="alternative"></Header>
      {children}
    <Footer><div className="dentroDeFooter">Dentro de footer</div></Footer>
  </div>
}