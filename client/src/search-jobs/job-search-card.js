import React, { useState } from "react";
import {
  Box,
  makeStyles,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import renderHTML from "react-render-html";
import axios from "axios";

export default function JobSearchCard({ title, location, company, link }) {
  const [description, setDescription] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      width: "60%",
      margin: "60px 0 0 0",
    },
    companyText: {
      fontSize: "18px",
      marginTop: "20px",
      marginLeft: "20px",
    },
    addText: {
      fontSize: "60px",
    },
  });
  const classes = useStyles({});

  const getDescription = () => {
    setShowSpinner(true);
    axios
      .get(`/api/jobs/description?url=${link.toString()}`)
      .then((res) => {
        setShowSpinner(false);
        setDescription(res.data.toString());
      })
      .catch((err) => {
        setShowSpinner(false);
        console.error(err);
      });
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography>{renderHTML(title)}</Typography>
            <Typography>{location}</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography className={classes.companyText}>{company}</Typography>
            <Button>
              <Typography color="secondary" className={classes.addText}>
                +
              </Typography>
            </Button>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {!description && !showSpinner ? (
            <Button size="small" onClick={getDescription}>
              <Typography color="secondary">Expand</Typography>
            </Button>
          ) : (
            ""
          )}
          {showSpinner ? <CircularProgress color="secondary" /> : ""}
          {description.length > 0 ? <Box>{renderHTML(description)}</Box> : ""}
        </Box>
      </CardActions>
    </Card>
  );
}
