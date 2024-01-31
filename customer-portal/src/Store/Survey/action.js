import { CHANGE_SURVEY, CREATE_QUESTION, CREATE_QUESTION_SUCCESS, CREATE_SURVEY, CREATE_SURVEY_SUCCESS, DELETE_QUESTION, DELETE_QUESTION_SUCCESS, DELETE_SURVEY, DELETE_SURVEY_SUCCESS } from "./actionTypes"

export const createSurvey = (data) => {
    return{
        type: CREATE_SURVEY,
        payload: data
    }
}

export const createSurveySuccess = (data) => {
    return{
        type: CREATE_SURVEY_SUCCESS,
        payload: data
    }
}

export const changeSurvey = (data) => {
    return{
        type: CHANGE_SURVEY,
        payload: data
    }
}

export const deleteSurvey = (data) => {
    return{
        type: DELETE_SURVEY,
        payload: data
    }
}

export const deleteSurveySuccess = (data) => {
    return{
        type: DELETE_SURVEY_SUCCESS,
        payload: data
    }
}

export const createQuestion = (data) => {
    return{
        type: CREATE_QUESTION,
        payload: data
    }
}

export const createQuestionSuccess = (data) => {
    return{
        type: CREATE_QUESTION_SUCCESS,
        payload: data
    }
}

export const deleteQuestion = (data) => {
    return{
        type: DELETE_QUESTION,
        payload: data
    }
}

export const deleteQuestionSuccess = (data) => {
    return{
        type: DELETE_QUESTION_SUCCESS,
        payload: data
    }
}