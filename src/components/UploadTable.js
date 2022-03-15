import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';

function useData(rowLength, columnLength, tableData) {
  const [data, setData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    const rows = [];

    for (let i = 1; i < rowLength; i += 1) {
      const row = {
        id: i,
      };
      for (let j = 0; j <= columnLength - 1; j += 1) {
        row[`${tableData[0][j]}`] = `${tableData[i][j]}`;
      }
      rows.push(row);
    }
    const columns = [];
    for (let j = 0; j <= columnLength - 1; j += 1) {
      columns.push({
        field: `${tableData[0][j]}`,
        headerName: `${tableData[0][j]}`,
        minWidth: 170,
      });
    }

    setData({
      rows,
      columns,
    });
  }, [rowLength, columnLength]);

  return data;
}

export default function UploadTable(props) {
  const [done, setDone] = useState(false);
  const data = useData(
    props.data.data.length,
    props.data.data[0].length,
    props.data.data
  );

  useEffect(() => {
    console.log(data);
    props.setDataToSend(data.rows);
    setDone(true);
  }, [data]);

  return (
    <>
      {!done ? (
        <></>
      ) : (
        <div style={{ height: '70vh', width: '100%' }}>
          <DataGrid
            {...data}
            components={{
              Toolbar: GridToolbar,
            }}
            checkboxSelection
            ColumnResizeIcon
            rowsPerPageOptions={[25, 50, 100]}
            sx={{ bgColor: 'white' }}
          />
        </div>
      )}
    </>
  );
}
