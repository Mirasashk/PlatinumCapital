import React, { useState } from 'react';
import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate, Outlet } from 'react-router-dom';

const categories = [
  {
    value: 'phone',
    label: 'Phone Number',
  },
  {
    value: 'email',
    label: 'Email Address',
  },
  {
    value: 'lastName',
    label: 'Last Name',
  },
  {
    value: 'state',
    label: 'State',
  },
];

const LeadLookUp = () => {
  const [category, setCategory] = useState('phone');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState({ columns: [], rows: [] });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchClick = async () => {
    const search = {
      category: category,
      term: searchTerm,
    };
    const results = await axios.post(
      'http://localhost:5000/api/lead/lookup',
      search
    );

    console.log(results);

    // const rows = [];
    // console.log(results.data.data[0].length);

    // for (let i = 1; i < results.data.data.length + 1; i += 1) {
    //   const row = {
    //     id: i,
    //   };
    //   for (let j = 0; j <= results.data.data[0].length - 1; j += 1) {
    //     row[
    //       `${results.data.data[0][j]}`
    //     ] = `${results.data.data[i][j]}`;

    //     rows.push(row);
    //   }
    // }
    // const columns = [];
    // for (let j = 0; j <= results.data.data[0].length - 1; j += 1) {
    //   const tempStr = results.data.data[0][j];

    //   console.log(tempStr);

    //   columns.push({
    //     field: tempStr,
    //     headerName: `${results.data.data[0][j]}`,
    //     minWidth: 170,
    //   });
    // }

    const rows = [];
    const columns = [];
    const tableData = results.data.data;
    if (tableData.length > 0) {
      tableData.map((row) => {
        rows.push(row);
      });

      const columnKeys = Object.keys(rows[0]);

      columnKeys.map((key) => {
        columns.push({
          field: key,
          headerName: key,
          width: 150,
        });
      });

      setData({
        rows,
        columns,
      });
      setShowTable(true);
    }
  };

  const onRowSelected = (event) => {
    console.log(event);
    const leadId = event.row._id;
    navigate(`/lead/lookup/${leadId}`);
  };

  return (
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
            width: '100%',
            borderRadius: 3,
          }}
          elevation={3}
        >
          <Box xs={3}>
            <Grid sx={{ p: 1 }}>
              <Typography variant='h5'>Lead Lookup</Typography>
            </Grid>
            <Grid sx={{ p: 1 }}>
              <TextField
                id='outlined-select-currency'
                select
                label='Select'
                value={category}
                onChange={handleChange}
                sx={{ width: '20%' }}
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                sx={{ ml: 3, width: '25%' }}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <Button
                variant='contained'
                size='large'
                sx={{ pt: 2, pb: 2, ml: 3, width: '15%' }}
                onClick={() => {
                  handleSearchClick();
                }}
              >
                Search
              </Button>
            </Grid>
          </Box>
        </Box>
      </Grid>
      {showTable ? (
        <>
          <Grid sx={{ mt: 3 }}>
            <Paper sx={{ height: '70vh', width: '100%' }}>
              <DataGrid
                {...data}
                pageSize={15}
                rowsPerPageOptions={[5, 10, 15]}
                onRowClick={(e) => {
                  onRowSelected(e);
                }}
              />
            </Paper>
          </Grid>
        </>
      ) : (
        <></>
      )}
      <Outlet />
    </Grid>
  );
};

export default LeadLookUp;
