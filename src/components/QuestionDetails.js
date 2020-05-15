import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';

import { handleAnswer } from '../actions/actionsCreator';
import User from './User';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

const roundNumber = (num) => Number.parseFloat(num).toFixed(2);

const QuestionDetails = (props) => {
  const classes = useStyles();
  const {questions, users, authedUser, match } = props;

  const [selectedAnswer, setSelectedAnswer] = useState('')
  let answer, selectOne, selectTwo, total;

  const answers = users[authedUser].answers;
  const { questionId } = match.params;
  const question = questions[questionId];
  
  if(answers.hasOwnProperty(question.id)) {
    answer = answers[question.id]
  }
  
  const questionAuthor = users[question.author];
  total = question.optionOne.votes.length + question.optionTwo.votes.length;
  selectOne = roundNumber((question.optionOne.votes.length / total) * 100);
  selectTwo = roundNumber((question.optionTwo.votes.length / total) * 100);
  
const handleSubmit = (e) => {
  e.preventDefault()
  console.log('ans', selectedAnswer);
  props.saveQuestionAnswer(questionId, selectedAnswer)
}

  return (
    <Card>
      <CardHeader>
        <User id={questionAuthor.id}/>
      </CardHeader>
      <CardContent>
        <Typography variant="h5">Would You Rather</Typography>
      </CardContent>
      <div>
        {answer ?
          <div>
            <FormControl component="fieldset">
              <RadioGroup aria-label="gender" name="gender1" value={answer}>
                <FormControlLabel value="optionOne" checked={answer==="optionOne"} control={<Radio />} label= {question.optionOne.text} />
                <FormControlLabel value="optionTwo" checked={answer==="optionTwo"} control={<Radio />} label= {question.optionTwo.text} />
              </RadioGroup>
            </FormControl>

            <div className="progress">
              <div className="progress-one" style={{ width: `${selectOne}%` }}>{`${selectOne}%`}</div>
              <div className="progress-two" style={{ width: `${selectTwo}%` }}>{`${selectTwo}%`}</div>
            </div>
            <div className="total">
              Total number of votes: {total}
            </div>
          </div>:
            <form onSubmit={handleSubmit}>
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup aria-label="radio" name="radio" value={selectedAnswer} onChange={(e) => setSelectedAnswer(e.target.value)}>
                  <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text} />
                  <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} />
                </RadioGroup>
                <Button 
                  variant="contained" 
                  color="primary" 
                  className={classes.button}
                  onClick={handleSubmit}
                  disabled={selectedAnswer === ''}
                  >
                  Submit
                </Button>
              </FormControl>
            </form>
        }
        </div>
    </Card>
  )
}

QuestionDetails.propTypes = {
  questions: PropTypes.object.isRequired, 
  users: PropTypes.object.isRequired, 
  authedUser: PropTypes.string.isRequired, 
}

const mapStateToProps = ({ questions, users, authedUser }) => {
  return {
    questions,
    users,
    authedUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveQuestionAnswer: (questionId, answer) => {      
      dispatch(handleAnswer(questionId, answer))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
