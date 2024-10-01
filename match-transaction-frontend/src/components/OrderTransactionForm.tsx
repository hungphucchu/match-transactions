import React from "react";
import { TextField, Button } from "@mui/material";

interface OrderTransactionFormProps {
  orders: string;
  transactions: string;
  handleMatchTransactions: () => void;
  setOrders: (value: string) => void;
  setTransactions: (value: string) => void;
}

const OrderTransactionForm: React.FC<OrderTransactionFormProps> = ({
  orders,
  transactions,
  setOrders,
  setTransactions,
  handleMatchTransactions,
}) => {
  return (
    <>
      <TextField
        label="Orders"
        fullWidth
        margin="normal"
        value={orders}
        onChange={(e) => setOrders(e.target.value)}
        multiline
        rows={4}
        sx={{ width: "80%", maxHeight: "50%" }}
      />

      <TextField
        label="Transactions"
        fullWidth
        margin="normal"
        value={transactions}
        onChange={(e) => setTransactions(e.target.value)}
        multiline
        rows={4}
        sx={{ width: "80%", maxHeight: "50%" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleMatchTransactions}
        style={{ marginTop: "20px", width: "200px" }}
      >
        Match Transactions
      </Button>
    </>
  );
};

export default OrderTransactionForm;
