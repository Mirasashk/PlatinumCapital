import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';

export default function LeadsTable(props) {
  const [leads, setLeads] = useState([]);
  const [done, setDone] = useState(false);
  const [collection, setCollection] = useState('');
  const [columns, setColumns] = useState([]);
  const tempColumns = [];

  useEffect(() => {
    if (props.collection != '') {
      const collectionName = {
        name: props.collection,
      };
      const getAllLeads = async () => {
        const response = await axios.post(
          'http://localhost:5000/api/leads',
          collectionName
        );
        setLeads(response.data.leads);
      };

      getAllLeads();
    }
  }, [collection, props.collection]);

  useEffect(() => {
    try {
      const keys = Object.keys(leads[0]);

      keys.map((key) => {
        const temp = {
          field: key,
          headerName: key,
          width: 175,
        };
        tempColumns.push(temp);
      });

      setColumns(tempColumns);
      setDone(true);
    } catch (err) {}
  }, [leads]);

  return (
    <>
      {!done ? (
        <></>
      ) : (
        <div style={{ height: '70vh', width: '100%' }}>
          <DataGrid
            rows={leads}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            checkboxSelection
            ColumnResizeIcon
            pageSize={100}
            rowsPerPageOptions={[10, 25, 50, 100, 250, 500, 1000]}
            sx={{ bgColor: 'white' }}
          />
        </div>
      )}
    </>
  );
}
