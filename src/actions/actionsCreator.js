import { getInitialData } from '../resources/api'
import { addUserQuestion, saveUserAnswer, receiveUsers } from './usersActions'
import { addQuestion, receiveQuestions, saveQuestionAnswer } from './questionsActions'
import { _saveQuestionAnswer, _saveQuestion } from '../resources/_DATA'

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, questions})=> {                
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions))
        })
    }
}

export function handleAddQuestion (optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((question) => {
            dispatch(addQuestion(question));
            dispatch(addUserQuestion(authedUser, question.id))
        })

    }
}

export function handleAnswer (qid, option) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
      const info = {
        authedUser,
        qid,
        answer: option
      };
      _saveQuestionAnswer(info)
          .then(() => {
              console.log('action', authedUser, qid, option);
              
              dispatch(saveQuestionAnswer(authedUser, qid, option));
              dispatch(saveUserAnswer(authedUser, qid, option))
          })
    }
}