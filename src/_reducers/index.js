import { combineReducers } from 'redux';

//import { authentication } from './authentication.reducer';
//import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { times } from './times.reducer';
import { userTuten } from './userTuten.reducer';

const rootReducer = combineReducers({
    //authentication,
    //registration,
    users,
    alert,
    times,
    userTuten,
});

export default rootReducer;