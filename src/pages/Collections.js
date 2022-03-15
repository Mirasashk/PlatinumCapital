import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from '@mui/material';

import axios from 'axios';
import CollectionsTable from '../components/CollectionsTable';

const Collections = () => {
  const [open, setOpen] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [updateTable, setUpdateTable] = useState(false);

  const handleCreateCollection = async (event) => {
    event.preventDefault();
    console.log(collectionName);
    setUpdateTable(true);
    const dataToSend = {
      name: collectionName,
    };
    await axios({
      method: 'post',
      url: 'http://localhost:5000/api/db/createCollection',
      data: dataToSend,
    });

    setCollectionName('');
    setOpen(false);
    setUpdateTable(false);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleTextOnChange = (e) => {
    setCollectionName(e.target.value);
  };

  return (
    <div>
      <Box
        component={Paper}
        sx={{
          p: 1,
          mt: 1,
        }}
        elevation={3}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant='h5'>Lead Collections</Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 1, mt: 1, display: 'flex' }}>
          <Button variant='contained' onClick={handleModalOpen}>
            Create Database Collection
          </Button>

          <Dialog
            open={open}
            onClose={handleModalClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {`Create a new collection for the Database`}
            </DialogTitle>
            <DialogContent>
              <TextField
                label='Name the collection'
                variant='standard'
                value={collectionName}
                fullWidth
                required
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 2,
                }}
                onChange={handleTextOnChange}
              />
              <DialogContentText id='alert-dialog-description'>
                This will create a new collection on the database.
                <br />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button
                variant='contained'
                onClick={handleCreateCollection}
                autoFocus
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Paper>{!updateTable ? <CollectionsTable /> : <></>}</Paper>
      </Box>
    </div>
  );
};

export default Collections;
