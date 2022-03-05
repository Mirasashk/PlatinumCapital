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
  Input,
  TextField,
  Autocomplete,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LeadsTable from '../components/LeadsTable';
import axios from 'axios';

const UploadLeads = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const onFileSelection = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const onUploadLeads = (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (selectedFile === null) {
      setOpen(false);
    } else {
      formData.append('myfile', selectedFile, selectedFile.name);
      console.log(formData.get('myfile'));
      axios
        .post(
          'http://localhost:5000/api/leads/uploadFile',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        .then((response) => {
          console.log(response);
        });
      setOpen(false);
      setFileUploaded(true);
    }
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
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
          <Typography variant='h5'>Leads</Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 1, mt: 1, display: 'flex' }}>
          <Button variant='contained' onClick={handleModalOpen}>
            Upload Leads
          </Button>
          <Dialog
            open={open}
            onClose={handleModalClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {`Upload a csv file with leads: ?`}
            </DialogTitle>
            <DialogContent>
              <Input type='file' onChange={onFileSelection} />

              <DialogContentText id='alert-dialog-description'>
                Are you sure you want to upload this file?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button
                variant='contained'
                onClick={onUploadLeads}
                autoFocus
              >
                Upload
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        {fileUploaded ? (
          <Paper>
            <LeadsTable />
          </Paper>
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
};
export default UploadLeads;
