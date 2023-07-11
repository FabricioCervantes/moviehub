import React from "react";
import PersonProfile from "@components/PersonProfile";

const Person = ({ params }) => {
  const personId = params?.id;

  return (
    <div>
      <PersonProfile id={personId} />
    </div>
  );
};

export default Person;
