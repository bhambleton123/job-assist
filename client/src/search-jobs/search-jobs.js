import React, { useState } from "react";
import {
  Box,
  makeStyles,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import JobSearchCard from "./job-search-card.js";

export default function SearchJobs() {
  const [role, setRole] = useState("");
  const [daysAgo, setDaysAgo] = useState(1);
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [jobs, setJobs] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const handleChange = (event) => {
    setExperience(event.target.value);
  };

  const submit = () => {
    setJobs([]);
    setShowSpinner(true);
    setAlert(false);
    axios
      .get(
        `/api/jobs/list?role=${role}&posted=${daysAgo}&page=0&location=${location.replace(
          / /g,
          "+"
        )}&experience=${experience}`
      )
      .then((res) => {
        console.log(res.data);
        setShowSpinner(false);
        setJobs(res.data);
      })
      .catch((err) => {
        if (err.response.status) {
          setAlert(true);
        }
      });
  };
  const theme = useTheme();
  const useStyles = makeStyles({
    search: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "40px",
      minWidth: "452px",
    },
    smallTextField: {
      width: "5vw",
    },
    bigTextField: {
      width: "10vw",
    },
    buttonRound: {
      borderRadius: "35px",
      height: "50px",
      backgroundColor: "#FE9696",
    },
    spinner: {
      margin: "30px",
    },
  });
  const classes = useStyles({});
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        className={classes.search}
        width="70%"
        height="70px"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pl="20px"
        pt="5px"
        pb="5px"
      >
        <TextField
          className={classes.bigTextField}
          noValidate
          autoComplete="off"
          label="Role"
          style={{ margin: 8 }}
          color="secondary"
          placeholder="i.e Software Engineer"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setRole(e.target.value)}
          value={role}
        />
        <Divider orientation="vertical" />
        <TextField
          className={classes.smallTextField}
          label="Location"
          style={{ margin: 8 }}
          color="secondary"
          placeholder="i.e New York City"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        <Divider orientation="vertical" />
        <FormControl style={{ margin: 8 }} className={classes.smallTextField}>
          <InputLabel shrink>Experience</InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={experience}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"entry_level"}>Entry Level</MenuItem>
            <MenuItem value={"mid_level"}>Mid Level</MenuItem>
            <MenuItem value={"senior_level"}>Senior Level</MenuItem>
          </Select>
        </FormControl>
        <Divider orientation="vertical" />
        <FormControl style={{ margin: 8 }} className={classes.smallTextField}>
          <InputLabel shrink>Job Posted</InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={daysAgo}
            onChange={(e) => setDaysAgo(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value="">30+</MenuItem>
          </Select>
        </FormControl>
        <Divider orientation="vertical" />
        <Box display="flex" flexDirection="column" alignSelf="center" mr="15px">
          <Button
            onClick={submit}
            variant="contained"
            className={classes.buttonRound}
          >
            Search
          </Button>
        </Box>
      </Box>

      {alert ? (
        <Box mt="20px">
          <Alert severity="error">Please enter a role</Alert>
        </Box>
      ) : (
        ""
      )}

      {jobs.map((job, i) => (
        <JobSearchCard
          key={i}
          title={job.title}
          company={job.company}
          location={job.location}
          link={job.link}
        />
      ))}
      {showSpinner && !alert ? (
        <CircularProgress className={classes.spinner} color="secondary" />
      ) : (
        ""
      )}
    </Box>
  );
}
