import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { flureeQuery } from "../../utils/flureeFunctions";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableView from "./TableView";
import AddClient from "../Forms/AddClient";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Clients() {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const [clients, setClients] = useState([]);

  const { promiseInProgress } = usePromiseTracker();

  const fetchClients = () => {
    const clientsQuery = {
      select: ["*"],
      from: "client",
      opts: {
        compact: true,
      },
    };
    trackPromise(
      flureeQuery(clientsQuery)
        .then((res) => {
          console.log(res);
          const cleanClients = res.data.map((client) => {
            let status = client.dealStage.replace(/[[\]"]/g, "");
            status = status[0].toUpperCase() + status.slice(1);
            return { ...client, dealStage: status };
          });
          setClients(cleanClients);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };

  useEffect(() => {
    if (clients.length === 0) {
      fetchClients();
    }
  }, [clients]);

  return (
    <React.Fragment>
      {promiseInProgress === true ? (
        <CircularProgress />
      ) : (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TableView
              title="Clients"
              data={clients}
              columns={["Account #", "Name", "Email", "Stage"]}
              values={["account", "name", "email", "dealStage"]}
            />
          </Paper>
        </Grid>
      )}
      {path === "/dash/clients" && (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AddClient fetch={fetchClients} />
          </Paper>
        </Grid>
      )}
    </React.Fragment>
  );
}
