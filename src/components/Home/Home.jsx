import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../store/users/user.actions";

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
});

const Home = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Contact</StyledTableCell>
            <StyledTableCell align="left">Address</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="left">{user.email}</StyledTableCell>
              <StyledTableCell align="left">{user.phone}</StyledTableCell>
              <StyledTableCell align="left">
                {user.address.city}
              </StyledTableCell>
              <StyledTableCell align="left">{user.username}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home;
