import { combineReducers } from 'redux';
import { exchangeReducer } from './exchange.reducer';
import { paramReducer } from './param.reducer';

const reducers = combineReducers({
    param: paramReducer,
    exchangeRate : exchangeReducer
});

export default reducers;
//This RootState is required to use useSelector later on 
export type RootState = ReturnType<typeof reducers>;
// export type AppDispatch = typeof reducers;