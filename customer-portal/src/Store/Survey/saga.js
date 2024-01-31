import axios from 'axios';
import { takeEvery, fork, put, all, call, takeLatest, select } from 'redux-saga/effects';
import { CREATE_QUESTION, CREATE_SURVEY, DELETE_SURVEY } from './actionTypes';
import { createQuestionSuccess, createSurveySuccess } from './action';



function* createSurvey({payload}){
    try {
        yield put(createSurveySuccess(payload))
    } catch (error) {
        
    }
}

function* deleteSurvey({payload}){
    try {
        yield put(createSurveySuccess(payload))
    } catch (error) {
        
    }
}

function* createQuestion({payload}){
    try {
        yield put(createQuestionSuccess(payload))
    } catch (error) {
        
    }
}

export function* watchCreateSurvey(){
    yield takeLatest(CREATE_SURVEY, createSurvey)
}

export function* watchDeleteSurvey(){
    yield takeLatest(DELETE_SURVEY, deleteSurvey)
}

export function* watchCreateQuestion(){
    yield takeLatest(CREATE_QUESTION, createQuestion)
}

export default function* surveySaga(){
    yield all(
        [
            fork(watchCreateSurvey),
            fork(watchDeleteSurvey),
            fork(watchCreateQuestion)
        ]
    )
}