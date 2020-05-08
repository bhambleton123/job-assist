import React from "react";
import { userContext } from "../context/user-context";
import { useHistory } from "react-router-dom";

export default function Profile() {
  let history = useHistory();
  return (
    <>
      <userContext.Consumer>
        {(value) => {
          if (!(value && value.email)) {
            history.push("/");
          } else {
            return <p>{value.email}</p>;
          }
        }}
      </userContext.Consumer>
    </>
  );
}
