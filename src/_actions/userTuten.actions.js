import { history } from '../_helpers';
import { userTutenService } from '../_services';

import { userTutenConstants } from '../_constants';
import { alertActions } from './';

export const userTutenActions = {
    getLogin,
    getBooking,
    
};

function getLogin(user, pass, app, from) {
    return dispatch => {
        //dispatch(request({ user }));

        userTutenService.getLogin(user, pass, app)
            .then(
                userTuten => { 
                    dispatch(success(userTuten));
                    //history.push(from);
                   
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    
    //function request(userTuten) { return { type: userTutenConstants.USERTUTEN_REQUEST, userTuten } }
    function success(userTuten) { 
            console.log("success action ##")
            console.log(userTuten) ;
        return { type: userTutenConstants.USERTUTEN_SUCCESS, userTuten } 
    }
    function failure(error) { return { type: userTutenConstants.USERTUTEN_FAILURE, error } }
}

function getBooking(current, adminemail, email, app, token) {
    return dispatch => {
        //dispatch(request({ time }));
    console.log("funcion action "+token)
        userTutenService.getBooking(current, adminemail, email, app, token)
            .then(
                userTuten => { 
                    dispatch(success(userTuten));
                    //history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    //function request(time) { return { type: userTutenConstants.USERTUTEN_REQUEST, time } }
    function success(userTuten) { return { type: userTutenConstants.USERTUTEN_SUCCESS, userTuten } }
    function failure(error) { return { type: userTutenConstants.USERTUTEN_FAILURE, error } }
}

