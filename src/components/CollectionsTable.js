import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axiosInstance from '../apis/axios';

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
      const response = await axiosInstance.get('/api/db/collections');
      setCollections(response.data.collectionInfo);
    };

    getAllCollections();
  }, []);

  useEffect(() => {
    const collectionRowsrows = [];

    setTimeout(() => {
      collections.map((collection, index) => {
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
