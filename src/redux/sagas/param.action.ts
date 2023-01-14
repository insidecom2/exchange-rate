import { put, takeEvery } from 'redux-saga/effects'
import { ActionType } from '../actionTypes/param'

interface Pair {
    type: string,
    payload: string
}
export function* setPairAction(payload: Pair) {
    yield put({
        type: ActionType.GET_PAIR_PENDING,
        payload: ''
    })

    yield put({
        type: ActionType.GET_PAIR_SUCCESS,
        loading: false,
        payload: payload.payload
    })
}

export function* watchSetPair() {
    yield takeEvery(ActionType.GET_PAIR_REQ, setPairAction)
}
