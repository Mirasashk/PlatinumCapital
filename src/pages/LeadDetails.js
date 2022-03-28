import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LeadDetails = () => {
  const [leadDetails, setLeadDetails] = useState([]);
  let params = useParams();

  useEffect(() => {
    const getLeadDetail = async () => {
      const lead = {
        _id: params.leadId,
      };
      const response = await axios.post(
        'http://localhost:5000/api/leads/leadDetails',
        lead
      );
      setLeadDetails(response);
      console.log(response.data);
    };

    getLeadDetail();
  }, []);

  return <div>LeadDetails for: {params.leadId}</div>;
};

export default LeadDetails;
