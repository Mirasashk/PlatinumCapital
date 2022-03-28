import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  Paper,
  MenuItem,
  TextField,
} from '@mui/material';

import axiosInstance from '../apis/axios';
import LeadsTable from '../components/LeadsTable';

const Leads = () => {
  const [collections, setCollections] = useState([]);
  const [colSelection, setColSelection] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!collections.length) {
      const getAllCollections = async () => {
        const response = await axiosInstance.get(
          '/api/db/collections'
        );
        setCollections(response.data.collectionInfo);
      };

      getAllCollections();
    }
  }, [collections.length]);

  useEffect(() => {
    setTimeout(() => {
      if (collections.length) {
        setColSelection(collections[0].collection.name);
        setDone(true);
      }
    }, 100);
  }, [collections]);

  const handleCollectionSelectionChange = (event) => {
    setColSelection(event.target.value);
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
              <Typography variant='h5'>Leads</Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 1, mt: 1, display: 'flex' }}>
              <TextField
                id='outlined-select-currency'
                select
                label='Select Collection'
                value={colSelection}
                onChange={handleCollectionSelectionChange}
                sx={{ ml: 4, width: 200 }}
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
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Paper>
              <LeadsTable collection={colSelection} />
            </Paper>
          </Box>
        </div>
      )}
    </>
  );
};

export default Leads;
