import React from "react";
import { userContext } from "../context/user-context";
import { useHistory } from "react-router-dom";
import ProfileButton from "./profile-button";
import { Box } from "@material-ui/core";

export default function Profile() {
  let history = useHistory();
  return (
    <>
      <userContext.Consumer>
        {(value) => {
          if (!(value && value.email)) {
            history.push("/");
          } else {
            return (
              <Box display="flex" justifyContent="flex-end">
                <ProfileButton profilePic={value.profilePic} />
              </Box>
            );
          }
        }}
      </userContext.Consumer>
    </>
  );
}
