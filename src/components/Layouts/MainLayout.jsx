import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;