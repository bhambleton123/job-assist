import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, makeStyles } from "@material-ui/core";
import Title from "../assets/Title.svg";
import { useHistory } from "react-router-dom";
import Dashboard from "../dashboard/dashboard";
import JobBoard from "../job-board/job-board";
import SearchJobs from "../search-jobs/search-jobs";

export default function PageNavigator({ page }) {
  const [value, setValue] = useState(page);
  const [role, setRole] = useState("");
  const [daysAgo, setDaysAgo] = useState(1);
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles({
    title: {
      width: "200px",
      marginBottom: "40px",
      marginLeft: "30px",
    },
  });
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    history.push(`/${value}`);
  }, [value]);
  return (
    <Box display="flex">
      <Box display="flex" flexDirection="column">
        <img src={Title} className={classes.title} />
        <Tabs
          orientation="vertical"
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          onChange={handleChange}
          value={value}
        >
          <Tab label="Dashboard" value="dashboard" />
          <Tab label="Search" value="search-jobs" />
          <Tab label="Job Board" value="job-board" />
        </Tabs>
      </Box>
      <Box>
        {() => {
          if (page === "dashboard") {
            return <Dashboard />;
          } else if (page === "search-jobs") {
            return (
              <SearchJobs
                role={role}
                setRole={setRole}
                daysAgo={daysAgo}
                setDaysAgo={setDaysAgo}
                location={location}
                setLocation={setLocation}
                experience={experience}
                setExperience={setExperience}
                jobs={jobs}
                setJobs={setJobs}
              />
            );
          } else if (page === "job-board") {
            return <JobBoard />;
          }
        }}
      </Box>
    </Box>
  );
}
