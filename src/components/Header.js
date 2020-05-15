import React from 'react';
import { Link , withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button, Avatar } from '@material-ui/core';


import PropTypes from "prop-types";
import {connect} from "react-redux";
import User from "./User";

const useStyles = makeStyles(({spacing}) => ({
  root: {
    width: '75%',
    height: spacing(8),
    margin: 'auto',
  },
  logout: {
    marginRight: spacing(2)
  }
}));

const Header = ({authedUser}) => {
  const classes = useStyles();
  return (
    <AppBar color="primary" position="static" className={classes.root}>
      <Toolbar>
        <TypoGraphy
          color="inherit"
        >
          <Link to='/'>
            <Button variant="outlined">
              Would You Rather...?
            </Button>
          </Link>
        </TypoGraphy>
        {authedUser && 
          <List component="nav">
            <ListItem component="div">
            <ListItem component="div">
              <ListItemText inset>
              <Link to='/add'>
                  <Button>
                    Add question
                  </Button>
                </Link>
              </ListItemText>
            </ListItem> 
            <ListItem component="div">
              <ListItemText inset>
                <Link to='/leaderboard'>
                  <Button>
                    Leader board
                  </Button>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem component="div">
              <ListItemText inset>
                <Avatar>
                  <User id={authedUser} /> 
                </Avatar>
              </ListItemText>
            </ListItem>
              <ListItemText inset className={classes.logout}>
                <TypoGraphy color="inherit">
                  <Link to='/logout'>
                    <Button>
                      Logout
                    </Button>
                  </Link>
                </TypoGraphy>
              </ListItemText>
            </ListItem >
          </List>
        }
      </Toolbar>        
    </AppBar>
  )
}

Header.propTypes = {
  authedUser: PropTypes.string,
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(Header))
