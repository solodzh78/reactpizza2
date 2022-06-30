import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Search } from "../components/Search";

export const MainLayout = () => {
    return (
        <div className="wrapper">
            <Header><Search /></Header>
            <div className="content">
                <div className="container">
					<Outlet />
                </div>
            </div>
        </div>
    );
};
