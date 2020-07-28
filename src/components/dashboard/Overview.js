import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../context/UserContext";
import Clients from "../Tables/Clients";
import BankAccounts from "../Tables/BankAccounts";
import Contracts from "../Tables/Contracts";
import Payments from "../Tables/Payments";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Overview() {
  const classes = useStyles();
  const userState = useContext(UserContext);

  return (
    <React.Fragment>
      <Clients />
      <BankAccounts />
      <Contracts />
      <Payments />
    </React.Fragment>
  );
}
