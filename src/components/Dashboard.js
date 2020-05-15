import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import Questions from './Questions';

const Dashboard = (props) => {

  const { unansweredQuestions, answeredQuestions } = props;
  const [questionsToShow, setQuestionsToShow] = useState(unansweredQuestions)

  useEffect(() => {
    setQuestionsToShow(unansweredQuestions) 
  }, [unansweredQuestions])

  const handleAnsweredQuestions = () => {
    setQuestionsToShow(answeredQuestions);
  }

  const handleUnansweredQuestions = () => {
    setQuestionsToShow(unansweredQuestions);
  }

  return (
    <div>
      <Button onClick={handleUnansweredQuestions}>Unanswered</Button>
      <Button onClick={handleAnsweredQuestions}>Answered</Button>
      <div>
        {questionsToShow.map(qid => (
          <div key={qid}>
            <Questions id={qid}/>
          </div>
        ))}
      </div>
    </div>
  )
}
Dashboard.propTypes = {
  answeredPolls : PropTypes.array,
  unansweredPolls : PropTypes.array
};

const mapStateToProps = ({ questions, users, authedUser }) => {  
  const user = users[authedUser];
  const answeredQuestions = Object.keys(user.answers)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
  const unansweredQuestions = Object.keys(questions).filter(qid => !answeredQuestions.includes(qid))
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
  return {
    unansweredQuestions,
    answeredQuestions,
  }
}

export default connect(mapStateToProps)(Dashboard);
