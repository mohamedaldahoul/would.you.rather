import React from 'react';
import { Switch, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import Dashboard from './Dashboard';
import LeaderBoard from './LeaderBoard'
import AddQuestion from "./AddQuestion";
import QuestionDetails from './QuestionDetails';
import NotFound from "./NotFound";
import LogOut from './LogOut';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  container: {
    width: '50%',
    display: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 'auto'
  }
}))

const Routes = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
       <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/leaderboard' exact component={LeaderBoard} />
        <Route path='/add' component={AddQuestion}/>
        <Route path="/questions/:questionId" component={QuestionDetails} />
        <Route exact path='/logout' component={LogOut} />    
        <Route  component={NotFound} />
      </Switch>
    </div>
  )
}

export default Routes;
