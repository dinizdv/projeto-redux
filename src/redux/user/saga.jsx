import { all, takeEvery, call, put, takeLatest } from 'redux-saga/effects'
import { fetchUsersSuccess, fetchUsersFailure, fetchUserById, fetchUserByIdSuccess, fetchUserByIdFailure } from './slice'
import axios from 'axios'

function* fetchUsers(){
    console.log('call into of the saga')
    try {
        const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users')
        yield put(fetchUsersSuccess(response.data))
    } catch(error){
        yield put(fetchUsersFailure(error.message))
    }
}

// second saga
function* fetchId(action){
    try {
        const userId = action.payload
        const response = yield call(axios.get, `https://jsonplaceholder.typicode.com/users/${userId}`)
        yield put(fetchUserByIdSuccess(response.data))
    } catch (error){
        yield put(fetchUserByIdFailure(error.message))
    }
}

export default all([
    takeLatest('user/fetchUsers', fetchUsers), // RENDER = 1
    takeEvery('user/fetchUserById', fetchId) 
])