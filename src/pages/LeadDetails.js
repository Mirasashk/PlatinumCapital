import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Stack,
} from '@mui/material';

import axiosInstance from '../apis/axios';

const LeadDetails = () => {
  const [leadDetails, setLeadDetails] = useState([]);
  const [done, setDone] = useState(false);
  let params = useParams();
  const leadDetailArray = [];

  useEffect(() => {
    const getLeadDetail = async () => {
      const lead = {
        _id: params.leadId,
      };
      const response = await axiosInstance.post(
        '/leads/leadDetails',
        lead
      );

      for (var key in response.data.lead) {
        if (response.data.lead[key] === '') {
          response.data.lead[key] = 'N/A';
        }
      }
      console.log(response.data.lead);
      setLeadDetails(response.data.lead);
    };

    getLeadDetail();
  }, [params.leadId]);

  useEffect(() => {
    setTimeout(() => {
      console.log(leadDetails);
      setDone(true);
    }, 1000);
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
          <Box sx={{ p: 1, mt: 2, pl: 3 }}>
            <Stack direction={'row'}>
              <Stack spacing={2}>
                {/* ########################################################## */}
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
                  <b>Email Status:</b>{' '}
                  {leadDetails.emailPermissionStatus}
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
              </Stack>
              {/* ########################################################## */}
              <Stack spacing={2} sx={{ pl: 12 }}>
                <Typography sx={{ mt: 1 }}>
                  <b>Birthday:</b> {leadDetails.birthday}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Address:</b> {leadDetails.streetAddressLine1Home}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>City:</b> {leadDetails.cityHome}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Zip Code:</b> {leadDetails['zip/PostalCodeHome']}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>State:</b> {leadDetails['state/ProvinceHome']}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Income:</b> {leadDetails.income}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Estimated Debt:</b> {leadDetails.estD}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Debt to income:</b> {leadDetails.dTC}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Fico Score:</b> {leadDetails['f#']}
                </Typography>
              </Stack>
              {/* ########################################################## */}
              <Stack spacing={2} sx={{ pl: 12 }}>
                <Typography sx={{ mt: 1 }}>
                  <b>Date:</b> {leadDetails.date}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Employment Status:</b>{' '}
                  {leadDetails.employmentStatus}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Co - Borrower Email:</b>{' '}
                  {leadDetails.coBorrowerEmail}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Co - Borrower Employment:</b>{' '}
                  {leadDetails.coBorrowerEmploymentStatus}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Co - Fico:</b> {leadDetails.coFico}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>co - NetIncome:</b> {leadDetails.coNetIncome}
                </Typography>
              </Stack>
              {/* ########################################################## */}
              <Stack spacing={2} sx={{ pl: 12 }}>
                <Typography sx={{ mt: 1 }}>
                  <b>Confirmed Opt-Out Date:</b>{' '}
                  {leadDetails.confirmedOptOutDate}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Confirmed Opt-Out Reason:</b>{' '}
                  {leadDetails.confirmedOptOutReason}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Confirmed Opt-Out Source:</b>{' '}
                  {leadDetails.confirmedOptOutSource}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Lead created at:</b> {leadDetails.createdAt}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Email List:</b> {leadDetails.emailLists}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default LeadDetails;
