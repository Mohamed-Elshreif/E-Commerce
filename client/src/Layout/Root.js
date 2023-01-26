import { Outlet } from "react-router-dom";
import CartPreview from "../components/CartPreview";
import SnackbarMessage from "../components/SnackbarMessage";
import Footer from "../components/Footer";
import Header from "../components/Header";


function Root() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
      <CartPreview />
      <SnackbarMessage />
    </>
  );
}

export default Root;
