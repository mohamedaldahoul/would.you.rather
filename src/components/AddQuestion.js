import React, { useState} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";

import { handleAddQuestion } from '../actions/actionsCreator'


const AddQuestion = ({addQuestion, history}) => {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setOptionOne(e.target.value);
    setOptionTwo(e.target.value);    
    addQuestion(optionOne, optionTwo);
    history.push('/')
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: 20,
        padding: 20
      }}
    >
      <form style={{ width: "50%" }}>
        <h1>Would You Rather?</h1>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="optionOne">Option one</InputLabel>
          <Input 
            id="optionOne" 
            type="text" 
            name="optionOne"
            value={optionOne}
            onChange={(e)=> setOptionOne(e.target.value)}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="optionTwo">Option two</InputLabel>
          <Input 
            id="optionTwo" 
            type="text"
            name="optionTwo"
            value={optionTwo} 
            onChange={(e) => setOptionTwo(e.target.value)} 
            />
        </FormControl>

        <Button variant="contained" color="primary" size="medium"
          disabled={optionOne === '' || optionTwo === ''}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </form>
    </div>
  )
}

AddQuestion.propTypes = {
  authedUser: PropTypes.string,
  addQuestion: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
  addQuestion: (optionOne, optionTwo) => { 
    dispatch(handleAddQuestion(optionOne, optionTwo))
  }
}}

export default connect(null, mapDispatchToProps)(AddQuestion)
