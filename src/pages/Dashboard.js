import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import {
  Button,
  Box,
  Paper,
  Typography,
  Divider,
  TextField,
  Icon,
  Grid,
} from '@mui/material';
import axios from 'axios';
import GroupWorkIcon from '@mui/icons-material/GroupWork';

const Dashboard = () => {
  const [numOfCollection, setNumOfCollection] = useState(0);
  let [numOfLeads, setNumOfLeads] = useState(0);
  const [done, setDone] = useState(false);
  const [users, setUsers] = useState([]);
  const auth = getAuth();
  let count = 0;

  useEffect(() => {
    const numOfCol = async () => {
      const response = await axios.get(
        'http://localhost:5000/api/db/collections'
      );
      setNumOfCollection(response.data.collectionInfo.length);
      response.data.collectionInfo.map((collection) => {
        count = count + collection.count;
        console.log(collection.count);
      });
      setNumOfLeads(count);
    };
    const getAllUsers = async () => {
      const fbUsers = await axios.get('http://localhost:5000/auth');

      setUsers(fbUsers.data.users.users);
    };

    getAllUsers();

    numOfCol();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(numOfCollection);
      if (numOfCollection != 0) {
        setDone(true);
      }
    }, 500);
  }, [numOfCollection]);

  return (
    <>
      {!done ? (
        <></>
      ) : (
        <Grid>
          <Grid
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              component={Paper}
              sx={{
                p: 1,
                mt: 1,
                height: 150,
                width: '30%',
                borderRadius: 3,
                mr: '5%',
              }}
              elevation={3}
            >
              <Box xs={3}>
                <Grid sx={{ p: 1 }}>
                  <Typography variant='h5'>Collections</Typography>
                </Grid>
                <Grid sx={{ p: 1 }}>
                  <Typography
                    variant='h4'
                    sx={{ ml: 3, textAlign: 'right', mr: 4 }}
                  >
                    {numOfCollection}
                  </Typography>
                </Grid>
              </Box>
            </Box>
            <Box
              component={Paper}
              sx={{
                p: 1,
                mt: 1,
                height: 150,
                width: '30%',
                borderRadius: 3,
              }}
              elevation={3}
            >
              <Box xs={3}>
                <Grid sx={{ p: 1 }}>
                  <Typography variant='h5'>Leads</Typography>
                </Grid>
                <Grid sx={{ p: 1 }}>
                  <Typography
                    variant='h4'
                    sx={{ ml: 3, textAlign: 'right', mr: 4 }}
                  >
                    {numOfLeads}
                  </Typography>
                </Grid>
              </Box>
            </Box>
            <Box
              component={Paper}
              sx={{
                p: 1,
                mt: 1,
                height: 150,
                width: '30%',
                borderRadius: 3,
                ml: '5%',
              }}
              elevation={3}
            >
              <Box xs={3}>
                <Grid sx={{ p: 1 }}>
                  <Typography variant='h5'>Users</Typography>
                </Grid>
                <Grid sx={{ p: 1 }}>
                  <Typography
                    variant='h4'
                    sx={{ ml: 3, textAlign: 'right', mr: 4 }}
                  >
                    {users.length}
                  </Typography>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <Box
              component={Paper}
              sx={{
                p: 1,
                mt: 1,
                height: 500,
                width: '100%',
                borderRadius: 3,
                display: 'flex',
              }}
              elevation={3}
            >
              <Box xs={3}>
                <Grid sx={{ p: 1 }}>
                  <Typography variant='h5'>
                    Campaign Information
                    <br />
                    <br />
                    With graph goes here
                  </Typography>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
