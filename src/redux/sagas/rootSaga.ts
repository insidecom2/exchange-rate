import { all ,fork} from "redux-saga/effects";
import { watchSetExchange } from "./exchange.action";
import {  watchSetPair } from "./param.action";

export function* rootSaga() {
    yield all([fork(watchSetPair),fork(watchSetExchange)])
}