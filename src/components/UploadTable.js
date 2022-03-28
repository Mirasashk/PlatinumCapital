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
        const tempColumn = camelize(tableData[0][j]);
        if (
          (tempColumn == 'phoneHome' ||
            tempColumn == 'phoneHome2' ||
            tempColumn == 'phoneMobile' ||
            tempColumn == 'phoneWork' ||
            tempColumn == 'phoneWork2') &&
          tableData[i][j] != undefined
        ) {
          console.log(tableData[i][j]);
          row[`${tempColumn}`] = `${camelize(tableData[i][j])}`;
        } else {
          row[`${tempColumn}`] = `${tableData[i][j]}`;
        }
      }
      rows.push(row);
    }
    const columns = [];
    for (let j = 0; j <= columnLength - 1; j += 1) {
      const tempStr = camelize(tableData[0][j]);

      console.log(tempStr);

      columns.push({
        field: tempStr,
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

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '')
    .replace(/-/g, '')
    .replace(/[()]/g, '');
}

function decamelize(str, separator) {
  separator = typeof separator === 'undefined' ? '_' : separator;

  return str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();
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
