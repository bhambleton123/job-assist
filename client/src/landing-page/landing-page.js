import React from "react";
import {
  Box,
  makeStyles,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import GoogleLogo from "../assets/Google__G__Logo.svg";
import Title from "../assets/Title.svg";
import FakeSearch from "../assets/Search-Bar.svg";
import FakeCards from "../assets/Cards.svg";

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
      width: "54vw",
      fontSize: "calc(10px + 1.5vw)",
    },
    searchBox: {
      width: "70vw",
      pointerEvents: "none",
      useSelect: "none",
    },
  });
  const classes = useStyles();
  return (
    <>
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

        <Box display="flex" flexDirection="column" ml="10vw">
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
        <Box textAlign="center" mb="20px">
          <Typography className={classes.search} color="primary">
            Search for Jobs
          </Typography>
        </Box>
        <Box ml="17vw">
          <img src={FakeSearch} className={classes.searchBox} />
          <img src={FakeCards} className={classes.searchBox} />
        </Box>
      </Box>
    </>
  );
}
