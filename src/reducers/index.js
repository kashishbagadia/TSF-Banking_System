import { combineReducers } from 'redux';
import profile from './profile'
import alert from './alert'

export default combineReducers({
    profile,
    alert
});