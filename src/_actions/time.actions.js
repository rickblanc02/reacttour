import { history } from '../_helpers';
import { timeService } from '../_services';

import { timeConstants } from '../_constants';
import { alertActions } from './';

export const timeActions = {
    getTime,
    //getTime2,
    
};

function getTime(time, timeZone, from) {
    return dispatch => {
        //dispatch(request({ time }));

        timeService.getTime(time, timeZone)
            .then(
                time => { 
                    dispatch(success(time));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    
    //function request(time) { return { type: timeConstants.TIME_REQUEST, time } }
    function success(time) {  
        console.log("action ##")
        console.log(time) ;
        return { type: timeConstants.TIME_SUCCESS, time } 
    }
    function failure(error) { return { type: timeConstants.TIME_FAILURE, error } }
}