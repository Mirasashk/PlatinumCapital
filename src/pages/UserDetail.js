import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Typography,
  Box,
  Paper,
  IconButton,
  Button,
  Stack,
  Avatar,
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { getDatabase, ref, child, get } from 'firebase/database';

const UserDetail = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [done, setDone] = useState(false);
  const dbRef = ref(getDatabase());
  let params = useParams();

  useEffect(() => {
    console.log(params.userid);
    const userDetail = async () => {
      await get(child(dbRef, `users/${params.userid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserDetails(snapshot.val());
            console.log(snapshot.val());
            setDone(true);
          } else {
            console.log('No Data available');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    userDetail();
  }, [dbRef, params.userid]);

  const onDisplayNameEdit = () => {
    console.log('hello');
  };

  const onEmailEdit = () => {
    console.log('hello');
  };

  const onAccessEdit = () => {
    console.log('hello');
  };

  return (
    <>
      {!done ? (
        <></>
      ) : (
        <Grid>
          <Typography variant='h4' sx={{ mb: 3 }}>
            My Account information
          </Typography>
          <Grid sx={{ width: '100%' }}>
            <Grid
              sx={{
                width: '100%',
                justifyContent: 'left',
              }}
            >
              <Box
                component={Paper}
                sx={{
                  p: 1,
                  mt: 1,
                  pb: 7,
                  borderRadius: 3,
                }}
                elevation={3}
              >
                <Grid
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 3,
                    mb: 4,
                  }}
                >
                  <Avatar
                    alt='Remy Sharp'
                    src=''
                    sx={{
                      width: 128,
                      height: 128,
                      justifyContent: 'center',
                    }}
                  />
                </Grid>
                <Box
                  xs={3}
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Stack direction='row' spacing={6} sx={{ pl: 3 }}>
                    <Stack>
                      <Typography sx={{ p: 1 }} variant='h6'>
                        Display Name:
                      </Typography>
                      <Typography sx={{ p: 1 }} variant='h6'>
                        Email Address:
                      </Typography>
                      <Typography sx={{ p: 1 }} variant='h6'>
                        Access Level:
                      </Typography>
                      <Typography sx={{ p: 1 }} variant='h6'>
                        Last Login:
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography sx={{ p: 1 }} variant='h6'>
                        {userDetails.displayName}
                      </Typography>
                      <Typography sx={{ p: 1 }} variant='h6'>
                        {userDetails.email}
                      </Typography>
                      <Typography sx={{ p: 1 }} variant='h6'>
                        {userDetails.access}
                      </Typography>
                      <Typography sx={{ p: 1 }} variant='h6'>
                        04/21/2022
                      </Typography>
                    </Stack>
                    <Stack>
                      <IconButton
                        sx={{ mr: 3 }}
                        onClick={onDisplayNameEdit}
                      >
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ mt: 1, mr: 3 }}
                        onClick={onEmailEdit}
                      >
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ mt: 1, mr: 3 }}
                        onClick={onAccessEdit}
                      >
                        <ModeEditIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Box>
                <Grid
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    pt: 4,
                  }}
                >
                  <Button
                    variant='contained'
                    color='error'
                    sx={{ fontWeight: 600, fontSize: '1rem' }}
                  >
                    Delete User
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserDetail;
