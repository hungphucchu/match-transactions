import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface MatchResultListProps {
  matchResult: any[];
  onApprove: () => void;
  onReject: () => void;
}

const MatchResultList: React.FC<MatchResultListProps> = ({
  matchResult,
  onApprove,
  onReject,
}) => {
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
        Match Results
      </Typography>
      <ol style={{ paddingLeft: "20px" }}>
        {matchResult.map((match, index) => (
          <li key={index} style={{ marginBottom: "20px" }}>
            <Typography variant="body1">
              <strong>Order Details:</strong>
              <br />
              Type: {match.order?.type} <br />
              Customer Name: {match.order?.customerName} <br />
              Order ID: {match.order?.orderId} <br />
              Date: {match.order?.date} <br />
              Product: {match.order?.product} <br />
              Price: {match.order?.price} <br />
            </Typography>
            <Box mt={2} ml={4}>
              <Typography variant="body2">
                <strong>Transaction Details:</strong>
                {match.transactions?.map((transaction: any, tIndex: number) => (
                  <div key={tIndex} style={{ marginTop: "10px" }}>
                    Type: {transaction?.type} <br />
                    Customer Name: {transaction?.customerName} <br />
                    Order ID: {transaction?.orderId} <br />
                    Date: {transaction?.date} <br />
                    Product: {transaction?.product} <br />
                    Price: {transaction?.price} <br />
                  </div>
                ))}
              </Typography>
            </Box>
          </li>
        ))}
      </ol>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={onApprove}
          style={{ marginRight: "10px" }}
        >
          Approve
        </Button>
        <Button variant="contained" color="secondary" onClick={onReject}>
          Reject
        </Button>
      </Box>
    </Box>
  );
};

export default MatchResultList;
