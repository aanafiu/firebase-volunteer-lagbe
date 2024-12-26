import { useContext, useState, useEffect } from "react";
import { UserContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "@/components/Common/Loader";
import axios from "axios";

const PrivateRoutes = ({ children }) => {
  const { user, loading, signOutUser } = useContext(UserContext);
  const location = useLocation();
  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(
            `https://backend-volunteer-lagbe.vercel.app/userinformation?email=${user.email}`
          );

          if (res.status === 200 && res.data.email === user.email) {
            setIsVerified(true);
          } else {
            throw new Error("Verification failed");
          }
        } catch (error) {
          axios.post("https://backend-volunteer-lagbe.vercel.app/logout",
            {},
            { withCredentials: true } 
          );
          signOutUser();
        }
      }
      setVerifying(false);
    };

    verifyUser();
  }, [user, signOutUser]);

  // Show loader if still verifying or global loading state
  if (loading || verifying) {
    return <Loader />;
  }

  // Render children if user is verified
  if (isVerified) {
    return children;
  }

  // Redirect to login page if not verified
  return <Navigate state={{ from: location }} to="/user/login" />;
};

export default PrivateRoutes;
