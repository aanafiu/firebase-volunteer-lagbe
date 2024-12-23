import { useContext } from "react";
import { UserContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "./Loader";
import Loader from "@/components/Common/Loader";

const PrivateRoutes = ({children}) => {

const {user, loading} = useContext(UserContext);
const location = useLocation();
console.log(location);
    if(loading)
    {
        return <Loader></Loader>
    }

    if(user && user?.email )
    {
        return children;
    }

    return <Navigate state={location.pathname} to={"/user/login"}></Navigate>
};

export default PrivateRoutes;