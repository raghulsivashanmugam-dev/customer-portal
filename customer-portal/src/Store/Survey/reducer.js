import { produce } from 'immer';
import { CHANGE_SURVEY, CREATE_QUESTION, CREATE_QUESTION_SUCCESS, CREATE_SURVEY_SUCCESS, DELETE_SURVEY_SUCCESS } from './actionTypes';

const initialState = {
    surveyList: [],
    isSurveyCreate: false,
    isDeleteSurvey: false,
    questionList: [],
    isQuestionCreate: false
}

const Survey = produce((state, action) => {
    switch (action.type) {
        case CREATE_SURVEY_SUCCESS:
            state.surveyList = action.payload;
            state.isSurveyCreate = true;
            break;

        case CHANGE_SURVEY:
            state.isSurveyCreate = false;
            state.isDeleteSurvey = false;
            state.isQuestionCreate = false;
            break;

        case DELETE_SURVEY_SUCCESS:
            state.isDeleteSurvey = true;
            break;

        case CREATE_QUESTION_SUCCESS:
            state.isQuestionCreate = true;
            state.questionList = action.payload;
            break;

        default:
            break;
    }
}, initialState)

export default Survey;