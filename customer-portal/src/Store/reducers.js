import { combineReducers  } from 'redux';
import { connectRouter } from 'connected-react-router';
import Survey from './Survey/reducer';
const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
        Survey
});

export default rootReducer;