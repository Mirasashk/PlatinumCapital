import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';

function createRow(id, collectionName, numberOfLeads) {
  return {
    id,
    collectionName,
    numberOfLeads,
  };
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'collectionName',
    headerName: 'Collection Name',
    width: 250,
  },
  {
    field: 'numberOfLeads',
    headerName: 'Leads in Collection',
    type: 'number',
    width: 200,
  },
];

const CollectionsTable = () => {
  const [collections, setCollections] = useState([]);
  const [done, setDone] = React.useState(false);

  const [rows, setRows] = useState([]);

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
    const collectionRowsrows = [];

    let id = 0;
    setTimeout(() => {
      collections.map((collection, index) => {
        id += 1;
        return collectionRowsrows.push(
          createRow(
            index,
            collection.collection.name,
            collection.count,
            24
          )
        );
      });
    }, 500);

    setRows(collectionRowsrows);
    setTimeout(() => {
      setDone(true);
    }, 700);
  }, [collections]);

  return (
    <>
      {!done ? (
        <></>
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            sx={{ bgColor: 'white' }}
          />
        </div>
      )}
    </>
  );
};

export default CollectionsTable;

// Tools for export, filter, sort, ETC. !!!!
// components={{
//     Toolbar: GridToolbar,
//   }}
