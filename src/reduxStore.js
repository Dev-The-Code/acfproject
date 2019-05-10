//import dependencies
import {createStore, applyMiddleware} from 'redux' 
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'


//import all reducers
import combinedReducers from './layout/appReducers'

//import middlewares
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export default createStore(combinedReducers, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);