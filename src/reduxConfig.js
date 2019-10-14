import { createStore, applyMiddleware } from 'redux'
import {persistStore, persistReducer} from 'redux-persist';
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

//create a reducer that can handle persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

//created a regular state with redux thunk and a persisted state to be rendered;
const store = createStore(persistedReducer, {}, applyMiddleware(reduxThunk));
const persistor = persistStore(store);
persistor.purge();
export {store, persistor}