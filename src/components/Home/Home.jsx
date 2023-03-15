import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../../store/users/user.actions";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    marginTop: 50,
    minWidth: 900,
  },
  tableButton: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonDiv: {
    marginTop: 50,
  },
});

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the selected user?")) {
      dispatch(deleteUser(id));
    }
  };

  const goToAddUser = () => {
    navigate("/adduser");
  };

  const gotToEditUserPage = id => {
      navigate(`/editUser/${id}`);
  }

  return (
    <div>
      <div className={classes.buttonDiv}>
        <Button variant="contained" color="primary" onClick={goToAddUser}>
          Add users
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Contact</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{user.email}</StyledTableCell>
                  <StyledTableCell align="left">{user.contact}</StyledTableCell>
                  <StyledTableCell align="left">
                    {user.address}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={classes.tableButton}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => gotToEditUserPage(user.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
