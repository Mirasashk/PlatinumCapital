import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

import axiosInstance from '../apis/axios';

const LeadDetails = () => {
  const [leadDetails, setLeadDetails] = useState([]);
  const [done, setDone] = useState(false);
  let params = useParams();

  useEffect(() => {
    const getLeadDetail = async () => {
      const lead = {
        _id: params.leadId,
      };
      const response = await axiosInstance.post(
        '/leads/leadDetails',
        lead
      );
      setLeadDetails(response.data.lead);
    };

    getLeadDetail();
  }, [params.leadId]);

  useEffect(() => {
    console.log(leadDetails);
    setDone(true);
  }, [leadDetails]);

  return (
    <div>
      {!done ? (
        <></>
      ) : (
        <Box
          component={Paper}
          sx={{
            p: 1,
            mt: 1,
          }}
          elevation={3}
        >
          <Box sx={{ p: 1 }}>
            <Typography variant='h5'>User Details</Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 1, mt: 2 }}>
            <Typography sx={{ mt: 1 }}>
              <b>Name:</b> {leadDetails.firstName}{' '}
              {leadDetails.lastName}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <b>Email:</b> {leadDetails.emailAddress}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <b>Email Status:</b> {leadDetails.emailStatus}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <b>State:</b> {leadDetails.state}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <b>Phone Home:</b> {leadDetails.phoneHome}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <b>Phone Home 2:</b> {leadDetails.phoneHome2}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <b>Phone Mobile:</b> {leadDetails.phoneMobile}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <b>Phone work:</b> {leadDetails.phoneWork}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <b>Phone work 2:</b> {leadDetails.phoneWork2}
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default LeadDetails;
