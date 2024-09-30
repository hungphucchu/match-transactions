import React, { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { message } from 'antd'; 
import ApiHelper from './helper/api.helper';
import ApproveDialog from './components/ApproveDialog';
import RejectDialog from './components/RejectDialog';
import MatchResultList from './components/MatchResultList';
import OrderTransactionList from './components/OrderTransactionList';
import OrderTransactionForm from './components/OrderTransactionForm';

const App: React.FC = () => {
  const [orders, setOrders] = useState('');
  const [transactions, setTransactions] = useState('');
  const [orderTransactions, setOrderTransactions] = useState<any[]>([]);
  const [matchResult, setMatchResult] = useState<any[]>([]);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [matchType, setMatchType] = useState({
    customerName: 'partial_match',
    orderId: 'partial_match',
    product: 'partial_match',
  });
  const [showOrderTransactions, setShowOrderTransactions] = useState(false); 

  useEffect(() => {
    const fetchOrderTransactions = async () => {
      try {
        const response = await ApiHelper.getOrderTransactions();
        if (response.success){
          setOrderTransactions(response?.data || []);
          message.success('Order Transactions fetched successfully!');
        }
      } catch (error) {
        message.error('Failed to fetch Order Transactions');
      }
    };

    if (approveDialogOpen) {
      fetchOrderTransactions();
    }
  }, [approveDialogOpen]);

  const handleMatchTransactions = async () => {
    try {
      const response = await ApiHelper.matchTransactions(JSON.parse(orders), JSON.parse(transactions));
      if (response.success){
        setMatchResult(response?.data || []);
        message.success('Match Transactions fetched successfully!');
      }
    } catch (error) {
      message.error('Failed to fetch Match Transactions');
    }
  };

  const createMatchTransactions = async () => {
    try {
        const response = await ApiHelper.createMatchTransactions(matchResult);
        if (response.success) message.success('Match Transactions created successfully!');
      
    } catch (error) {
      message.error('Failed to create Match Transactions');
    }
  }

  const handleApprove = async () => {
    if (matchResult.length > 0) await createMatchTransactions();
    setApproveDialogOpen(true);
  };

  const handleReject = () => {
    setRejectDialogOpen(true);
    setMatchResult([]);
  };

  const handleRejectSubmit = async () => {
    try {
      await ApiHelper.updateMatchTransactions(matchType);
      message.success('Match Transaction updated successfully!');
      setRejectDialogOpen(false);
    } catch (error) {
      message.error('Failed to update Match Transaction');
    }
  };

  const handleSelectChange = (value: string, field: string) => {
    setMatchType(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  
  const handleLetsMatchClick = () => {
    setShowOrderTransactions(false); 
    setMatchResult([]);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="20px"
    >
      {!showOrderTransactions ? (
        <>
          <Typography variant="h4" gutterBottom>
            Match Transactions
          </Typography>

          <OrderTransactionForm
            orders={orders}
            transactions={transactions}
            setOrders={setOrders}
            setTransactions={setTransactions}
            handleMatchTransactions={handleMatchTransactions}
          />

          {matchResult.length > 0 && (
            <MatchResultList
              matchResult={matchResult}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}
        </>
      ) : (
        <>
          {/* Show Order Transactions List */}
          <OrderTransactionList orderTransactions={orderTransactions} />

          {/* Button to switch back to form view */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleLetsMatchClick}
            style={{ marginTop: '20px' }}
          >
            Let's Match
          </Button>
        </>
      )}

      <ApproveDialog
        open={approveDialogOpen}
        onClose={() => setApproveDialogOpen(false)}
        onApprove={() => {
          setApproveDialogOpen(false);
          setShowOrderTransactions(true);
        }}
      />

      <RejectDialog
        open={rejectDialogOpen}
        matchType={matchType}
        handleSelectChange={handleSelectChange}
        onSubmit={handleRejectSubmit}
        onClose={() => setRejectDialogOpen(false)}
      />
    </Box>
  );
};

export default App;
