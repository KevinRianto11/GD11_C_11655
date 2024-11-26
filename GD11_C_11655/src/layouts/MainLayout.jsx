import { Outlet } from "react-router-dom";

import TopNavbar from "../components/TopNavbar";
import DynamicPageTitle from "../components/DynamicPageTitle";

const routes = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/login",
        name: "Dashboard",
    }
];

const MainLayout = () => {
    return (
        <div className="mt-4 pt-5">
            <DynamicPageTitle />
            <TopNavbar routes={routes} />
            <Outlet />
            <footer className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <span className="mb-3 mb-md-0 text-body-secondary">© 2024 by Grand Atma</span>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
