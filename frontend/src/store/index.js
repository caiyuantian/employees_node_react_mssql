import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers'
import rootSaga from '../sagas'
import { loadState, saveState } from './localStorage'


const persistedState = loadState();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, persistedState, applyMiddleware(sagaMiddleware));
console.log("first persistedState=" + persistedState)
console.log("first store.getState()=" + JSON.stringify(store.getState()))
store.subscribe(() => {
    const state = store.getState();
    saveState(state);
})
sagaMiddleware.run(rootSaga);

export default store;