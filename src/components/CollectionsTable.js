import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../apis/axios';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { handleCollectionDelete } from '../utils/handleCollectionMethods';

import Button from '@mui/material/Button';

function createRow(id, collectionName, numberOfLeads) {
  return {
    id,
    collectionName,
    numberOfLeads,
  };
}

const columns = [
  { field: 'id', width: 100, type: 'number', label: 'Id' },
  {
    field: 'collectionName',
    headerName: 'Collection Name',
    width: 250,
    label: 'Collection Name',
  },
  {
    field: 'numberOfLeads',
    headerName: 'Leads in Collection',
    type: 'number',
    width: 200,
    label: 'Leads in Collection',
  },
  {
    id: 'Action',
    disablePadding: false,
    label: 'Actions',
  },
];

function UsersTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'></TableCell>
        {columns.map((column, index) => (
          <TableCell
            key={index}
            align={'left'}
            padding={'normal'}
            sortDirection={orderBy === column.id ? order : false}
            sx={{ fontWeight: 600 }}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

UsersTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const UsersTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color='inherit'
            variant='subtitle1'
            component='div'
          >
            {numSelected} selected
          </Typography>
        ) : (
          <>
            <Typography
              sx={{ flex: '1 1 100%', ml: 4 }}
              variant='h5'
              id='tableTitle'
              component='div'
            >
              Collection list
            </Typography>
          </>
        )}
      </Toolbar>
    </>
  );
};

const CollectionsTable = () => {
  const [collections, setCollections] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getAllCollections = async () => {
      const response = await axiosInstance.get('/db/collections');
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
            24,
            'Delete'
          )
        );
      });
    }, 500);

    setRows(collectionRowsrows);
    setTimeout(() => {
      setDone(true);
    }, 1000);
  }, [collections]);

  const handleModalDeleteUser = (event) => {
    event.preventDefault();
    console.log(selectedUser);
    handleCollectionDelete(selectedUser);
    setOpen(false);
    window.location.reload(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleModalOpen = (event) => {
    console.log(event);
    setSelectedUser(event);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - rows.length)
      : 0;

  return (
    <>
      {!done ? (
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color='primary' />
        </Backdrop>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <UsersTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby='tableTitle'
                size={'medium'}
              >
                <UsersTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {rows
                    .slice()
                    .sort(getComparator(order, orderBy))
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row, index) => {
                      const isItemSelected = isSelected(
                        row.collectionName
                      );

                      return (
                        <TableRow
                          hover
                          key={row.id}
                          //   onClick={(event) =>
                          //     handleClick(event, row.Email)
                          //   }
                          role='checkbox'
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                        >
                          <TableCell padding='checkbox'>
                            {/* <Checkbox
                              color='primary'
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            /> */}
                          </TableCell>
                          <TableCell
                            component='th'
                            id={row.id}
                            scope='row'
                            padding='none'
                          >
                            {row.id}
                          </TableCell>
                          <TableCell align='left'>
                            {row.collectionName}
                          </TableCell>

                          <TableCell align='left'>
                            {row.numberOfLeads}
                          </TableCell>
                          <TableCell align='left'>
                            <IconButton
                              onClick={() => {
                                handleModalOpen(row);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <Dialog
                              open={open}
                              onClose={handleModalClose}
                              aria-labelledby='alert-dialog-title'
                              aria-describedby='alert-dialog-description'
                            >
                              <DialogTitle id='alert-dialog-title'>
                                {`DELETE: ${selectedUser.collectionName}?`}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id='alert-dialog-description'>
                                  Are you sure you want to delete this
                                  collection and all its leads?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleModalClose}>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleModalDeleteUser}
                                  autoFocus
                                >
                                  Delete
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </>
  );
};

export default CollectionsTable;
