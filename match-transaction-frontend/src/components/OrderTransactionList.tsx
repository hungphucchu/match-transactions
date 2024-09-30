import React from 'react';
import { Box, Typography } from '@mui/material';

interface OrderTransactionListProps {
  orderTransactions: any[];
}

const OrderTransactionList: React.FC<OrderTransactionListProps> = ({ orderTransactions }) => {
  return (
    <Box
      mt={4}
      p={3}
      width="80%"
      border="1px solid #ccc"
      borderRadius="8px"
      bgcolor="#fff"
      boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
    >
      <Typography variant="h5" gutterBottom>
        Order Transactions List
      </Typography>
      <ol style={{ paddingLeft: '20px' }}>
        {orderTransactions.map((orderTransaction, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <Typography variant="body1">
              <strong>Order Details:</strong><br />
              Customer Name: {orderTransaction.customerName} <br />
              Order ID: {orderTransaction.orderId} <br />
              Date: {orderTransaction.date} <br />
              Product: {orderTransaction.product} <br />
              Price: {orderTransaction.price} <br />
            </Typography>
            <Box mt={2} ml={4}>
              <Typography variant="body2">
                <strong>Transaction Details:</strong>
                {orderTransaction.transactions?.map((transaction: any, tIndex: number) => (
                  <div key={tIndex} style={{ marginTop: '10px' }}>
                    Type: {transaction?.type} <br />
                    Customer Name: {transaction?.customerName} <br />
                    Order ID: {transaction?.orderId} <br />
                    Date: {transaction?.date} <br />
                    Product: {transaction?.product} <br />
                    Price: {transaction?.price} <br />
                    Transaction Type: {transaction?.transactionType} <br />
                    Transaction Date: {transaction?.transactionDate} <br />
                    Transaction Amount: {transaction?.transactionAmount} <br />
                  </div>
                ))}
              </Typography>
            </Box>
          </li>
        ))}
      </ol>
    </Box>
  );
};

export default OrderTransactionList;
