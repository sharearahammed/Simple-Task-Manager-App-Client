import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";

const Main = () => {
    return (
        <div className="mx-auto max-w-6xl">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Main;