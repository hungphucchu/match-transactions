import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';

interface RejectDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  matchType: any;
  handleSelectChange: (value: string, field: string) => void;
}

const RejectDialog: React.FC<RejectDialogProps> = ({ open, onClose, onSubmit, matchType, handleSelectChange }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reject Match</DialogTitle>
      <DialogContent>
        <div>
          <FormLabel component="legend">Customer Name</FormLabel>
          <RadioGroup value={matchType.customerName} onChange={(e) => handleSelectChange(e.target.value, 'customerName')} row>
            <FormControlLabel value="full_match" control={<Radio />} label="Full Match" />
            <FormControlLabel value="partial_match" control={<Radio />} label="Partial Match" />
          </RadioGroup>

          <FormLabel component="legend">Order ID</FormLabel>
          <RadioGroup value={matchType.orderId} onChange={(e) => handleSelectChange(e.target.value, 'orderId')} row>
            <FormControlLabel value="full_match" control={<Radio />} label="Full Match" />
            <FormControlLabel value="partial_match" control={<Radio />} label="Partial Match" />
          </RadioGroup>

          <FormLabel component="legend">Product</FormLabel>
          <RadioGroup value={matchType.product} onChange={(e) => handleSelectChange(e.target.value, 'product')} row>
            <FormControlLabel value="full_match" control={<Radio />} label="Full Match" />
            <FormControlLabel value="partial_match" control={<Radio />} label="Partial Match" />
          </RadioGroup>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejectDialog;
