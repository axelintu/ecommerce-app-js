import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

// stateless
export default function Layout({children}) {
  return <div className="layout">
    <Header className="alternative"></Header>
      {children}
    <Footer><div className="dentroDeFooter">Dentro de footer</div></Footer>
  </div>
}