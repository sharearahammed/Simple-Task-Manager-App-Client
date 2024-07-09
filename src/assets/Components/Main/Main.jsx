import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

const Main = () => {
    return (
        <div>
            <div className="mx-auto max-w-6xl">
            <Navbar />
            <Outlet />
        </div>
        <Footer />
        </div>
    );
};

export default Main;