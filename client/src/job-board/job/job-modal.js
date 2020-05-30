import React from "react";
import { makeStyles, Modal } from "@material-ui/core";
import JobDetails from "./job-details";

export default function JobModal({
  title,
  company,
  description,
  link,
  location,
  showModal,
  setShowModal,
}) {
  const useStyles = makeStyles({
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={showModal}
      onClose={() => setShowModal(false)}
    >
      <JobDetails
        title={title}
        company={company}
        description={description}
        link={link}
        location={location}
      />
    </Modal>
  );
}
