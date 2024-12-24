import { UserContext } from "@/components/Provider/AuthProvider";
import axios from "axios";
import React, { useContext, useEffect } from "react";

const MyProfile = () => {
  const { user } = useContext(UserContext);

  return <div>{user?.displayName}</div>;
};

export default MyProfile;
