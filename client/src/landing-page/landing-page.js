import React from "react";
import {
  Box,
  makeStyles,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import GoogleLogo from "../assets/Google__G__Logo.svg";
import FakeJobCard from "./fake-job-card";
import Title from "../assets/Title.svg";

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
      borderRadius: "40px 40px",
    },
    fakeSearchButton: {
      width: "100px",
      height: "38px",
      backgroundColor: "#FE9696",
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
        <Box textAlign="center" mb="20px">
          <Typography className={classes.search} color="primary">
            Search for Jobs
          </Typography>
        </Box>
        <Box ml="17vw">
          <Box
            className={classes.searchBox}
            mb="20px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt="5px"
            pb="5px"
          >
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              height="100%"
              width="100%"
            >
              <Typography color="secondary">Software Engineer</Typography>
              <Divider orientation="vertical" color="primary" />
              <Typography color="secondary">NYC</Typography>
              <Divider orientation="vertical" color="primary" />
              <Typography color="secondary">Entry Level</Typography>
              <Divider orientation="vertical" color="primary" />
              <Typography color="secondary">Past 3 Days</Typography>
              <Divider orientation="vertical" color="primary" />
            </Box>
            <Box
              className={classes.fakeSearchButton}
              mr="17px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography color="primary">Search</Typography>
            </Box>
          </Box>
          <FakeJobCard />
          <FakeJobCard />
          <FakeJobCard />
        </Box>
      </Box>
    </Box>
  );
}
