import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
});

const LeaderBoard = ({ users }) => {
  const classes = useStyles();

  return (<Fragment>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="right">Profile</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Questions Asked</TableCell>
            <TableCell align="right">Questions Answered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right"><img src={user.avatarURL} className='avatar' alt={`Avatar of ${user.name}`}/></TableCell>
              <TableCell align="right">{user.questions.length}</TableCell>
              <TableCell align="right">{Object.keys(user.answers).length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Fragment>
)
}

LeaderBoard.propTypes = {
  users: PropTypes.array.isRequired
};
const mapStateToProps = ({ users }) => {
  const userScore = user => Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users).sort((a,b) => userScore(b)- userScore(a))
  }
}

export default connect(mapStateToProps)(LeaderBoard);
