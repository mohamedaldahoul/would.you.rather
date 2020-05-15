import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';

import { setAuthedUser } from '../actions/authActions';

const useStyles = makeStyles(({spacing}) => ({
  root: {
    paddingTop: spacing(2),
    textAlign: 'center'
  },
  container: {
    paddingTop: spacing(1),
    textAlign: 'center'
  }
}));

const Login = (props) => {
  const [userId, setUserId] = useState('');
  const { users, login } = props
  const classes = useStyles();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // setUserId(e.target.value)
    if (userId) {
      login(userId)
    }else {
      alert('You have to select user')
    }
  }

  return (
    <FormControl className={classes.formControl} onSubmit={handleSubmit}>
      <InputLabel id="demo-simple-select-helper-label">Login user</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <MenuItem value="">
          <em>Select user...</em>
        </MenuItem>
        { Object.keys(users).map(user => (
            <MenuItem key={user} value={user}>
              {users[user].name}
            </MenuItem>
          ))
        }
      </Select>
      <FormHelperText>Please select user to be able to login...!</FormHelperText>
      <Button 
        variant="contained" 
        color="primary" 
        disabled={userId === ''} 
        onClick={handleSubmit}>
          Submit 
        </Button>
    </FormControl>
  )
}

Login.propTypes = {
  users: PropTypes.object,
  login: PropTypes.func.isRequired,
}

const mapStateToProps = ({ users }) => {
  return ({
  users
})}

const mapDispatchToProps = (dispatch) => ({
  login: (id) =>{ dispatch(setAuthedUser(id))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
