import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentSession } = useSelector((state) => state.session);

  console.log(currentSession);

  return <div></div>;
};

export default Profile;
