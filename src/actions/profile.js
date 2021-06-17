import axios from "axios";
import { PROFILES_LOADED, PROFILES_ERROR, HISTORY_LOADED, HISTORY_ERROR, TRANSFER_SUCCESS, TRANSFER_ERROR } from "./types";

export const loadProfile = () => async dispatch => {
    try{
        const res = await axios.get('/api/allUsers')
        dispatch({
            type: PROFILES_LOADED,
            payload: res.data
        })
    }catch(error){
        dispatch({
            type: PROFILES_ERROR,
            payload: { msg: error, status: error.response.status }
        })
    }
}

export const loadHistory = () => async dispatch => {
    try{
        const res = await axios.get('/api/history')
        dispatch({
            type: HISTORY_LOADED,
            payload: res.data
        })
    }catch(error){
        dispatch({
            type: HISTORY_ERROR,
            payload: { msg: error, status: error.response.status }
        })
    }
}

export const transfer = ({From, To, amount}, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({From, To, amount})
    try{
        const res = await axios.post('/api/transaction', body, config)
        dispatch({
            type: TRANSFER_SUCCESS,
            payload: res.data
        })
        history.push('/profile')
        alert(`${res.data}`)
    }catch(error){
        dispatch({
            type: TRANSFER_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }

}