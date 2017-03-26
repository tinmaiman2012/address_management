import { combineReducers } from 'redux'
import addressReducer from './address'

const indexReducer = combineReducers({
    address: addressReducer
});

export default indexReducer