import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axiosInstance from '../apis/axios';

const LeadDetails = () => {
  const [leadDetails, setLeadDetails] = useState([]);
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
      console.log(response.data);
    };

    getLeadDetail();
  }, [params.leadId]);

  useEffect(() => {
    console.log(leadDetails);
  }, [leadDetails]);

  return <div>LeadDetails for: {params.leadId}</div>;
};

export default LeadDetails;
