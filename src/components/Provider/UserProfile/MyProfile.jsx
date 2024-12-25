import { UserContext } from "@/components/Provider/AuthProvider";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const MyProfile = () => {
  const { user } = useContext(UserContext);
  const [data,setData] = useState({});
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/userinformation?email=${user.email}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [user?.email]);
  console.log(data.email);
  return <div>{user?.displayName}</div>;
};

export default MyProfile;
