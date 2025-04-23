import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <div className="sticky top-5 z-50">

            <Header></Header>
            </div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;