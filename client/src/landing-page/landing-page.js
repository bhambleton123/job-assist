import React from "react";
import axios from "axios";
import { Box, makeStyles, Button, Typography } from "@material-ui/core";
import GoogleLogo from "../assets/Google__G__Logo.svg";
import Title from "../assets/Title.svg";

import Avatar from "@material-ui/core/Avatar";

export default function LandingPage() {
  const useStyles = makeStyles({
    top: {
      backgroundColor: "#FE9696",
    },
    buttonRound: {
      borderRadius: "20px 20px 20px 20px",
    },
    googleLogo: {
      width: "25px",
      height: "25px",
    },
    link: {
      textDecoration: "none",
    },
    person: {
      height: "auto",
      maxWidth: "78vw",
      minWidth: "36vw",
    },
    description: {
      width: "58vw",
      fontSize: "calc(10px + 1.5vw)",
    },
    search: {
      width: "58vw",
      fontSize: "calc(10px + 1.5vw)",
    },
    searchBox: {
      width: "58vw",
      height: "calc(2px + 5vh)",
      backgroundColor: "#C4C4C4",
      borderRadius: "20px 20px",
    },
  });
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.top} height="100vh">
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <Box id="button-container" mt="20px" mr="20px">
            <a
              className={classes.link}
              href="http://localhost:3000/api/auth/google"
            >
              <Button
                startIcon={
                  <img className={classes.googleLogo} src={GoogleLogo} />
                }
                className={classes.buttonRound}
                variant="contained"
                color="primary"
              >
                Log in
              </Button>
            </a>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" ml="17vw" mr="10vw">
          <Box mt="18vh">
            <img src={Title} className={classes.person} />
          </Box>
          <Typography color="primary" className={classes.description}>
            Organize your job search by having an all-in-one place for cover
            letters, contact info, resumes, and more!
          </Typography>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" mt="4vh">
        <Box textAlign="center">
          <Typography className={classes.search} color="primary">
            Search for Jobs
          </Typography>
        </Box>
        <Box ml="17vw">
          <Box className={classes.searchBox}></Box>
        </Box>
      </Box>
    </Box>
  );
}
