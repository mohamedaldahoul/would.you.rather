import { ADD_QUESTION, RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER } from '../types'

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function receiveQuestions(questions){
  return{
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function saveQuestionAnswer(authedUser, qid, answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  }
}