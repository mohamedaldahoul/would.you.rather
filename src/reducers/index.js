import { combineReducers } from 'redux'
import authedUser from './authReducers'
import questions from './questionsReducers'
import users from './usersReducers'

export default combineReducers({
  users,
  questions,
  authedUser,
})