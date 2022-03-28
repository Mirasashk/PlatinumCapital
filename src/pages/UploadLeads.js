import React, { useState, useEffect } from 'react';
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
  MenuItem,
} from '@mui/material';

import UploadTable from '../components/UploadTable';
import axios from 'axios';
import FileUploader from '../utils/FileUploader';

const UploadLeads = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [collections, setCollections] = useState([]);
  const [colSelection, setColSelection] = useState('');
  const [done, setDone] = useState(false);
  const [data, setData] = useState([]);
  const [showSendToDatabase, setShowSendToDatabase] = useState(false);
  const [dataToSend, setDataToSend] = useState([]);

  const onFileSelection = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  useEffect(() => {
    const getAllCollections = async () => {
      const response = await axios.get(
        'http://localhost:5000/api/db/collections'
      );
      setCollections(response.data.collectionInfo);
    };

    getAllCollections();
  }, []);

  useEffect(() => {
    if (collections) {
      setDone(true);
    }
  }, [collections]);

  const onUploadLeads = (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (!colSelection) {
    } else {
      setOpen(false);
      setFileUploaded(true);
      setShowSendToDatabase(true);
      if (selectedFile === null) {
        setOpen(false);
      } else {
        setOpen(false);
        setFileUploaded(true);
      }
    }
  };

  const handleCollectionSelectionChange = (event) => {
    setColSelection(event.target.value);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleSendToDatabase = () => {
    console.log(dataToSend);
    const tempDataToSend = {
      collection: colSelection,
      data: dataToSend,
    };
    axios.post(
      'http://localhost:5000/api/leads/uploadData',
      tempDataToSend
    );
  };

  return (
    <>
      {!done ? (
        <></>
      ) : (
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
              <Typography variant='h5'>Upload Leads</Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 1, mt: 1, display: 'flex' }}>
              <Button variant='contained' onClick={handleModalOpen}>
                Upload Leads
              </Button>
              {!showSendToDatabase ? (
                <></>
              ) : (
                <>
                  <Button
                    variant='contained'
                    onClick={handleSendToDatabase}
                    sx={{ ml: 4 }}
                  >
                    Send To Database
                  </Button>
                  <Typography variant='h6' sx={{ ml: 4 }}>
                    Collection: {colSelection}
                  </Typography>
                </>
              )}

              <Dialog
                open={open}
                onClose={handleModalClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  {`Upload a csv file with leads ?`}
                </DialogTitle>
                <DialogContent>
                  <TextField
                    id='outlined-select-currency'
                    select
                    label='Select Collection'
                    fullWidth
                    value={colSelection}
                    onChange={handleCollectionSelectionChange}
                    helperText='Please select collection'
                    sx={{ mt: 2, mb: 2 }}
                  >
                    {collections.map((option) => (
                      <MenuItem
                        key={option.collection.name}
                        value={option.collection.name}
                      >
                        {option.collection.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <br />
                  {/* <Input type='file' onChange={onFileSelection} /> */}
                  <FileUploader data={setData} />

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
                <UploadTable
                  data={data}
                  setDataToSend={setDataToSend}
                />
              </Paper>
            ) : (
              <></>
            )}
          </Box>
        </div>
      )}
    </>
  );
};
export default UploadLeads;
