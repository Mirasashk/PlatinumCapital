import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { getDatabase, ref, child, get } from 'firebase/database';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Button from '@mui/material/Button';
import { handleDeleteUser } from '../utils/handleUserMethods';
import { useNavigate, Outlet } from 'react-router-dom';

function createData(
  Email,
  DisplayName,
  Access,
  LastLogin,
  Action,
  uid
) {
  return {
    Email,
    DisplayName,
    Access,
    LastLogin,
    Action,
    uid,
  };
}

// const rows = [createData('Cupcake', 305, 3.7, 67, 'delete')];

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

const headCells = [
  {
    id: 'Email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'DisplayName',
    disablePadding: false,
    label: 'Name',
  },

  {
    id: 'Access',
    disablePadding: false,
    label: 'Access Level',
  },
  {
    id: 'LastLogin',
    disablePadding: false,
    label: 'Last Login',
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
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 600 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
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
              User List
            </Typography>
          </>
        )}
      </Toolbar>
    </>
  );
};

UsersTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function UsersTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dbRef = ref(getDatabase());
  const navigate = useNavigate();

  useEffect(() => {
    const userRows = [];

    props.users.map(async (user) => {
      await get(child(dbRef, `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            userRows.push(
              createData(
                user.email,
                user.displayName,
                snapshot.val().access,
                'Mar 1st, 2022',
                'Delete',
                user.uid
              )
            );
          } else {
            console.log('No Data available');
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setRows(userRows);
      return null;
    });

    setTimeout(() => {
      setDone(true);
    }, 1000);
  }, [props.users, dbRef]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDone(true);
    }, 1100);
    return () => {
      clearTimeout(timerId);
    };
  }, [rows]);

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
  // Delete user from database
  const handleModalDeleteUser = (event) => {
    event.preventDefault();
    handleDeleteUser(selectedUser);
    setOpen(false);
    window.location.reload(false);
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

  const handleRowClick = (event, uid) => {
    event.preventDefault();

    navigate(`/user/${uid}`);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
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
                      const isItemSelected = isSelected(row.Email);

                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          key={row.Email}
                          role='checkbox'
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                        >
                          <TableCell></TableCell>
                          <TableCell
                            component='th'
                            id={labelId}
                            scope='row'
                            padding='none'
                            onClick={(e) =>
                              handleRowClick(e, row.uid)
                            }
                          >
                            {row.Email}
                          </TableCell>
                          <TableCell
                            align='left'
                            onClick={(e) =>
                              handleRowClick(e, row.uid)
                            }
                          >
                            {row.DisplayName}
                          </TableCell>

                          <TableCell
                            align='left'
                            onClick={(e) =>
                              handleRowClick(e, row.uid)
                            }
                          >
                            {row.Access}
                          </TableCell>
                          <TableCell
                            align='left'
                            onClick={(e) =>
                              handleRowClick(e, row.uid)
                            }
                          >
                            {row.LastLogin}
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
                                {`DELETE: ${selectedUser.Email}?`}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id='alert-dialog-description'>
                                  Are you sure you want to delete this
                                  User?
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
          <Outlet />
        </Box>
      )}
    </>
  );
}
