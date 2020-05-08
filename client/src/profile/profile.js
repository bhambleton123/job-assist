import React from "react";
import { userContext } from "../context/user-context";
import { useHistory } from "react-router-dom";
import ProfileButton from "./profile-button";
import { Box } from "@material-ui/core";

export default function Profile() {
  let history = useHistory();
  return (
    <userContext.Consumer>
      {(value) => {
        if (value.user) {
          return (
            <Box display="flex" justifyContent="flex-end" mr="20px">
              <ProfileButton
                setUser={value.setUser}
                profilePic={value.user.profilePic}
              />
            </Box>
          );
        } else {
          history.push("/");
        }
      }}
    </userContext.Consumer>
  );
}
