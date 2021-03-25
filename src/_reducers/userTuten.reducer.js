import { userTutenConstants } from '../_constants';


export function userTuten(state = {}, action) { 
    //console.log("reducer ")
    //console.log(action)
    switch (action.type) {
        case userTutenConstants.USERTUTEN_REQUEST:
            return {
                loading: true
            };
        case userTutenConstants.USERTUTEN_SUCCESS:

            /*var time = {};
            time.time = action.time.time;
            time.timeZone = action.time.timeZone;*/
           
            return {
                //time: action.time.time
                //time: action.time
                userTuten: action.userTuten
                
            };
        case userTutenConstants.USERTUTEN_FAILURE:
            return {
                error: action.error
            };
       
        default:
            return state
    }
}