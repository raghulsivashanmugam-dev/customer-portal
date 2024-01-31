import { all, fork } from 'redux-saga/effects';
import surveySaga from './Survey/saga';

export default function* rootSaga(){
    yield all([
        surveySaga()
    ])
}