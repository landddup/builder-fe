import React from "react";
import { useSelector } from "react-redux";

import { LoadingContainer } from "../../containers";

const Project = () => {
  const { projectLoading } = useSelector((state) => state.projects);

  return (
    <div>
      <LoadingContainer isLoading={projectLoading}></LoadingContainer>
    </div>
  );
};

export default Project;
