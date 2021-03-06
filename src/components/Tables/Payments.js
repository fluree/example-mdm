import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import TableView from "./TableView";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { flureeQuery } from "../../utils/flureeFunctions";
import AddPayment from "../Forms/AddPayment";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Payments() {
  const classes = useStyles();
  const [payments, setPayments] = useState([]);
  const { path } = useRouteMatch();

  const fetchPayments = () => {
    const paymentQuery = {
      select: ["*", { bankAccount: ["_id"] }],
      from: "payment",
      opts: {
        compact: true,
      },
    };
    flureeQuery(paymentQuery)
      .then((res) => {
        console.log("payment", res);
        const flatPayments = res.data.map((payment) => {
          const displayDate = new Date(payment.date);
          return {
            _id: payment._id,
            amount: payment.amount,
            accountID: payment.bankAccount._id,
            displayDate: displayDate.toLocaleDateString(),
            date: payment.date,
          };
        });
        console.log("paymentdata", flatPayments);
        setPayments(flatPayments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <React.Fragment>
      {payments.length === 0 ? null : (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TableView
              title="Payments"
              data={payments}
              columns={["Payment ID", "Amount", "Account ID", "Date"]}
              values={["_id", "amount", "accountID", "displayDate"]}
            />
          </Paper>
        </Grid>
      )}
      {(path === "/dash/payments" ) && (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AddPayment fetch={fetchPayments} />
          </Paper>
        </Grid>
      )}
    </React.Fragment>
  );
}
