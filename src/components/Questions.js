import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import {  withRouter } from 'react-router-dom';

const Questions = (props) => {
  const { history, question, auth } = props
  
  const questionDetails = (questionId) => {
    const path = `questions/${questionId}`
    history.push(path)
  }

  return (
    <Card onClick={() => questionDetails(question.id)} key={question.id}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          <li className={question.optionOne.votes.includes(auth) ? "optionSelected" : ""}>{question.optionOne.text}</li>
        </Typography>
        <Typography gutterBottom variant="h6" component="h2">
          <li className={question.optionTwo.votes.includes(auth) ? "optionSelected" : ""}>{question.optionTwo.text}</li>
        </Typography>
        </CardContent>    
      </Card>
  )
}

Questions.propTypes = {
  question: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, { id }) => {
  return {
    question: state.questions[id],
    auth: state.authedUser,
  }
}

export default withRouter(connect(mapStateToProps, null)(Questions));
