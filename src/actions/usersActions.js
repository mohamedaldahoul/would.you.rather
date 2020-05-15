import { RECEIVE_USERS, ADD_USER_QUESTION, USER_ANSWER_QUESTION } from '../types'

export function receiveUsers(users){
  return{
      type: RECEIVE_USERS,
      users
  }
}

export function addUserQuestion (authedUser, qid) {
  return {
    type: ADD_USER_QUESTION,
    authedUser,
    qid
  }
}

export function saveUserAnswer (auth, qid, option) {
  return {
    type: USER_ANSWER_QUESTION,
    auth,
    qid,
    option
  }
}