import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface ApproveDialogProps {
  open: boolean;
  onClose: () => void;
  onApprove: () => void;
}

const ApproveDialog: React.FC<ApproveDialogProps> = ({ open, onClose, onApprove }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Approve Match</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to approve this match?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onApprove} color="primary">
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApproveDialog;
