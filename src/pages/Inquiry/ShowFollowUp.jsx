import React from "react";
import { useParams } from "react-router-dom";

function ShowFollowUp() {
  const { id } = useParams();
  return (
    <div>
      <h1>Edit Property: {id}</h1>
    </div>
  );
}

export default ShowFollowUp;
