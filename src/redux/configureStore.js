import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/rootReducer';

const configureStore = () => (
    createStore(
        rootReducer,
        // initialState,
        // applyMiddleware(thunk, logger)
	)
)


export default configureStore;