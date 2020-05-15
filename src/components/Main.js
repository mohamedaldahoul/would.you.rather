import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { handleInitialData } from '../actions/actionsCreator';
import Header from './Header';
import Routes from './Routes';
import Login from "./Login";

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

const Main = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.initialData()
  }, [props])
  const {notLoggedIn} = props;  
  
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.container}>
        {notLoggedIn && <Login /> }
        {!notLoggedIn &&  
        <Routes notLoggedIn={notLoggedIn} />
        }

      </div>
    </div>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return{
    notLoggedIn: authedUser === null,
    authedUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialData: () => {
      dispatch(handleInitialData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)