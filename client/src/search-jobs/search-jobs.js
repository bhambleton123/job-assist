import React from "react";
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
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export default function SearchJobs() {
  const [experience, setExperience] = React.useState("");

  const handleChange = (event) => {
    setExperience(event.target.value);
  };

  const theme = useTheme();
  const useStyles = makeStyles({
    search: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "40px",
    },
    smallTextField: {
      width: "20%",
    },
    bigTextField: {
      width: "30%",
    },
    buttonRound: {
      borderRadius: "20px 20px 20px 20px",
      backgroundColor: "#FE9696",
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
        width="75%"
        height="70px"
        display="flex"
        flexDirection="row"
      >
        <Box ml="30px" width="88%">
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
          />
          <TextField
            className={classes.smallTextField}
            label="Location"
            style={{ margin: 8 }}
            color="secondary"
            placeholder="i.e New York City"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl style={{ margin: 8 }} className={classes.smallTextField}>
            <InputLabel shrink>Experience Level</InputLabel>
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
              <MenuItem value={"Entry"}>Entry Level</MenuItem>
              <MenuItem value={"Intermediate"}>Intermediate Level</MenuItem>
              <MenuItem value={"Expert"}>Expert Level</MenuItem>
            </Select>
          </FormControl>

          <TextField
            className={classes.smallTextField}
            label="Job Posted"
            style={{ margin: 8 }}
            color="secondary"
            placeholder="i.e Past 3 days"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Box display="flex" flexDirection="column" alignSelf="center">
          <Button variant="contained" className={classes.buttonRound}>
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
