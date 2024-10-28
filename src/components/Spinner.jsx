import React from "react";
import { BounceLoader } from "react-spinners";

const Spinner = () => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return <BounceLoader color="#d83bd2" cssOverride={override} />;
};

export default Spinner;
